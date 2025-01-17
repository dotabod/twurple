"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixChannelApi = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const channel_external_1 = require("../../interfaces/endpoints/channel.external");
const generic_external_1 = require("../../interfaces/endpoints/generic.external");
const HelixUserRelation_1 = require("../../relations/HelixUserRelation");
const HelixRequestBatcher_1 = require("../../utils/HelixRequestBatcher");
const HelixPaginatedRequest_1 = require("../../utils/pagination/HelixPaginatedRequest");
const HelixPaginatedRequestWithTotal_1 = require("../../utils/pagination/HelixPaginatedRequestWithTotal");
const HelixPaginatedResult_1 = require("../../utils/pagination/HelixPaginatedResult");
const HelixPagination_1 = require("../../utils/pagination/HelixPagination");
const BaseApi_1 = require("../BaseApi");
const HelixChannel_1 = require("./HelixChannel");
const HelixChannelEditor_1 = require("./HelixChannelEditor");
const HelixChannelFollower_1 = require("./HelixChannelFollower");
const HelixFollowedChannel_1 = require("./HelixFollowedChannel");
const HelixAdSchedule_1 = require("./HelixAdSchedule");
const HelixSnoozeNextAdResult_1 = require("./HelixSnoozeNextAdResult");
/**
 * The Helix API methods that deal with channels.
 *
 * Can be accessed using `client.channels` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const channel = await api.channels.getChannelInfoById('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Channels
 */
let HelixChannelApi = class HelixChannelApi extends BaseApi_1.BaseApi {
    constructor() {
        super(...arguments);
        /** @internal */
        this._getChannelByIdBatcher = new HelixRequestBatcher_1.HelixRequestBatcher({
            url: 'channels',
        }, 'broadcaster_id', 'broadcaster_id', this._client, (data) => new HelixChannel_1.HelixChannel(data, this._client));
    }
    /**
     * Gets the channel data for the given user.
     *
     * @param user The user you want to get channel info for.
     */
    async getChannelInfoById(user) {
        const userId = (0, common_1.extractUserId)(user);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'channels',
            userId,
            query: (0, api_call_1.createBroadcasterQuery)(userId),
        });
        return (0, shared_utils_1.mapNullable)(result.data[0], data => new HelixChannel_1.HelixChannel(data, this._client));
    }
    /**
     * Gets the channel data for the given user, batching multiple calls into fewer requests as the API allows.
     *
     * @param user The user you want to get channel info for.
     */
    async getChannelInfoByIdBatched(user) {
        return await this._getChannelByIdBatcher.request((0, common_1.extractUserId)(user));
    }
    /**
     * Gets the channel data for the given users.
     *
     * @param users The users you want to get channel info for.
     */
    async getChannelInfoByIds(users) {
        const userIds = users.map(common_1.extractUserId);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'channels',
            query: (0, generic_external_1.createSingleKeyQuery)('broadcaster_id', userIds),
        });
        return result.data.map(data => new HelixChannel_1.HelixChannel(data, this._client));
    }
    /**
     * Updates the given user's channel data.
     *
     * @param user The user you want to update channel info for.
     * @param data The channel info to set.
     */
    async updateChannelInfo(user, data) {
        await this._client.callApi({
            type: 'helix',
            url: 'channels',
            method: 'PATCH',
            userId: (0, common_1.extractUserId)(user),
            scopes: ['channel:manage:broadcast'],
            query: (0, api_call_1.createBroadcasterQuery)(user),
            jsonBody: (0, channel_external_1.createChannelUpdateBody)(data),
        });
    }
    /**
     * Starts a commercial on a channel.
     *
     * @param broadcaster The broadcaster on whose channel the commercial is started.
     * @param length The length of the commercial, in seconds.
     */
    async startChannelCommercial(broadcaster, length) {
        await this._client.callApi({
            type: 'helix',
            url: 'channels/commercial',
            method: 'POST',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:edit:commercial'],
            jsonBody: (0, channel_external_1.createChannelCommercialBody)(broadcaster, length),
        });
    }
    /**
     * Gets a list of users who have editor permissions on your channel.
     *
     * @param broadcaster The broadcaster to retreive the editors for.
     */
    async getChannelEditors(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'channels/editors',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:editors'],
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        });
        return result.data.map(data => new HelixChannelEditor_1.HelixChannelEditor(data, this._client));
    }
    /**
     * Gets a list of VIPs in a channel.
     *
     * @param broadcaster The owner of the channel to get VIPs for.
     * @param pagination
     *
     * @expandParams
     */
    async getVips(broadcaster, pagination) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'channels/vips',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:vips', 'channel:manage:vips'],
            query: {
                ...(0, api_call_1.createBroadcasterQuery)(broadcaster),
                ...(0, HelixPagination_1.createPaginationQuery)(pagination),
            },
        });
        return (0, HelixPaginatedResult_1.createPaginatedResult)(response, HelixUserRelation_1.HelixUserRelation, this._client);
    }
    /**
     * Creates a paginator for VIPs in a channel.
     *
     * @param broadcaster The owner of the channel to get VIPs for.
     */
    getVipsPaginated(broadcaster) {
        return new HelixPaginatedRequest_1.HelixPaginatedRequest({
            url: 'channels/vips',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:vips', 'channel:manage:vips'],
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        }, this._client, data => new HelixUserRelation_1.HelixUserRelation(data, this._client));
    }
    /**
     * Checks the VIP status of a list of users in a channel.
     *
     * @param broadcaster The owner of the channel to check VIP status in.
     * @param users The users to check.
     */
    async checkVipForUsers(broadcaster, users) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'channels/vips',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:vips', 'channel:manage:vips'],
            query: (0, generic_external_1.createChannelUsersCheckQuery)(broadcaster, users),
        });
        return response.data.map(data => new HelixUserRelation_1.HelixUserRelation(data, this._client));
    }
    /**
     * Checks the VIP status of a user in a channel.
     *
     * @param broadcaster The owner of the channel to check VIP status in.
     * @param user The user to check.
     */
    async checkVipForUser(broadcaster, user) {
        const userId = (0, common_1.extractUserId)(user);
        const result = await this.checkVipForUsers(broadcaster, [userId]);
        return result.some(rel => rel.id === userId);
    }
    /**
     * Adds a VIP to the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that’s granting VIP status to the user. This ID must match the user ID in the access token.
     * @param user The user to add as a VIP in the broadcaster’s chat room.
     */
    async addVip(broadcaster, user) {
        await this._client.callApi({
            type: 'helix',
            url: 'channels/vips',
            method: 'POST',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:manage:vips'],
            query: (0, channel_external_1.createChannelVipUpdateQuery)(broadcaster, user),
        });
    }
    /**
     * Removes a VIP from the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that’s removing VIP status from the user. This ID must match the user ID in the access token.
     * @param user The user to remove as a VIP from the broadcaster’s chat room.
     */
    async removeVip(broadcaster, user) {
        await this._client.callApi({
            type: 'helix',
            url: 'channels/vips',
            method: 'DELETE',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:manage:vips'],
            query: (0, channel_external_1.createChannelVipUpdateQuery)(broadcaster, user),
        });
    }
    /**
     * Gets the total number of users that follow the specified broadcaster.
     *
     * @param broadcaster The broadcaster you want to get the number of followers of.
     */
    async getChannelFollowerCount(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'channels/followers',
            method: 'GET',
            userId: (0, common_1.extractUserId)(broadcaster),
            query: {
                ...(0, channel_external_1.createChannelFollowerQuery)(broadcaster),
                ...(0, HelixPagination_1.createPaginationQuery)({ limit: 1 }),
            },
        });
        return result.total;
    }
    /**
     * Gets a list of users that follow the specified broadcaster.
     * You can also use this endpoint to see whether a specific user follows the broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster you want to get a list of followers for.
     * @param user An optional user to determine if this user follows the broadcaster.
     * If specified, the response contains this user if they follow the broadcaster.
     * If not specified, the response contains all users that follow the broadcaster.
     * @param pagination
     *
     * @expandParams
     */
    async getChannelFollowers(broadcaster, user, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'channels/followers',
            method: 'GET',
            userId: (0, common_1.extractUserId)(broadcaster),
            canOverrideScopedUserContext: true,
            scopes: ['moderator:read:followers'],
            query: {
                ...(0, channel_external_1.createChannelFollowerQuery)(broadcaster, user),
                ...(0, HelixPagination_1.createPaginationQuery)(pagination),
            },
        });
        return (0, HelixPaginatedResult_1.createPaginatedResultWithTotal)(result, HelixChannelFollower_1.HelixChannelFollower, this._client);
    }
    /**
     * Creates a paginator for users that follow the specified broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster for whom you are getting a list of followers.
     *
     * @expandParams
     */
    getChannelFollowersPaginated(broadcaster) {
        return new HelixPaginatedRequestWithTotal_1.HelixPaginatedRequestWithTotal({
            url: 'channels/followers',
            method: 'GET',
            userId: (0, common_1.extractUserId)(broadcaster),
            canOverrideScopedUserContext: true,
            scopes: ['moderator:read:followers'],
            query: (0, channel_external_1.createChannelFollowerQuery)(broadcaster),
        }, this._client, data => new HelixChannelFollower_1.HelixChannelFollower(data, this._client));
    }
    /**
     * Gets a list of broadcasters that the specified user follows.
     * You can also use this endpoint to see whether the user follows a specific broadcaster.
     *
     * @param user The user that's getting a list of followed channels.
     * This ID must match the user ID in the access token.
     * @param broadcaster An optional broadcaster to determine if the user follows this broadcaster.
     * If specified, the response contains this broadcaster if the user follows them.
     * If not specified, the response contains all broadcasters that the user follows.
     * @param pagination
     * @returns
     */
    async getFollowedChannels(user, broadcaster, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'channels/followed',
            method: 'GET',
            userId: (0, common_1.extractUserId)(user),
            scopes: ['user:read:follows'],
            query: {
                ...(0, channel_external_1.createFollowedChannelQuery)(user, broadcaster),
                ...(0, HelixPagination_1.createPaginationQuery)(pagination),
            },
        });
        return (0, HelixPaginatedResult_1.createPaginatedResultWithTotal)(result, HelixFollowedChannel_1.HelixFollowedChannel, this._client);
    }
    /**
     * Creates a paginator for broadcasters that the specified user follows.
     *
     * @param user The user that's getting a list of followed channels.
     * The token of this user will be used to get the list of followed channels.
     * @param broadcaster An optional broadcaster to determine if the user follows this broadcaster.
     * If specified, the response contains this broadcaster if the user follows them.
     * If not specified, the response contains all broadcasters that the user follows.
     * @returns
     */
    getFollowedChannelsPaginated(user, broadcaster) {
        return new HelixPaginatedRequestWithTotal_1.HelixPaginatedRequestWithTotal({
            url: 'channels/followed',
            method: 'GET',
            userId: (0, common_1.extractUserId)(user),
            scopes: ['user:read:follows'],
            query: (0, channel_external_1.createFollowedChannelQuery)(user, broadcaster),
        }, this._client, data => new HelixFollowedChannel_1.HelixFollowedChannel(data, this._client));
    }
    /**
     * Gets information about the broadcaster's ad schedule.
     *
     * @param broadcaster The broadcaster to get ad schedule information about.
     */
    async getAdSchedule(broadcaster) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'channels/ads',
            method: 'GET',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:ads'],
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        });
        return new HelixAdSchedule_1.HelixAdSchedule(response.data[0]);
    }
    /**
     * Snoozes the broadcaster's next ad, if a snooze is available.
     *
     * @param broadcaster The broadcaster to get ad schedule information about.
     */
    async snoozeNextAd(broadcaster) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'channels/ads/schedule/snooze',
            method: 'POST',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:manage:ads'],
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        });
        return new HelixSnoozeNextAdResult_1.HelixSnoozeNextAdResult(response.data[0]);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixChannelApi.prototype, "_getChannelByIdBatcher", void 0);
HelixChannelApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixChannelApi')
], HelixChannelApi);
exports.HelixChannelApi = HelixChannelApi;
