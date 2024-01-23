"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixSubscriptionApi = void 0;
const tslib_1 = require("tslib");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const generic_external_1 = require("../../interfaces/endpoints/generic.external");
const subscription_external_1 = require("../../interfaces/endpoints/subscription.external");
const HelixPaginatedResult_1 = require("../../utils/pagination/HelixPaginatedResult");
const HelixPagination_1 = require("../../utils/pagination/HelixPagination");
const BaseApi_1 = require("../BaseApi");
const HelixPaginatedSubscriptionsRequest_1 = require("./HelixPaginatedSubscriptionsRequest");
const HelixSubscription_1 = require("./HelixSubscription");
const HelixUserSubscription_1 = require("./HelixUserSubscription");
/**
 * The Helix API methods that deal with subscriptions.
 *
 * Can be accessed using `client.subscriptions` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const subscription = await api.subscriptions.getSubscriptionForUser('61369223', '125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Subscriptions
 */
let HelixSubscriptionApi = class HelixSubscriptionApi extends BaseApi_1.BaseApi {
    /**
     * Gets a list of all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     * @param pagination
     *
     * @expandParams
     */
    async getSubscriptions(broadcaster, pagination) {
        const result = await this._client.callApi({
            url: 'subscriptions',
            scopes: ['channel:read:subscriptions'],
            type: 'helix',
            userId: (0, common_1.extractUserId)(broadcaster),
            query: {
                ...(0, api_call_1.createBroadcasterQuery)(broadcaster),
                ...(0, HelixPagination_1.createPaginationQuery)(pagination),
            },
        });
        return {
            ...(0, HelixPaginatedResult_1.createPaginatedResultWithTotal)(result, HelixSubscription_1.HelixSubscription, this._client),
            points: result.points,
        };
    }
    /**
     * Creates a paginator for all subscriptions to a given broadcaster.
     *
     * @param broadcaster The broadcaster to list subscriptions to.
     */
    getSubscriptionsPaginated(broadcaster) {
        return new HelixPaginatedSubscriptionsRequest_1.HelixPaginatedSubscriptionsRequest(broadcaster, this._client);
    }
    /**
     * Gets the subset of the given user list that is subscribed to the given broadcaster.
     *
     * @param broadcaster The broadcaster to find subscriptions to.
     * @param users The users that should be checked for subscriptions.
     */
    async getSubscriptionsForUsers(broadcaster, users) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'subscriptions',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:subscriptions'],
            query: (0, generic_external_1.createChannelUsersCheckQuery)(broadcaster, users),
        });
        return result.data.map(data => new HelixSubscription_1.HelixSubscription(data, this._client));
    }
    /**
     * Gets the subscription data for a given user to a given broadcaster.
     *
     * This checks with the authorization of a broadcaster.
     * If you only have the authorization of a user, check {@link HelixSubscriptionApi#checkUserSubscription}}.
     *
     * @param broadcaster The broadcaster to check.
     * @param user The user to check.
     */
    async getSubscriptionForUser(broadcaster, user) {
        const list = await this.getSubscriptionsForUsers(broadcaster, [user]);
        return list.length ? list[0] : null;
    }
    /**
     * Checks if a given user is subscribed to a given broadcaster. Returns null if not subscribed.
     *
     * This checks with the authorization of a user.
     * If you only have the authorization of a broadcaster, check {@link HelixSubscriptionApi#getSubscriptionForUser}}.
     *
     * @param user The user to check.
     * @param broadcaster The broadcaster to check the user's subscription for.
     */
    async checkUserSubscription(user, broadcaster) {
        try {
            const result = await this._client.callApi({
                type: 'helix',
                url: 'subscriptions/user',
                userId: (0, common_1.extractUserId)(user),
                scopes: ['user:read:subscriptions'],
                query: (0, subscription_external_1.createSubscriptionCheckQuery)(broadcaster, user),
            });
            return new HelixUserSubscription_1.HelixUserSubscription(result.data[0], this._client);
        }
        catch (e) {
            if (e instanceof api_call_1.HttpStatusCodeError && e.statusCode === 404) {
                return null;
            }
            throw e;
        }
    }
};
HelixSubscriptionApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixSubscriptionApi')
], HelixSubscriptionApi);
exports.HelixSubscriptionApi = HelixSubscriptionApi;
