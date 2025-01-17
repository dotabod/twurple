"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshingAuthProvider = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const typed_event_emitter_1 = require("@d-fischer/typed-event-emitter");
const common_1 = require("@twurple/common");
const AccessToken_1 = require("../AccessToken");
const CachedRefreshFailureError_1 = require("../errors/CachedRefreshFailureError");
const IntermediateUserRemovalError_1 = require("../errors/IntermediateUserRemovalError");
const InvalidTokenError_1 = require("../errors/InvalidTokenError");
const InvalidTokenTypeError_1 = require("../errors/InvalidTokenTypeError");
const UnknownIntentError_1 = require("../errors/UnknownIntentError");
const helpers_1 = require("../helpers");
const TokenFetcher_1 = require("../TokenFetcher");
/**
 * An auth provider with the ability to make use of refresh tokens,
 * automatically refreshing the access token whenever necessary.
 */
let RefreshingAuthProvider = class RefreshingAuthProvider extends typed_event_emitter_1.EventEmitter {
    /**
     * Creates a new auth provider based on the given one that can automatically
     * refresh access tokens.
     *
     * @param refreshConfig The information necessary to automatically refresh an access token.
     */
    constructor(refreshConfig) {
        var _a;
        super();
        /** @internal */ this._userAccessTokens = new Map();
        /** @internal */ this._userTokenFetchers = new Map();
        this._intentToUserId = new Map();
        this._userIdToIntents = new Map();
        this._cachedRefreshFailures = new Set();
        /**
         * Fires when a user token is refreshed.
         *
         * @param userId The ID of the user whose token was successfully refreshed.
         * @param token The refreshed token data.
         */
        this.onRefresh = this.registerEvent();
        /**
         * Fires when a user token fails to refresh.
         *
         * @param userId The ID of the user whose token wasn't successfully refreshed.
         */
        this.onRefreshFailure = this.registerEvent();
        this._clientId = refreshConfig.clientId;
        this._clientSecret = refreshConfig.clientSecret;
        this._redirectUri = refreshConfig.redirectUri;
        this._appImpliedScopes = (_a = refreshConfig.appImpliedScopes) !== null && _a !== void 0 ? _a : [];
        this._appTokenFetcher = new TokenFetcher_1.TokenFetcher(async (scopes) => await this._fetchAppToken(scopes));
    }
    /**
     * Adds the given user with their corresponding token to the provider.
     *
     * @param user The user to add.
     * @param initialToken The token for the user.
     * @param intents The intents to add to the user.
     *
     * Any intents that were already set before will be overwritten to point to this user instead.
     */
    addUser(user, initialToken, intents) {
        const userId = (0, common_1.extractUserId)(user);
        if (!initialToken.refreshToken) {
            throw new Error(`Trying to add user ${userId} without refresh token`);
        }
        this._cachedRefreshFailures.delete(userId);
        this._userAccessTokens.set(userId, {
            ...initialToken,
            userId,
        });
        if (!this._userTokenFetchers.has(userId)) {
            this._userTokenFetchers.set(userId, new TokenFetcher_1.TokenFetcher(async (scopes) => await this._fetchUserToken(userId, scopes)));
        }
        if (intents) {
            this.addIntentsToUser(user, intents);
        }
    }
    /**
     * Figures out the user associated to the given token and adds them to the provider.
     *
     * If you already know the ID of the user you're adding,
     * consider using {@link RefreshingAuthProvider#addUser} instead.
     *
     * @param initialToken The token for the user.
     * @param intents The intents to add to the user.
     *
     * Any intents that were already set before will be overwritten to point to the associated user instead.
     */
    async addUserForToken(initialToken, intents) {
        let tokenWithInfo = null;
        if (initialToken.accessToken && !(0, AccessToken_1.accessTokenIsExpired)(initialToken)) {
            try {
                const tokenInfo = await (0, helpers_1.getTokenInfo)(initialToken.accessToken);
                tokenWithInfo = [initialToken, tokenInfo];
            }
            catch (e) {
                if (!(e instanceof InvalidTokenError_1.InvalidTokenError)) {
                    throw e;
                }
            }
        }
        if (!tokenWithInfo) {
            if (!initialToken.refreshToken) {
                throw new InvalidTokenError_1.InvalidTokenError();
            }
            const refreshedToken = await (0, helpers_1.refreshUserToken)(this._clientId, this._clientSecret, initialToken.refreshToken);
            const tokenInfo = await (0, helpers_1.getTokenInfo)(refreshedToken.accessToken);
            this.emit(this.onRefresh, tokenInfo.userId, refreshedToken);
            tokenWithInfo = [refreshedToken, tokenInfo];
        }
        const [tokenToAdd, tokenInfo] = tokenWithInfo;
        if (!tokenInfo.userId) {
            throw new InvalidTokenTypeError_1.InvalidTokenTypeError('Could not determine a user ID for your token; you might be trying to disguise an app token as a user token.');
        }
        const token = tokenToAdd.scope
            ? tokenToAdd
            : {
                ...tokenToAdd,
                scope: tokenInfo.scopes,
            };
        this.addUser(tokenInfo.userId, token, intents);
        return tokenInfo.userId;
    }
    /**
     * Gets an OAuth token from the given authorization code and adds the user to the provider.
     *
     * An authorization code can be obtained using the
     * [OAuth Authorization Code flow](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#authorization-code-grant-flow).
     *
     * @param code The authorization code.
     * @param intents The intents to add to the user.
     *
     * Any intents that were already set before will be overwritten to point to the associated user instead.
     */
    async addUserForCode(code, intents) {
        if (!this._redirectUri) {
            throw new Error('This method requires you to pass a `redirectUri` as a configuration property');
        }
        const token = await (0, helpers_1.exchangeCode)(this._clientId, this._clientSecret, code, this._redirectUri);
        return await this.addUserForToken(token, intents);
    }
    /**
     * Checks whether a user was added to the provider.
     *
     * @param user The user to check.
     */
    hasUser(user) {
        return this._userTokenFetchers.has((0, common_1.extractUserId)(user));
    }
    /**
     * Removes a user from the provider.
     *
     * This also makes all intents this user was assigned to unusable.
     *
     * @param user The user to remove.
     */
    removeUser(user) {
        const userId = (0, common_1.extractUserId)(user);
        if (this._userIdToIntents.has(userId)) {
            const intents = this._userIdToIntents.get(userId);
            for (const intent of intents) {
                this._intentToUserId.delete(intent);
            }
            this._userIdToIntents.delete(userId);
        }
        this._userAccessTokens.delete(userId);
        this._userTokenFetchers.delete(userId);
        this._cachedRefreshFailures.delete(userId);
    }
    /**
     * Adds intents to a user.
     *
     * Any intents that were already set before will be overwritten to point to this user instead.
     *
     * @param user The user to add intents to.
     * @param intents The intents to add to the user.
     */
    addIntentsToUser(user, intents) {
        const userId = (0, common_1.extractUserId)(user);
        if (!this._userAccessTokens.has(userId)) {
            throw new Error('Trying to add intents to a user that was not added to this provider');
        }
        for (const intent of intents) {
            if (this._intentToUserId.has(intent)) {
                this._userIdToIntents.get(this._intentToUserId.get(intent)).delete(intent);
            }
            this._intentToUserId.set(intent, userId);
            if (this._userIdToIntents.has(userId)) {
                this._userIdToIntents.get(userId).add(intent);
            }
            else {
                this._userIdToIntents.set(userId, new Set([intent]));
            }
        }
    }
    /**
     * Gets all intents assigned to the given user.
     *
     * @param user The user to get intents of.
     */
    getIntentsForUser(user) {
        const userId = (0, common_1.extractUserId)(user);
        return this._userIdToIntents.has(userId) ? Array.from(this._userIdToIntents.get(userId)) : [];
    }
    /**
     * Removes all given intents from any user who they might be assigned to.
     *
     * Intents that have not been assigned are silently ignored.
     *
     * @param intents The intents to remove.
     */
    removeIntents(intents) {
        var _a;
        for (const intent of intents) {
            if (this._intentToUserId.has(intent)) {
                const userId = this._intentToUserId.get(intent);
                (_a = this._userIdToIntents.get(userId)) === null || _a === void 0 ? void 0 : _a.delete(intent);
                this._intentToUserId.delete(intent);
            }
        }
    }
    /**
     * Requests that the provider fetches a new token from Twitch for the given user.
     *
     * @param user The user to refresh the token for.
     */
    async refreshAccessTokenForUser(user) {
        const userId = (0, common_1.extractUserId)(user);
        if (this._cachedRefreshFailures.has(userId)) {
            throw new CachedRefreshFailureError_1.CachedRefreshFailureError(userId);
        }
        const previousTokenData = this._userAccessTokens.get(userId);
        if (!previousTokenData) {
            throw new Error('Trying to refresh token for user that was not added to the provider');
        }
        const tokenData = await this._refreshUserTokenWithCallback(userId, previousTokenData.refreshToken);
        this._checkIntermediateUserRemoval(userId);
        this._userAccessTokens.set(userId, {
            ...tokenData,
            userId,
        });
        this.emit(this.onRefresh, userId, tokenData);
        return {
            ...tokenData,
            userId,
        };
    }
    /**
     * Requests that the provider fetches a new token from Twitch for the given intent.
     *
     * @param intent The intent to refresh the token for.
     */
    async refreshAccessTokenForIntent(intent) {
        if (!this._intentToUserId.has(intent)) {
            throw new UnknownIntentError_1.UnknownIntentError(intent);
        }
        const userId = this._intentToUserId.get(intent);
        return await this.refreshAccessTokenForUser(userId);
    }
    /**
     * The client ID.
     */
    get clientId() {
        return this._clientId;
    }
    /**
     * Gets the scopes that are currently available using the access token.
     *
     * @param user The user to get the current scopes for.
     */
    getCurrentScopesForUser(user) {
        var _a;
        const token = this._userAccessTokens.get((0, common_1.extractUserId)(user));
        if (!token) {
            throw new Error('Trying to get scopes for user that was not added to the provider');
        }
        return (_a = token.scope) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * Gets an access token for the given user.
     *
     * @param user The user to get an access token for.
     * @param scopeSets The requested scopes.
     */
    async getAccessTokenForUser(user, ...scopeSets) {
        const userId = (0, common_1.extractUserId)(user);
        const fetcher = this._userTokenFetchers.get(userId);
        if (!fetcher) {
            return null;
        }
        if (this._cachedRefreshFailures.has(userId)) {
            throw new CachedRefreshFailureError_1.CachedRefreshFailureError(userId);
        }
        return await fetcher.fetch(...scopeSets);
    }
    /**
     * Fetches a token for a user identified by the given intent.
     *
     * @param intent The intent to fetch a token for.
     * @param scopeSets The requested scopes.
     */
    async getAccessTokenForIntent(intent, ...scopeSets) {
        if (!this._intentToUserId.has(intent)) {
            return null;
        }
        const userId = this._intentToUserId.get(intent);
        const newToken = await this.getAccessTokenForUser(userId, ...scopeSets);
        if (!newToken) {
            throw new common_1.HellFreezesOverError(`Found intent ${intent} corresponding to user ID ${userId} but no token was found`);
        }
        return {
            ...newToken,
            userId,
        };
    }
    /**
     * Fetches any token to use with a request that supports both user and app tokens,
     * i.e. public data relating to a user.
     *
     * @param user The user.
     */
    async getAnyAccessToken(user) {
        if (user) {
            const userId = (0, common_1.extractUserId)(user);
            if (this._userAccessTokens.has(userId)) {
                const token = await this.getAccessTokenForUser(userId);
                if (!token) {
                    throw new common_1.HellFreezesOverError(`Token for user ID ${userId} exists but nothing was returned by getAccessTokenForUser`);
                }
                return {
                    ...token,
                    userId,
                };
            }
        }
        return await this.getAppAccessToken();
    }
    /**
     * Fetches an app access token.
     *
     * @param forceNew Whether to always get a new token, even if the old one is still deemed valid internally.
     */
    async getAppAccessToken(forceNew = false) {
        if (forceNew) {
            this._appAccessToken = undefined;
        }
        return await this._appTokenFetcher.fetch(...this._appImpliedScopes.map(scopes => [scopes]));
    }
    _checkIntermediateUserRemoval(userId) {
        if (!this._userTokenFetchers.has(userId)) {
            this._cachedRefreshFailures.delete(userId);
            throw new IntermediateUserRemovalError_1.IntermediateUserRemovalError(userId);
        }
    }
    async _fetchUserToken(userId, scopeSets) {
        const previousToken = this._userAccessTokens.get(userId);
        if (!previousToken) {
            throw new Error('Trying to get token for user that was not added to the provider');
        }
        // if we don't have a current token, we just pass this and refresh right away
        if (previousToken.accessToken && !(0, AccessToken_1.accessTokenIsExpired)(previousToken)) {
            try {
                // don't create new object on every get
                if (previousToken.scope) {
                    (0, helpers_1.compareScopeSets)(previousToken.scope, scopeSets);
                    return previousToken;
                }
                const [scope = []] = await (0, helpers_1.loadAndCompareTokenInfo)(this._clientId, previousToken.accessToken, userId, previousToken.scope, scopeSets);
                const newToken = {
                    ...previousToken,
                    scope,
                };
                this._checkIntermediateUserRemoval(userId);
                this._userAccessTokens.set(userId, newToken);
                return newToken;
            }
            catch (e) {
                // if loading scopes failed, ignore InvalidTokenError and proceed with refreshing
                if (!(e instanceof InvalidTokenError_1.InvalidTokenError)) {
                    throw e;
                }
            }
        }
        this._checkIntermediateUserRemoval(userId);
        const refreshedToken = await this.refreshAccessTokenForUser(userId);
        (0, helpers_1.compareScopeSets)(refreshedToken.scope, scopeSets);
        return refreshedToken;
    }
    async _refreshUserTokenWithCallback(userId, refreshToken) {
        try {
            return await (0, helpers_1.refreshUserToken)(this.clientId, this._clientSecret, refreshToken);
        }
        catch (e) {
            this._cachedRefreshFailures.add(userId);
            this.emit(this.onRefreshFailure, userId);
            throw e;
        }
    }
    async _fetchAppToken(scopeSets) {
        if (scopeSets.length > 0) {
            for (const scopes of scopeSets) {
                if (this._appImpliedScopes.length) {
                    if (scopes.every(scope => !this._appImpliedScopes.includes(scope))) {
                        throw new Error(`One of the scopes ${scopes.join(', ')} requested but only the scope ${this._appImpliedScopes.join(', ')} is implied`);
                    }
                }
                else {
                    throw new Error(`One of the scopes ${scopes.join(', ')} requested but the client credentials flow does not support scopes`);
                }
            }
        }
        if (!this._appAccessToken || (0, AccessToken_1.accessTokenIsExpired)(this._appAccessToken)) {
            return await this._refreshAppToken();
        }
        return this._appAccessToken;
    }
    async _refreshAppToken() {
        return (this._appAccessToken = await (0, helpers_1.getAppToken)(this._clientId, this._clientSecret));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], RefreshingAuthProvider.prototype, "_clientSecret", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], RefreshingAuthProvider.prototype, "_userAccessTokens", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], RefreshingAuthProvider.prototype, "_userTokenFetchers", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], RefreshingAuthProvider.prototype, "_appAccessToken", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], RefreshingAuthProvider.prototype, "_appTokenFetcher", void 0);
RefreshingAuthProvider = tslib_1.__decorate([
    (0, common_1.rtfm)('auth', 'RefreshingAuthProvider', 'clientId')
], RefreshingAuthProvider);
exports.RefreshingAuthProvider = RefreshingAuthProvider;
