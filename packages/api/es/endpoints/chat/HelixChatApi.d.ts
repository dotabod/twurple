import { type UserIdResolvable } from '@twurple/common';
import { type HelixChatChatterData, type HelixChatUserColor } from '../../interfaces/endpoints/chat.external';
import { type HelixSendChatAnnouncementParams, type HelixUpdateChatSettingsParams } from '../../interfaces/endpoints/chat.input';
import { HelixPaginatedRequestWithTotal } from '../../utils/pagination/HelixPaginatedRequestWithTotal';
import { type HelixPaginatedResultWithTotal } from '../../utils/pagination/HelixPaginatedResult';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination';
import { BaseApi } from '../BaseApi';
import { HelixChannelEmote } from './HelixChannelEmote';
import { HelixChatBadgeSet } from './HelixChatBadgeSet';
import { HelixChatChatter } from './HelixChatChatter';
import { HelixChatSettings } from './HelixChatSettings';
import { HelixEmote } from './HelixEmote';
import { HelixEmoteFromSet } from './HelixEmoteFromSet';
import { HelixPrivilegedChatSettings } from './HelixPrivilegedChatSettings';
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
export declare class HelixChatApi extends BaseApi {
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
    getChatters(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResultWithTotal<HelixChatChatter>>;
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
    getChattersPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequestWithTotal<HelixChatChatterData, HelixChatChatter>;
    /**
     * Gets all global badges.
     */
    getGlobalBadges(): Promise<HelixChatBadgeSet[]>;
    /**
     * Gets all badges specific to the given broadcaster.
     *
     * @param broadcaster The broadcaster to get badges for.
     */
    getChannelBadges(broadcaster: UserIdResolvable): Promise<HelixChatBadgeSet[]>;
    /**
     * Gets all global emotes.
     */
    getGlobalEmotes(): Promise<HelixEmote[]>;
    /**
     * Gets all emotes specific to the given broadcaster.
     *
     * @param broadcaster The broadcaster to get emotes for.
     */
    getChannelEmotes(broadcaster: UserIdResolvable): Promise<HelixChannelEmote[]>;
    /**
     * Gets all emotes from a list of emote sets.
     *
     * @param setIds The IDs of the emote sets to get emotes from.
     */
    getEmotesFromSets(setIds: string[]): Promise<HelixEmoteFromSet[]>;
    /**
     * Gets the settings of a broadcaster's chat.
     *
     * @param broadcaster The broadcaster the chat belongs to.
     */
    getSettings(broadcaster: UserIdResolvable): Promise<HelixChatSettings>;
    /**
     * Gets the settings of a broadcaster's chat, including the delay settings.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster the chat belongs to.
     */
    getSettingsPrivileged(broadcaster: UserIdResolvable): Promise<HelixPrivilegedChatSettings>;
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
    updateSettings(broadcaster: UserIdResolvable, settings: HelixUpdateChatSettingsParams): Promise<HelixPrivilegedChatSettings>;
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
    sendAnnouncement(broadcaster: UserIdResolvable, announcement: HelixSendChatAnnouncementParams): Promise<void>;
    /**
     * Gets the chat colors for a list of users.
     *
     * Returns a Map with user IDs as keys and their colors as values.
     * The value is a color hex code, or `null` if the user did not set a color,
     * and unknown users will not be present in the map.
     *
     * @param users The users to get the chat colors of.
     */
    getColorsForUsers(users: UserIdResolvable[]): Promise<Map<string, string | null>>;
    /**
     * Gets the chat color for a user.
     *
     * Returns the color as hex code, `null` if the user did not set a color, or `undefined` if the user is unknown.
     *
     * @param user The user to get the chat color of.
     */
    getColorForUser(user: UserIdResolvable): Promise<string | null | undefined>;
    /**
     * Changes the chat color for a user.
     *
     * @param user The user to change the color of.
     * @param color The color to set.
     *
     * Note that hex codes can only be used by users that have a Prime or Turbo subscription.
     */
    setColorForUser(user: UserIdResolvable, color: HelixChatUserColor): Promise<void>;
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
    shoutoutUser(from: UserIdResolvable, to: UserIdResolvable): Promise<void>;
    private _createModeratorActionQuery;
}
