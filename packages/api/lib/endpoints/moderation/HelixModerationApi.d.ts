import { type UserIdResolvable } from '@twurple/common';
import { type HelixBanData, type HelixModeratorData } from '../../interfaces/endpoints/moderation.external';
import { type HelixAutoModSettingsUpdate, type HelixBanFilter, type HelixBanUserRequest, type HelixCheckAutoModStatusData, type HelixModeratorFilter } from '../../interfaces/endpoints/moderation.input';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination';
import { BaseApi } from '../BaseApi';
import { HelixAutoModSettings } from './HelixAutoModSettings';
import { HelixAutoModStatus } from './HelixAutoModStatus';
import { HelixBan } from './HelixBan';
import { HelixBanUser } from './HelixBanUser';
import { HelixBlockedTerm } from './HelixBlockedTerm';
import { HelixModerator } from './HelixModerator';
import { HelixShieldModeStatus } from './HelixShieldModeStatus';
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
export declare class HelixModerationApi extends BaseApi {
    /**
     * Gets a list of banned users in a given channel.
     *
     * @param channel The channel to get the banned users from.
     * @param filter Additional filters for the result set.
     *
     * @expandParams
     */
    getBannedUsers(channel: UserIdResolvable, filter?: HelixBanFilter): Promise<HelixPaginatedResult<HelixBan>>;
    /**
     * Creates a paginator for banned users in a given channel.
     *
     * @param channel The channel to get the banned users from.
     */
    getBannedUsersPaginated(channel: UserIdResolvable): HelixPaginatedRequest<HelixBanData, HelixBan>;
    /**
     * Checks whether a given user is banned in a given channel.
     *
     * @param channel The channel to check for a ban of the given user.
     * @param user The user to check for a ban in the given channel.
     */
    checkUserBan(channel: UserIdResolvable, user: UserIdResolvable): Promise<boolean>;
    /**
     * Gets a list of moderators in a given channel.
     *
     * @param channel The channel to get moderators from.
     * @param filter Additional filters for the result set.
     *
     * @expandParams
     */
    getModerators(channel: UserIdResolvable, filter?: HelixModeratorFilter): Promise<HelixPaginatedResult<HelixModerator>>;
    /**
     * Creates a paginator for moderators in a given channel.
     *
     * @param channel The channel to get moderators from.
     */
    getModeratorsPaginated(channel: UserIdResolvable): HelixPaginatedRequest<HelixModeratorData, HelixModerator>;
    /**
     * Checks whether a given user is a moderator of a given channel.
     *
     * @param channel The channel to check.
     * @param user The user to check.
     */
    checkUserMod(channel: UserIdResolvable, user: UserIdResolvable): Promise<boolean>;
    /**
     * Adds a moderator to the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that owns the chat room. This ID must match the user ID in the access token.
     * @param user The user to add as a moderator in the broadcaster’s chat room.
     */
    addModerator(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<void>;
    /**
     * Removes a moderator from the broadcaster’s chat room.
     *
     * @param broadcaster The broadcaster that owns the chat room. This ID must match the user ID in the access token.
     * @param user The user to remove as a moderator from the broadcaster’s chat room.
     */
    removeModerator(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<void>;
    /**
     * Determines whether a string message meets the channel's AutoMod requirements.
     *
     * @param channel The channel in which the messages to check are posted.
     * @param data An array of message data objects.
     */
    checkAutoModStatus(channel: UserIdResolvable, data: HelixCheckAutoModStatusData[]): Promise<HelixAutoModStatus[]>;
    /**
     * Processes a message held by AutoMod.
     *
     * @param user The user who is processing the message.
     * @param msgId The ID of the message.
     * @param allow Whether to allow the message - `true` allows, and `false` denies.
     */
    processHeldAutoModMessage(user: UserIdResolvable, msgId: string, allow: boolean): Promise<void>;
    /**
     * Gets the AutoMod settings for a broadcaster.
     *
     * This uses the token of the broadcaster by default.
     * If you want to execute this in the context of another user (who has to be moderator of the channel)
     * you can do so using [user context overrides](/docs/auth/concepts/context-switching).
     *
     * @param broadcaster The broadcaster to get the AutoMod settings for.
     */
    getAutoModSettings(broadcaster: UserIdResolvable): Promise<HelixAutoModSettings[]>;
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
    updateAutoModSettings(broadcaster: UserIdResolvable, data: HelixAutoModSettingsUpdate): Promise<HelixAutoModSettings[]>;
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
    banUser(broadcaster: UserIdResolvable, data: HelixBanUserRequest): Promise<HelixBanUser[]>;
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
    unbanUser(broadcaster: UserIdResolvable, user: UserIdResolvable): Promise<void>;
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
    getBlockedTerms(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixBlockedTerm>>;
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
    addBlockedTerm(broadcaster: UserIdResolvable, text: string): Promise<HelixBlockedTerm[]>;
    /**
     * Removes a blocked term from the broadcaster's channel.
     *
     * @param broadcaster The broadcaster in whose channel the term will be unblocked.
     * @param moderator A user that has permission to unblock terms in the broadcaster's channel.
     * The token of this user will be used to remove the blocked term.
     * @param id The ID of the term that should be unblocked.
     */
    removeBlockedTerm(broadcaster: UserIdResolvable, moderator: UserIdResolvable, id: string): Promise<void>;
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
    deleteChatMessages(broadcaster: UserIdResolvable, messageId?: string): Promise<void>;
    /**
     * Gets the broadcaster's Shield Mode activation status.
     *
     * @param broadcaster The broadcaster whose Shield Mode activation status you want to get.
     */
    getShieldModeStatus(broadcaster: UserIdResolvable): Promise<HelixShieldModeStatus>;
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
    updateShieldModeStatus(broadcaster: UserIdResolvable, activate: boolean): Promise<HelixShieldModeStatus>;
    private _createModeratorActionQuery;
}
//# sourceMappingURL=HelixModerationApi.d.ts.map