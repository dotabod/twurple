import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createChatColorUpdateQuery, createChatSettingsUpdateBody, createShoutoutQuery, } from "../../interfaces/endpoints/chat.external.mjs";
import { createModeratorActionQuery, createSingleKeyQuery } from "../../interfaces/endpoints/generic.external.mjs";
import { HelixPaginatedRequestWithTotal } from "../../utils/pagination/HelixPaginatedRequestWithTotal.mjs";
import { createPaginatedResultWithTotal, } from "../../utils/pagination/HelixPaginatedResult.mjs";
import { createPaginationQuery } from "../../utils/pagination/HelixPagination.mjs";
import { BaseApi } from "../BaseApi.mjs";
import { HelixChannelEmote } from "./HelixChannelEmote.mjs";
import { HelixChatBadgeSet } from "./HelixChatBadgeSet.mjs";
import { HelixChatChatter } from "./HelixChatChatter.mjs";
import { HelixChatSettings } from "./HelixChatSettings.mjs";
import { HelixEmote } from "./HelixEmote.mjs";
import { HelixEmoteFromSet } from "./HelixEmoteFromSet.mjs";
import { HelixPrivilegedChatSettings } from "./HelixPrivilegedChatSettings.mjs";
/**
 * The Helix API methods that deal with chat.
 *
 * Can be accessed using `client.chat` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const rewards = await api.chat.getChannelBadges('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Chat
 */
let HelixChatApi = class HelixChatApi extends BaseApi {
    /**
     * Gets the list of users that are connected to the broadcaster’s chat session.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster whose list of chatters you want to get.
     * @param pagination
     *
     * @expandParams
     */
    async getChatters(broadcaster, pagination) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/chatters',
            userId: broadcasterId,
            canOverrideScopedUserContext: true,
            scopes: ['moderator:read:chatters'],
            query: {
                ...this._createModeratorActionQuery(broadcasterId),
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResultWithTotal(result, HelixChatChatter, this._client);
    }
    /**
     * Creates a paginator for users that are connected to the broadcaster’s chat session.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster whose list of chatters you want to get.
     *
     * @expandParams
     */
    getChattersPaginated(broadcaster) {
        const broadcasterId = extractUserId(broadcaster);
        return new HelixPaginatedRequestWithTotal({
            url: 'chat/chatters',
            userId: broadcasterId,
            canOverrideScopedUserContext: true,
            scopes: ['moderator:read:chatters'],
            query: this._createModeratorActionQuery(broadcasterId),
        }, this._client, data => new HelixChatChatter(data, this._client));
    }
    /**
     * Gets all global badges.
     */
    async getGlobalBadges() {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/badges/global',
        });
        return result.data.map(data => new HelixChatBadgeSet(data));
    }
    /**
     * Gets all badges specific to the given broadcaster.
     *
     * @param broadcaster The broadcaster to get badges for.
     */
    async getChannelBadges(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/badges',
            userId: extractUserId(broadcaster),
            query: createBroadcasterQuery(broadcaster),
        });
        return result.data.map(data => new HelixChatBadgeSet(data));
    }
    /**
     * Gets all global emotes.
     */
    async getGlobalEmotes() {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/emotes/global',
        });
        return result.data.map(data => new HelixEmote(data));
    }
    /**
     * Gets all emotes specific to the given broadcaster.
     *
     * @param broadcaster The broadcaster to get emotes for.
     */
    async getChannelEmotes(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/emotes',
            userId: extractUserId(broadcaster),
            query: createBroadcasterQuery(broadcaster),
        });
        return result.data.map(data => new HelixChannelEmote(data, this._client));
    }
    /**
     * Gets all emotes from a list of emote sets.
     *
     * @param setIds The IDs of the emote sets to get emotes from.
     */
    async getEmotesFromSets(setIds) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/emotes/set',
            query: createSingleKeyQuery('emote_set_id', setIds),
        });
        return result.data.map(data => new HelixEmoteFromSet(data, this._client));
    }
    /**
     * Gets the settings of a broadcaster's chat.
     *
     * @param broadcaster The broadcaster the chat belongs to.
     */
    async getSettings(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/settings',
            userId: extractUserId(broadcaster),
            query: createBroadcasterQuery(broadcaster),
        });
        return new HelixChatSettings(result.data[0]);
    }
    /**
     * Gets the settings of a broadcaster's chat, including the delay settings.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster the chat belongs to.
     */
    async getSettingsPrivileged(broadcaster) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/settings',
            userId: broadcasterId,
            canOverrideScopedUserContext: true,
            scopes: ['moderator:read:chat_settings'],
            query: this._createModeratorActionQuery(broadcasterId),
        });
        return new HelixPrivilegedChatSettings(result.data[0]);
    }
    /**
     * Updates the settings of a broadcaster's chat.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @expandParams
     *
     * @param broadcaster The broadcaster the chat belongs to.
     * @param settings The settings to change.
     */
    async updateSettings(broadcaster, settings) {
        const broadcasterId = extractUserId(broadcaster);
        const result = await this._client.callApi({
            type: 'helix',
            url: 'chat/settings',
            method: 'PATCH',
            userId: broadcasterId,
            canOverrideScopedUserContext: true,
            scopes: ['moderator:manage:chat_settings'],
            query: this._createModeratorActionQuery(broadcasterId),
            jsonBody: createChatSettingsUpdateBody(settings),
        });
        return new HelixPrivilegedChatSettings(result.data[0]);
    }
    /**
     * Sends an announcement to a broadcaster's chat.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster the chat belongs to.
     * @param announcement The announcement to send.
     */
    async sendAnnouncement(broadcaster, announcement) {
        const broadcasterId = extractUserId(broadcaster);
        await this._client.callApi({
            type: 'helix',
            url: 'chat/announcements',
            method: 'POST',
            userId: broadcasterId,
            canOverrideScopedUserContext: true,
            scopes: ['moderator:manage:announcements'],
            query: this._createModeratorActionQuery(broadcasterId),
            jsonBody: {
                message: announcement.message,
                color: announcement.color,
            },
        });
    }
    /**
     * Gets the chat colors for a list of users.
     *
     * Returns a Map with user IDs as keys and their colors as values.
     * The value is a color hex code, or `null` if the user did not set a color,
     * and unknown users will not be present in the map.
     *
     * @param users The users to get the chat colors of.
     */
    async getColorsForUsers(users) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'chat/color',
            query: createSingleKeyQuery('user_id', users.map(extractUserId)),
        });
        return new Map(response.data.map(data => [data.user_id, data.color || null]));
    }
    /**
     * Gets the chat color for a user.
     *
     * Returns the color as hex code, `null` if the user did not set a color, or `undefined` if the user is unknown.
     *
     * @param user The user to get the chat color of.
     */
    async getColorForUser(user) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'chat/color',
            userId: extractUserId(user),
            query: createSingleKeyQuery('user_id', extractUserId(user)),
        });
        if (!response.data.length) {
            return undefined;
        }
        return response.data[0].color || null;
    }
    /**
     * Changes the chat color for a user.
     *
     * @param user The user to change the color of.
     * @param color The color to set.
     *
     * Note that hex codes can only be used by users that have a Prime or Turbo subscription.
     */
    async setColorForUser(user, color) {
        await this._client.callApi({
            type: 'helix',
            url: 'chat/color',
            method: 'PUT',
            userId: extractUserId(user),
            scopes: ['user:manage:chat_color'],
            query: createChatColorUpdateQuery(user, color),
        });
    }
    /**
     * Sends a shoutout to the specified broadcaster.
     * The broadcaster may send a shoutout once every 2 minutes. They may send the same broadcaster a shoutout once every 60 minutes.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param from The ID of the broadcaster that’s sending the shoutout.
     * @param to The ID of the broadcaster that’s receiving the shoutout.
     */
    async shoutoutUser(from, to) {
        const fromId = extractUserId(from);
        await this._client.callApi({
            type: 'helix',
            url: 'chat/shoutouts',
            method: 'POST',
            userId: fromId,
            canOverrideScopedUserContext: true,
            scopes: ['moderator:manage:shoutouts'],
            query: createShoutoutQuery(from, to, this._getUserContextIdWithDefault(fromId)),
        });
    }
    _createModeratorActionQuery(broadcasterId) {
        return createModeratorActionQuery(broadcasterId, this._getUserContextIdWithDefault(broadcasterId));
    }
};
HelixChatApi = __decorate([
    rtfm('api', 'HelixChatApi')
], HelixChatApi);
export { HelixChatApi };