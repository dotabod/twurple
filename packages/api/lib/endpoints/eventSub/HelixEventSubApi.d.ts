import { type UserIdResolvable } from '@twurple/common';
import { type HelixEventSubSubscriptionStatus } from '../../interfaces/endpoints/eventSub.external';
import { type HelixEventSubDropEntitlementGrantFilter, type HelixEventSubTransportOptions, type HelixPaginatedEventSubSubscriptionsResult } from '../../interfaces/endpoints/eventSub.input';
import { type HelixPagination } from '../../utils/pagination/HelixPagination';
import { BaseApi } from '../BaseApi';
import { HelixEventSubSubscription } from './HelixEventSubSubscription';
import { HelixPaginatedEventSubSubscriptionsRequest } from './HelixPaginatedEventSubSubscriptionsRequest';
/**
 * The API methods that deal with EventSub.
 *
 * Can be accessed using `client.eventSub` on an {@link ApiClient} instance.
 *
 * ## Before using these methods...
 *
 * All methods in this class assume that you are already running a working EventSub listener reachable using the given transport.
 *
 * If you don't already have one, we recommend use of the `@twurple/eventsub-http` or `@twurple/eventsub-ws` libraries,
 * which handle subscribing and unsubscribing to these topics automatically.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * await api.eventSub.subscribeToUserFollowsTo('125328655', { callbackUrl: 'https://example.com' });
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle EventSub
 */
export declare class HelixEventSubApi extends BaseApi {
    /**
     * Gets the current EventSub subscriptions for the current client.
     *
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptions(pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions for the current client.
     */
    getSubscriptionsPaginated(): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Gets the current EventSub subscriptions with the given status for the current client.
     *
     * @param status The status of the subscriptions to get.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptionsForStatus(status: HelixEventSubSubscriptionStatus, pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions with the given status for the current client.
     *
     * @param status The status of the subscriptions to get.
     */
    getSubscriptionsForStatusPaginated(status: HelixEventSubSubscriptionStatus): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Gets the current EventSub subscriptions with the given type for the current client.
     *
     * @param type The type of the subscriptions to get.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptionsForType(type: string, pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions with the given type for the current client.
     *
     * @param type The type of the subscriptions to get.
     */
    getSubscriptionsForTypePaginated(type: string): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Gets the current EventSub subscriptions for the current user and client.
     *
     * @param user The user to get subscriptions for.
     * @param pagination
     *
     * @expandParams
     */
    getSubscriptionsForUser(user: UserIdResolvable, pagination?: HelixPagination): Promise<HelixPaginatedEventSubSubscriptionsResult>;
    /**
     * Creates a paginator for the current EventSub subscriptions with the given type for the current client.
     *
     * @param user The user to get subscriptions for.
     */
    getSubscriptionsForUserPaginated(user: UserIdResolvable): HelixPaginatedEventSubSubscriptionsRequest;
    /**
     * Sends an arbitrary request to subscribe to an event.
     *
     * You can only create WebHook transport subscriptions using app tokens
     * and WebSocket transport subscriptions using user tokens.
     *
     * @param type The type of the event.
     * @param version The version of the event.
     * @param condition The condition of the subscription.
     * @param transport The transport of the subscription.
     * @param user The user to create the subscription in context of.
     * @param requiredScopeSet The scope set required by the subscription. Will only be checked for applicable transports.
     * @param canOverrideScopedUserContext Whether the auth user context can be overridden.
     * @param isBatched Whether to enable batching for the subscription. Is only supported for select topics.
     */
    createSubscription(type: string, version: string, condition: Record<string, unknown>, transport: HelixEventSubTransportOptions, user?: UserIdResolvable, requiredScopeSet?: string[], canOverrideScopedUserContext?: boolean, isBatched?: boolean): Promise<HelixEventSubSubscription>;
    /**
     * Deletes a subscription.
     *
     * @param id The ID of the subscription.
     */
    deleteSubscription(id: string): Promise<void>;
    /**
     * Deletes *all* subscriptions.
     */
    deleteAllSubscriptions(): Promise<void>;
    /**
     * Deletes all broken subscriptions, i.e. all that are not enabled or pending verification.
     */
    deleteBrokenSubscriptions(): Promise<void>;
    /**
     * Subscribe to events that represent a stream going live.
     *
     * @param broadcaster The broadcaster you want to listen to online events for.
     * @param transport The transport options.
     */
    subscribeToStreamOnlineEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a stream going offline.
     *
     * @param broadcaster The broadcaster you want to listen to online events for.
     * @param transport The transport options.
     */
    subscribeToStreamOfflineEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a channel updating their metadata.
     *
     * @param broadcaster The broadcaster you want to listen to update events for.
     * @param transport The transport options.
     */
    subscribeToChannelUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user following a channel.
     *
     * @param broadcaster The broadcaster you want to listen to follow events for.
     * @param transport The transport options.
     */
    subscribeToChannelFollowEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user subscribing to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to subscribe events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user gifting another user a subscription to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to subscription gift events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionGiftEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user's subscription to a channel being announced.
     *
     * @param broadcaster The broadcaster you want to listen to subscription message events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionMessageEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user's subscription to a channel ending.
     *
     * @param broadcaster The broadcaster you want to listen to subscription end events for.
     * @param transport The transport options.
     */
    subscribeToChannelSubscriptionEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user cheering bits to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to cheer events for.
     * @param transport The transport options.
     */
    subscribeToChannelCheerEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a charity campaign starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityCampaignStartEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a charity campaign ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityCampaignStopEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user donating to a charity campaign in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityDonationEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a charity campaign progressing in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to charity donation events for.
     * @param transport The transport options.
     */
    subscribeToChannelCharityCampaignProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user being banned in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to ban events for.
     * @param transport The transport options.
     */
    subscribeToChannelBanEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user being unbanned in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to unban events for.
     * @param transport The transport options.
     */
    subscribeToChannelUnbanEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent Shield Mode being activated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Shield Mode activation events for.
     * @param transport The transport options.
     */
    subscribeToChannelShieldModeBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent Shield Mode being deactivated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Shield Mode deactivation events for.
     * @param transport The transport options.
     */
    subscribeToChannelShieldModeEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a moderator being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen for moderator add events for.
     * @param transport The transport options.
     */
    subscribeToChannelModeratorAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a moderator being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen for moderator remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelModeratorRemoveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster raiding another broadcaster.
     *
     * @param broadcaster The broadcaster you want to listen to outgoing raid events for.
     * @param transport The transport options.
     */
    subscribeToChannelRaidEventsFrom(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster being raided by another broadcaster.
     *
     * @param broadcaster The broadcaster you want to listen to incoming raid events for.
     * @param transport The transport options.
     */
    subscribeToChannelRaidEventsTo(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being added to a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward add events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being updated in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward update events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward being updated.
     *
     * @param broadcaster The broadcaster you want to listen to reward update events for.
     * @param rewardId The ID of the reward you want to listen to update events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardUpdateEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardRemoveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward being removed from a channel.
     *
     * @param broadcaster The broadcaster you want to listen to reward remove events for.
     * @param rewardId The ID of the reward you want to listen to remove events for.
     * @param transport The transport options.
     */
    subscribeToChannelRewardRemoveEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to redemption events for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionAddEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward being redeemed.
     *
     * @param broadcaster The broadcaster you want to listen to redemption events for.
     * @param rewardId The ID of the reward you want to listen to redemption events for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionAddEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a Channel Points redemption being updated.
     *
     * @param broadcaster The broadcaster you want to listen to redemption update events for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionUpdateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a specific Channel Points reward's redemption being updated.
     *
     * @param broadcaster The broadcaster you want to listen to redemption update events for.
     * @param rewardId The ID of the reward you want to listen to redemption updates for.
     * @param transport The transport options.
     */
    subscribeToChannelRedemptionUpdateEventsForReward(broadcaster: UserIdResolvable, rewardId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a poll starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelPollBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a poll being voted on in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll progress events for.
     * @param transport The transport options.
     */
    subscribeToChannelPollProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a poll ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to poll end events for.
     * @param transport The transport options.
     */
    subscribeToChannelPollEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction starting in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction being voted on in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction preogress events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction being locked in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction lock events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionLockEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a prediction ending in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to prediction end events for.
     * @param transport The transport options.
     */
    subscribeToChannelPredictionEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the beginning of a creator goal event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to goal begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelGoalBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent progress towards a creator goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to goal progress events.
     * @param transport The transport options.
     */
    subscribeToChannelGoalProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the end of a creator goal event.
     *
     * @param broadcaster The broadcaster for which you want to listen to goal end events.
     * @param transport The transport options.
     */
    subscribeToChannelGoalEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the beginning of a Hype Train event in a channel.
     *
     * @param broadcaster The broadcaster you want to listen to Hype train begin events for.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent progress towards the Hype Train goal.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train progress events.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainProgressEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent the end of a Hype Train event.
     *
     * @param broadcaster The broadcaster for which you want to listen to Hype Train end events.
     * @param transport The transport options.
     */
    subscribeToChannelHypeTrainEndEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster shouting out another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to outgoing shoutout events.
     * @param transport The transport options.
     */
    subscribeToChannelShoutoutCreateEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a broadcaster being shouting out by another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to incoming shoutout events.
     * @param transport The transport options.
     */
    subscribeToChannelShoutoutReceiveEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent an ad break beginning in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to ad break begin events.
     * @param transport The transport options.
     */
    subscribeToChannelAdBreakBeginEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a channel's chat being cleared.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat clear events.
     * @param transport The transport options.
     */
    subscribeToChannelChatClearEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user's chat messages being cleared in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to user chat message clear events.
     * @param transport The transport options.
     */
    subscribeToChannelChatClearUserMessagesEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a chat message being deleted in a channel.
     *
     * @param broadcaster The broadcaster for which you want to listen to chat message delete events.
     * @param transport The transport options.
     */
    subscribeToChannelChatMessageDeleteEvents(broadcaster: UserIdResolvable, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent an extension Bits transaction.
     *
     * @param clientId The Client ID for the extension you want to listen to Bits transactions for.
     * @param transport The transport options.
     */
    subscribeToExtensionBitsTransactionCreateEvents(clientId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user granting authorization to an application.
     *
     * @param clientId The Client ID for the application you want to listen to authorization grant events for.
     * @param transport The transport options.
     */
    subscribeToUserAuthorizationGrantEvents(clientId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user revoking their authorization from an application.
     *
     * @param clientId The Client ID for the application you want to listen to authorization revoke events for.
     * @param transport The transport options.
     */
    subscribeToUserAuthorizationRevokeEvents(clientId: string, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a user updating their account details.
     *
     * @param user The user you want to listen to user update events for.
     * @param transport The transport options.
     * @param withEmail Whether to request adding the email address of the user to the notification.
     *
     * Only has an effect with the websocket transport.
     * With the webhook transport, this depends solely on the previous authorization given by the user.
     */
    subscribeToUserUpdateEvents(user: UserIdResolvable, transport: HelixEventSubTransportOptions, withEmail?: boolean): Promise<HelixEventSubSubscription>;
    /**
     * Subscribe to events that represent a drop entitlement being granted.
     *
     * @expandParams
     *
     * @param filter
     * @param transport The transport options.
     */
    subscribeToDropEntitlementGrantEvents(filter: HelixEventSubDropEntitlementGrantFilter, transport: HelixEventSubTransportOptions): Promise<HelixEventSubSubscription>;
    private _deleteSubscriptionsWithCondition;
}
//# sourceMappingURL=HelixEventSubApi.d.ts.map