import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createModeratorActionQuery, createSingleKeyQuery } from "../../interfaces/endpoints/generic.external.mjs";
import { createAutoModProcessBody, createAutoModSettingsBody, createBanUserBody, createModerationUserListQuery, createModeratorModifyQuery, createUpdateShieldModeStatusBody, } from "../../interfaces/endpoints/moderation.external.mjs";
import { HelixPaginatedRequest } from "../../utils/pagination/HelixPaginatedRequest.mjs";
import { createPaginatedResult } from "../../utils/pagination/HelixPaginatedResult.mjs";
import { createPaginationQuery } from "../../utils/pagination/HelixPagination.mjs";
import { BaseApi } from "../BaseApi.mjs";
import { HelixAutoModSettings } from "./HelixAutoModSettings.mjs";
import { HelixAutoModStatus } from "./HelixAutoModStatus.mjs";
import { HelixBan } from "./HelixBan.mjs";
import { HelixBanUser } from "./HelixBanUser.mjs";
import { HelixBlockedTerm } from "./HelixBlockedTerm.mjs";
import { HelixModerator } from "./HelixModerator.mjs";
import { HelixShieldModeStatus } from "./HelixShieldModeStatus.mjs";
/**
 * The Helix API methods that deal with moderation.
 *
 * Can be accessed using `client.moderation` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: users } = await api.moderation.getBannedUsers('61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Moderation
 */
let HelixModerationApi = class HelixModerationApi extends BaseApi {
    /**
     * Gets a list of banned users in a given channel.
     *
     * @param channel The channel to get the banned users from.
     * @param filter Additional filters for the result set.
     *
     * @expandParams
     */
    async getBannedUsers(channel, filter) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/banned',
            userId: extractUserId(channel),
            scopes: ['moderation:read'],
            query: {
                ...createModerationUserListQuery(channel, filter),
                ...createPaginationQuery(filter),
            },
        });
        return createPaginatedResult(result, HelixBan, this._client);
    }
    /**
     * Creates a paginator for banned users in a given channel.
     *
     * @param channel The channel to get the banned users from.
     */
    getBannedUsersPaginated(channel) {
        return new HelixPaginatedRequest({
            url: 'moderation/banned',
            userId: extractUserId(channel),
            scopes: ['moderation:read'],
            query: createBroadcasterQuery(channel),
        }, this._client, data => new HelixBan(data, this._client), 50);
    }
    /**
     * Checks whether a given user is banned in a given channel.
     *
     * @param channel The channel to check for a ban of the given user.
     * @param user The user to check for a ban in the given channel.
     */
    async checkUserBan(channel, user) {
        const userId = extractUserId(user);
        const result = await this.getBannedUsers(channel, { userId });
        return result.data.some(ban => ban.userId === userId);
    }
    /**
     * Gets a list of moderators in a given channel.
     *
     * @param channel The channel to get moderators from.
     * @param filter Additional filters for the result set.
     *
     * @expandParams
     */
    async getModerators(channel, filter) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/moderators',
            userId: extractUserId(channel),
            scopes: ['moderation:read', 'channel:manage:moderators'],
            query: {
                ...createModerationUserListQuery(channel, filter),
                ...createPaginationQuery(filter),
            },
        });
        return createPaginatedResult(result, HelixModerator, this._client);
    }
    /**
     * Creates a paginator for moderators in a given channel.
     *
     * @param channel The channel to get moderators from.
     */
    getModeratorsPaginated(channel) {
        return new HelixPaginatedRequest({
            url: 'moderation/moderators',
            userId: extractUserId(channel),
            scopes: ['moderation:read', 'channel:manage:moderators'],
            query: createBroadcasterQuery(channel),
        }, this._client, data => new HelixModerator(data, this._client));
    }
    /**
     * Checks whether a given user is a moderator of a given channel.
     *
     * @param channel The channel to check.
     * @param user The user to check.
     */
    async checkUserMod(channel, user) {
        const userId = extractUserId(user);
        const result = await this.getModerators(channel, { userId });
        return result.data.some(mod => mod.userId === userId);
    }
    /**
     * Adds a moderator to the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that owns the chat room. This ID must match the user ID in the access token.
     * @param user The user to add as a moderator in the broadcaster’s chat room.
     */
    async addModerator(broadcaster, user) {
        await this._client.callApi({
            type: 'helix',
            url: 'moderation/moderators',
            method: 'POST',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:moderators'],
            query: createModeratorModifyQuery(broadcaster, user),
        });
    }
    /**
     * Removes a moderator from the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that owns the chat room. This ID must match the user ID in the access token.
     * @param user The user to remove as a moderator from the broadcaster’s chat room.
     */
    async removeModerator(broadcaster, user) {
        await this._client.callApi({
            type: 'helix',
            url: 'moderation/moderators',
            method: 'DELETE',
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:moderators'],
            query: createModeratorModifyQuery(broadcaster, user),
        });
    }
    /**
     * Determines whether a string message meets the channel's AutoMod requirements.
     *
     * @param channel The channel in which the messages to check are posted.
     * @param data An array of message data objects.
     */
    async checkAutoModStatus(channel, data) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/enforcements/status',
            method: 'POST',
            userId: extractUserId(channel),
            scopes: ['moderation:read'],
            query: createBroadcasterQuery(channel),
            jsonBody: {
                data,
            },
        });
        return result.data.map(statusData => new HelixAutoModStatus(statusData));
    }
    /**
     * Processes a message held by AutoMod.
     *
     * @param user The user who is processing the message.
     * @param msgId The ID of the message.
     * @param allow Whether to allow the message - `true` allows, and `false` denies.
     */
    async processHeldAutoModMessage(user, msgId, allow) {
        await this._client.callApi({
            type: 'helix',
            url: 'moderation/automod/message',
            method: 'POST',
            userId: extractUserId(user),
            scopes: ['moderator:manage:automod'],
            jsonBody: createAutoModProcessBody(user, msgId, allow),
        });
    }
    /**
     * Gets the AutoMod settings for a broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster to get the AutoMod settings for.
     */
    async getAutoModSettings(broadcaster) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/automod/settings',
            userId: broadcasterId,
            scopes: ['moderator:read:automod_settings'],
            canOverrideScopedUserContext: true,
            query: this._createModeratorActionQuery(broadcasterId),
        });
        return result.data.map(data => new HelixAutoModSettings(data));
    }
    /**
     * Updates the AutoMod settings for a broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster for which the AutoMod settings are updated.
     * @param data The updated AutoMod settings that replace the current AutoMod settings.
     */
    async updateAutoModSettings(broadcaster, data) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/automod/settings',
            method: 'PUT',
            userId: broadcasterId,
            scopes: ['moderator:manage:automod_settings'],
            canOverrideScopedUserContext: true,
            query: this._createModeratorActionQuery(broadcasterId),
            jsonBody: createAutoModSettingsBody(data),
        });
        return result.data.map(settingsData => new HelixAutoModSettings(settingsData));
    }
    /**
     * Bans or times out a user in a channel.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster in whose channel the user will be banned/timed out.
     * @param data
     *
     * @expandParams
     *
     * @returns The result data from the ban/timeout request.
     */
    async banUser(broadcaster, data) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/bans',
            method: 'POST',
            userId: broadcasterId,
            scopes: ['moderator:manage:banned_users'],
            canOverrideScopedUserContext: true,
            query: this._createModeratorActionQuery(broadcasterId),
            jsonBody: createBanUserBody(data),
        });
        return result.data.map(banData => new HelixBanUser(banData, banData.end_time, this._client));
    }
    /**
     * Unbans/removes the timeout for a user in a channel.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster in whose channel the user will be unbanned/removed from timeout.
     * @param user The user who will be unbanned/removed from timeout.
     */
    async unbanUser(broadcaster, user) {
        const broadcasterId = extractUserId(broadcaster);
        await this._client.callApi({
            type: 'helix',
            url: 'moderation/bans',
            method: 'DELETE',
            userId: broadcasterId,
            scopes: ['moderator:manage:banned_users'],
            canOverrideScopedUserContext: true,
            query: {
                ...this._createModeratorActionQuery(broadcasterId),
                ...createSingleKeyQuery('user_id', extractUserId(user)),
            },
        });
    }
    /**
     * Gets the broadcaster’s list of non-private, blocked words or phrases.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster to get their channel's blocked terms for.
     * @param pagination
     *
     * @expandParams
     *
     * @returns A paginated list of blocked term data in the broadcaster's channel.
     */
    async getBlockedTerms(broadcaster, pagination) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/blocked_terms',
            userId: broadcasterId,
            scopes: ['moderator:read:blocked_terms'],
            canOverrideScopedUserContext: true,
            query: {
                ...this._createModeratorActionQuery(broadcasterId),
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResult(result, HelixBlockedTerm, this._client);
    }
    /**
     * Adds a blocked term to the broadcaster's channel.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster in whose channel the term will be blocked.
     * @param text The word or phrase to block from being used in the broadcaster's channel.
     *
     * @returns Information about the term that has been blocked.
     */
    async addBlockedTerm(broadcaster, text) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/blocked_terms',
            method: 'POST',
            userId: broadcasterId,
            scopes: ['moderator:manage:blocked_terms'],
            canOverrideScopedUserContext: true,
            query: this._createModeratorActionQuery(broadcasterId),
            jsonBody: {
                text,
            },
        });
        return result.data.map(blockedTermData => new HelixBlockedTerm(blockedTermData));
    }
    /**
     * Removes a blocked term from the broadcaster's channel.
     *
     * @param broadcaster The broadcaster in whose channel the term will be unblocked.
     * @param moderator A user that has permission to unblock terms in the broadcaster's channel.
     * The token of this user will be used to remove the blocked term.
     * @param id The ID of the term that should be unblocked.
     */
    async removeBlockedTerm(broadcaster, moderator, id) {
        const broadcasterId = extractUserId(broadcaster);
        await this._client.callApi({
            type: 'helix',
            url: 'moderation/blocked_terms',
            method: 'DELETE',
            userId: broadcasterId,
            scopes: ['moderator:manage:blocked_terms'],
            canOverrideScopedUserContext: true,
            query: {
                ...this._createModeratorActionQuery(broadcasterId),
                id,
            },
        });
    }
    /**
     * Removes a single chat message or all chat messages from the broadcaster’s chat room.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster the chat belongs to.
     * @param messageId The ID of the message to remove. If not specified, the request removes all messages in the broadcaster’s chat room.
     */
    async deleteChatMessages(broadcaster, messageId) {
        const broadcasterId = extractUserId(broadcaster);
        await this._client.callApi({
            type: 'helix',
            url: 'moderation/chat',
            method: 'DELETE',
            userId: broadcasterId,
            scopes: ['moderator:manage:chat_messages'],
            canOverrideScopedUserContext: true,
            query: {
                ...this._createModeratorActionQuery(broadcasterId),
                ...createSingleKeyQuery('message_id', messageId),
            },
        });
    }
    /**
     * Gets the broadcaster's Shield Mode activation status.
     *
     * @param broadcaster The broadcaster whose Shield Mode activation status you want to get.
     */
    async getShieldModeStatus(broadcaster) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/shield_mode',
            method: 'GET',
            userId: broadcasterId,
            scopes: ['moderator:read:shield_mode', 'moderator:manage:shield_mode'],
            canOverrideScopedUserContext: true,
            query: this._createModeratorActionQuery(broadcasterId),
        });
        return new HelixShieldModeStatus(result.data[0], this._client);
    }
    /**
     * Activates or deactivates the broadcaster's Shield Mode.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster whose Shield Mode you want to activate or deactivate.
     * @param activate The desired Shield Mode status on the broadcaster's channel.
     */
    async updateShieldModeStatus(broadcaster, activate) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'moderation/shield_mode',
            method: 'PUT',
            userId: broadcasterId,
            scopes: ['moderator:manage:shield_mode'],
            canOverrideScopedUserContext: true,
            query: this._createModeratorActionQuery(broadcasterId),
            jsonBody: createUpdateShieldModeStatusBody(activate),
        });
        return new HelixShieldModeStatus(result.data[0], this._client);
    }
    _createModeratorActionQuery(broadcasterId) {
        return createModeratorActionQuery(broadcasterId, this._getUserContextIdWithDefault(broadcasterId));
    }
};
HelixModerationApi = __decorate([
    rtfm('api', 'HelixModerationApi')
], HelixModerationApi);
export { HelixModerationApi };
