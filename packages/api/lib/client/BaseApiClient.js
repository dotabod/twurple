"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiClient = void 0;
const tslib_1 = require("tslib");
const cache_decorators_1 = require("@d-fischer/cache-decorators");
const rate_limiter_1 = require("@d-fischer/rate-limiter");
const shared_utils_1 = require("@d-fischer/shared-utils");
const typed_event_emitter_1 = require("@d-fischer/typed-event-emitter");
const api_call_1 = require("@twurple/api-call");
const auth_1 = require("@twurple/auth");
const common_1 = require("@twurple/common");
const retry = require("retry");
const HelixBitsApi_1 = require("../endpoints/bits/HelixBitsApi");
const HelixChannelApi_1 = require("../endpoints/channel/HelixChannelApi");
const HelixChannelPointsApi_1 = require("../endpoints/channelPoints/HelixChannelPointsApi");
const HelixCharityApi_1 = require("../endpoints/charity/HelixCharityApi");
const HelixChatApi_1 = require("../endpoints/chat/HelixChatApi");
const HelixClipApi_1 = require("../endpoints/clip/HelixClipApi");
const HelixContentClassificationLabelApi_1 = require("../endpoints/contentClassificationLabels/HelixContentClassificationLabelApi");
const HelixEntitlementApi_1 = require("../endpoints/entitlements/HelixEntitlementApi");
const HelixEventSubApi_1 = require("../endpoints/eventSub/HelixEventSubApi");
const HelixExtensionsApi_1 = require("../endpoints/extensions/HelixExtensionsApi");
const HelixGameApi_1 = require("../endpoints/game/HelixGameApi");
const HelixGoalApi_1 = require("../endpoints/goals/HelixGoalApi");
const HelixHypeTrainApi_1 = require("../endpoints/hypeTrain/HelixHypeTrainApi");
const HelixModerationApi_1 = require("../endpoints/moderation/HelixModerationApi");
const HelixPollApi_1 = require("../endpoints/poll/HelixPollApi");
const HelixPredictionApi_1 = require("../endpoints/prediction/HelixPredictionApi");
const HelixRaidApi_1 = require("../endpoints/raids/HelixRaidApi");
const HelixScheduleApi_1 = require("../endpoints/schedule/HelixScheduleApi");
const HelixSearchApi_1 = require("../endpoints/search/HelixSearchApi");
const HelixStreamApi_1 = require("../endpoints/stream/HelixStreamApi");
const HelixSubscriptionApi_1 = require("../endpoints/subscriptions/HelixSubscriptionApi");
const HelixTeamApi_1 = require("../endpoints/team/HelixTeamApi");
const HelixUserApi_1 = require("../endpoints/user/HelixUserApi");
const HelixVideoApi_1 = require("../endpoints/video/HelixVideoApi");
const HelixWhisperApi_1 = require("../endpoints/whisper/HelixWhisperApi");
const ApiReportedRequest_1 = require("../reporting/ApiReportedRequest");
/** @private */
let BaseApiClient = class BaseApiClient extends typed_event_emitter_1.EventEmitter {
    /** @internal */
    constructor(config, logger, rateLimiter) {
        super();
        this.onRequest = this.registerEvent();
        this._config = config;
        this._logger = logger;
        this._rateLimiter = rateLimiter;
    }
    /**
     * Requests scopes from the auth provider for the given user.
     *
     * @param user The user to request scopes for.
     * @param scopes The scopes to request.
     */
    async requestScopesForUser(user, scopes) {
        await this._config.authProvider.getAccessTokenForUser(user, ...scopes.map(scope => [scope]));
    }
    /**
     * Gets information about your access token.
     */
    async getTokenInfo() {
        try {
            const data = await this.callApi({ type: 'auth', url: 'validate' });
            return new auth_1.TokenInfo(data);
        }
        catch (e) {
            if (e instanceof api_call_1.HttpStatusCodeError && e.statusCode === 401) {
                throw new auth_1.InvalidTokenError({ cause: e });
            }
            throw e;
        }
    }
    /**
     * Makes a call to the Twitch API using your access token.
     *
     * @param options The configuration of the call.
     */
    async callApi(options) {
        var _a;
        const { authProvider } = this._config;
        const shouldAuth = (_a = options.auth) !== null && _a !== void 0 ? _a : true;
        if (!shouldAuth) {
            return await (0, api_call_1.callTwitchApi)(options, authProvider.clientId, undefined, undefined, this._config.fetchOptions);
        }
        let forceUser = false;
        if (options.forceType) {
            switch (options.forceType) {
                case 'app': {
                    if (!authProvider.getAppAccessToken) {
                        throw new Error('Tried to make an API call that requires an app access token but your auth provider does not support that');
                    }
                    const accessToken = await authProvider.getAppAccessToken();
                    return await this._callApiUsingInitialToken(options, accessToken);
                }
                case 'user': {
                    forceUser = true;
                    break;
                }
                default: {
                    throw new common_1.HellFreezesOverError(`Unknown forced token type: ${options.forceType}`);
                }
            }
        }
        if (options.scopes) {
            forceUser = true;
        }
        if (forceUser) {
            const contextUserId = options.canOverrideScopedUserContext
                ? this._getUserIdFromRequestContext(options.userId)
                : options.userId;
            if (!contextUserId) {
                throw new Error('Tried to make an API call with a user context but no context user ID');
            }
            const accessToken = await authProvider.getAccessTokenForUser(contextUserId, options.scopes);
            if (!accessToken) {
                throw new Error(`Tried to make an API call with a user context for user ID ${contextUserId} but no token was found`);
            }
            if ((0, auth_1.accessTokenIsExpired)(accessToken) && authProvider.refreshAccessTokenForUser) {
                const newAccessToken = await authProvider.refreshAccessTokenForUser(contextUserId);
                return await this._callApiUsingInitialToken(options, newAccessToken, true);
            }
            return await this._callApiUsingInitialToken(options, accessToken);
        }
        const requestContextUserId = this._getUserIdFromRequestContext(options.userId);
        const accessToken = requestContextUserId === null
            ? await authProvider.getAnyAccessToken()
            : await authProvider.getAnyAccessToken(requestContextUserId !== null && requestContextUserId !== void 0 ? requestContextUserId : options.userId);
        if ((0, auth_1.accessTokenIsExpired)(accessToken) && accessToken.userId && authProvider.refreshAccessTokenForUser) {
            const newAccessToken = await authProvider.refreshAccessTokenForUser(accessToken.userId);
            return await this._callApiUsingInitialToken(options, newAccessToken, true);
        }
        return await this._callApiUsingInitialToken(options, accessToken);
    }
    /**
     * The Helix bits API methods.
     */
    get bits() {
        return new HelixBitsApi_1.HelixBitsApi(this);
    }
    /**
     * The Helix channels API methods.
     */
    get channels() {
        return new HelixChannelApi_1.HelixChannelApi(this);
    }
    /**
     * The Helix channel points API methods.
     */
    get channelPoints() {
        return new HelixChannelPointsApi_1.HelixChannelPointsApi(this);
    }
    /**
     * The Helix charity API methods.
     */
    get charity() {
        return new HelixCharityApi_1.HelixCharityApi(this);
    }
    /**
     * The Helix chat API methods.
     */
    get chat() {
        return new HelixChatApi_1.HelixChatApi(this);
    }
    /**
     * The Helix clips API methods.
     */
    get clips() {
        return new HelixClipApi_1.HelixClipApi(this);
    }
    /**
     * The Helix content classification label API methods.
     */
    get contentClassificationLabels() {
        return new HelixContentClassificationLabelApi_1.HelixContentClassificationLabelApi(this);
    }
    /**
     * The Helix entitlement API methods.
     */
    get entitlements() {
        return new HelixEntitlementApi_1.HelixEntitlementApi(this);
    }
    /**
     * The Helix EventSub API methods.
     */
    get eventSub() {
        return new HelixEventSubApi_1.HelixEventSubApi(this);
    }
    /**
     * The Helix extensions API methods.
     */
    get extensions() {
        return new HelixExtensionsApi_1.HelixExtensionsApi(this);
    }
    /**
     * The Helix game API methods.
     */
    get games() {
        return new HelixGameApi_1.HelixGameApi(this);
    }
    /**
     * The Helix Hype Train API methods.
     */
    get hypeTrain() {
        return new HelixHypeTrainApi_1.HelixHypeTrainApi(this);
    }
    /**
     * The Helix goal API methods.
     */
    get goals() {
        return new HelixGoalApi_1.HelixGoalApi(this);
    }
    /**
     * The Helix moderation API methods.
     */
    get moderation() {
        return new HelixModerationApi_1.HelixModerationApi(this);
    }
    /**
     * The Helix poll API methods.
     */
    get polls() {
        return new HelixPollApi_1.HelixPollApi(this);
    }
    /**
     * The Helix prediction API methods.
     */
    get predictions() {
        return new HelixPredictionApi_1.HelixPredictionApi(this);
    }
    /**
     * The Helix raid API methods.
     */
    get raids() {
        return new HelixRaidApi_1.HelixRaidApi(this);
    }
    /**
     * The Helix schedule API methods.
     */
    get schedule() {
        return new HelixScheduleApi_1.HelixScheduleApi(this);
    }
    /**
     * The Helix search API methods.
     */
    get search() {
        return new HelixSearchApi_1.HelixSearchApi(this);
    }
    /**
     * The Helix stream API methods.
     */
    get streams() {
        return new HelixStreamApi_1.HelixStreamApi(this);
    }
    /**
     * The Helix subscription API methods.
     */
    get subscriptions() {
        return new HelixSubscriptionApi_1.HelixSubscriptionApi(this);
    }
    /**
     * The Helix team API methods.
     */
    get teams() {
        return new HelixTeamApi_1.HelixTeamApi(this);
    }
    /**
     * The Helix user API methods.
     */
    get users() {
        return new HelixUserApi_1.HelixUserApi(this);
    }
    /**
     * The Helix video API methods.
     */
    get videos() {
        return new HelixVideoApi_1.HelixVideoApi(this);
    }
    /**
     * The API methods that deal with whispers.
     */
    get whispers() {
        return new HelixWhisperApi_1.HelixWhisperApi(this);
    }
    /**
     * Statistics on the rate limiter for the Helix API.
     */
    get rateLimiterStats() {
        if (this._rateLimiter instanceof rate_limiter_1.ResponseBasedRateLimiter) {
            return this._rateLimiter.stats;
        }
        return null;
    }
    /** @private */
    get _authProvider() {
        return this._config.authProvider;
    }
    /** @private */
    get _mockServerPort() {
        return this._config.mockServerPort;
    }
    /** @internal */
    get _batchDelay() {
        var _a;
        return (_a = this._config.batchDelay) !== null && _a !== void 0 ? _a : 0;
    }
    // null means app access, undefined means none specified
    /** @internal */
    _getUserIdFromRequestContext(contextUserId) {
        return contextUserId;
    }
    async _callApiUsingInitialToken(options, accessToken, wasRefreshed = false) {
        var _a;
        const { authProvider } = this._config;
        const { authorizationType } = authProvider;
        let response = await this._callApiInternal(options, authProvider.clientId, accessToken.accessToken, authorizationType);
        if (response.status === 401 && !wasRefreshed) {
            if (accessToken.userId) {
                if (authProvider.refreshAccessTokenForUser) {
                    const token = await authProvider.refreshAccessTokenForUser(accessToken.userId);
                    response = await this._callApiInternal(options, authProvider.clientId, token.accessToken, authorizationType);
                }
            }
            else if (authProvider.getAppAccessToken) {
                const token = await authProvider.getAppAccessToken(true);
                response = await this._callApiInternal(options, authProvider.clientId, token.accessToken, authorizationType);
            }
        }
        this.emit(this.onRequest, new ApiReportedRequest_1.ApiReportedRequest(options, response.status, (_a = accessToken.userId) !== null && _a !== void 0 ? _a : null));
        await (0, api_call_1.handleTwitchApiResponseError)(response, options);
        return await (0, api_call_1.transformTwitchApiResponse)(response);
    }
    async _callApiInternal(options, clientId, accessToken, authorizationType) {
        var _a, _b, _c;
        const { fetchOptions, mockServerPort } = this._config;
        const type = (_a = options.type) !== null && _a !== void 0 ? _a : 'helix';
        this._logger.debug(`Calling ${type} API: ${(_b = options.method) !== null && _b !== void 0 ? _b : 'GET'} ${options.url}`);
        this._logger.trace(`Query: ${JSON.stringify(options.query)}`);
        if (options.jsonBody) {
            this._logger.trace(`Request body: ${JSON.stringify(options.jsonBody)}`);
        }
        const op = retry.operation({
            retries: 3,
            minTimeout: 500,
            factor: 2,
        });
        const { promise, resolve, reject } = (0, shared_utils_1.promiseWithResolvers)();
        op.attempt(async () => {
            try {
                const response = type === 'helix'
                    ? await this._rateLimiter.request({
                        options,
                        clientId,
                        accessToken,
                        authorizationType,
                        fetchOptions,
                        mockServerPort,
                    })
                    : await (0, api_call_1.callTwitchApiRaw)(options, clientId, accessToken, authorizationType, fetchOptions, mockServerPort);
                if (!response.ok && response.status >= 500 && response.status < 600) {
                    await (0, api_call_1.handleTwitchApiResponseError)(response, options);
                }
                resolve(response);
            }
            catch (e) {
                if (op.retry(e)) {
                    return;
                }
                reject(op.mainError());
            }
        });
        const result = await promise;
        this._logger.debug(`Called ${type} API: ${(_c = options.method) !== null && _c !== void 0 ? _c : 'GET'} ${options.url} - result: ${result.status}`);
        return result;
    }
};
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "bits", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "channels", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "channelPoints", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "charity", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "chat", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "clips", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "contentClassificationLabels", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "entitlements", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "eventSub", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "extensions", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "games", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "hypeTrain", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "goals", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "moderation", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "polls", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "predictions", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "raids", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "schedule", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "search", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "streams", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "subscriptions", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "teams", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "users", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "videos", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], BaseApiClient.prototype, "whispers", null);
BaseApiClient = tslib_1.__decorate([
    cache_decorators_1.Cacheable,
    (0, common_1.rtfm)('api', 'ApiClient')
], BaseApiClient);
exports.BaseApiClient = BaseApiClient;
