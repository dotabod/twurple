import { __decorate } from "tslib";
import { createLogger } from '@d-fischer/logger';
import { Enumerable } from '@d-fischer/shared-utils';
import { EventEmitter } from '@d-fischer/typed-event-emitter';
import { extractUserId, } from '@twurple/api';
import { rtfm } from '@twurple/common';
import { EventSubChannelAdBreakBeginSubscription } from "./subscriptions/EventSubChannelAdBreakBeginSubscription.mjs";
import { EventSubChannelBanSubscription } from "./subscriptions/EventSubChannelBanSubscription.mjs";
import { EventSubChannelCharityCampaignProgressSubscription } from "./subscriptions/EventSubChannelCharityCampaignProgressSubscription.mjs";
import { EventSubChannelCharityCampaignStartSubscription } from "./subscriptions/EventSubChannelCharityCampaignStartSubscription.mjs";
import { EventSubChannelCharityCampaignStopSubscription } from "./subscriptions/EventSubChannelCharityCampaignStopSubscription.mjs";
import { EventSubChannelCharityDonationSubscription } from "./subscriptions/EventSubChannelCharityDonationSubscription.mjs";
import { EventSubChannelChatClearSubscription } from "./subscriptions/EventSubChannelChatClearSubscription.mjs";
import { EventSubChannelChatClearUserMessagesSubscription } from "./subscriptions/EventSubChannelChatClearUserMessagesSubscription.mjs";
import { EventSubChannelChatMessageDeleteSubscription } from "./subscriptions/EventSubChannelChatMessageDeleteSubscription.mjs";
import { EventSubChannelCheerSubscription } from "./subscriptions/EventSubChannelCheerSubscription.mjs";
import { EventSubChannelFollowSubscription } from "./subscriptions/EventSubChannelFollowSubscription.mjs";
import { EventSubChannelGoalBeginSubscription } from "./subscriptions/EventSubChannelGoalBeginSubscription.mjs";
import { EventSubChannelGoalEndSubscription } from "./subscriptions/EventSubChannelGoalEndSubscription.mjs";
import { EventSubChannelGoalProgressSubscription } from "./subscriptions/EventSubChannelGoalProgressSubscription.mjs";
import { EventSubChannelHypeTrainBeginSubscription } from "./subscriptions/EventSubChannelHypeTrainBeginSubscription.mjs";
import { EventSubChannelHypeTrainEndSubscription } from "./subscriptions/EventSubChannelHypeTrainEndSubscription.mjs";
import { EventSubChannelHypeTrainProgressSubscription } from "./subscriptions/EventSubChannelHypeTrainProgressSubscription.mjs";
import { EventSubChannelModeratorAddSubscription } from "./subscriptions/EventSubChannelModeratorAddSubscription.mjs";
import { EventSubChannelModeratorRemoveSubscription } from "./subscriptions/EventSubChannelModeratorRemoveSubscription.mjs";
import { EventSubChannelPollBeginSubscription } from "./subscriptions/EventSubChannelPollBeginSubscription.mjs";
import { EventSubChannelPollEndSubscription } from "./subscriptions/EventSubChannelPollEndSubscription.mjs";
import { EventSubChannelPollProgressSubscription } from "./subscriptions/EventSubChannelPollProgressSubscription.mjs";
import { EventSubChannelPredictionBeginSubscription } from "./subscriptions/EventSubChannelPredictionBeginSubscription.mjs";
import { EventSubChannelPredictionEndSubscription } from "./subscriptions/EventSubChannelPredictionEndSubscription.mjs";
import { EventSubChannelPredictionLockSubscription } from "./subscriptions/EventSubChannelPredictionLockSubscription.mjs";
import { EventSubChannelPredictionProgressSubscription } from "./subscriptions/EventSubChannelPredictionProgressSubscription.mjs";
import { EventSubChannelRaidSubscription } from "./subscriptions/EventSubChannelRaidSubscription.mjs";
import { EventSubChannelRedemptionAddSubscription } from "./subscriptions/EventSubChannelRedemptionAddSubscription.mjs";
import { EventSubChannelRedemptionUpdateSubscription } from "./subscriptions/EventSubChannelRedemptionUpdateSubscription.mjs";
import { EventSubChannelRewardAddSubscription } from "./subscriptions/EventSubChannelRewardAddSubscription.mjs";
import { EventSubChannelRewardRemoveSubscription } from "./subscriptions/EventSubChannelRewardRemoveSubscription.mjs";
import { EventSubChannelRewardUpdateSubscription } from "./subscriptions/EventSubChannelRewardUpdateSubscription.mjs";
import { EventSubChannelShieldModeBeginSubscription } from "./subscriptions/EventSubChannelShieldModeBeginSubscription.mjs";
import { EventSubChannelShieldModeEndSubscription } from "./subscriptions/EventSubChannelShieldModeEndSubscription.mjs";
import { EventSubChannelShoutoutCreateSubscription } from "./subscriptions/EventSubChannelShoutoutCreateSubscription.mjs";
import { EventSubChannelShoutoutReceiveSubscription } from "./subscriptions/EventSubChannelShoutoutReceiveSubscription.mjs";
import { EventSubChannelSubscriptionEndSubscription } from "./subscriptions/EventSubChannelSubscriptionEndSubscription.mjs";
import { EventSubChannelSubscriptionGiftSubscription } from "./subscriptions/EventSubChannelSubscriptionGiftSubscription.mjs";
import { EventSubChannelSubscriptionMessageSubscription } from "./subscriptions/EventSubChannelSubscriptionMessageSubscription.mjs";
import { EventSubChannelSubscriptionSubscription } from "./subscriptions/EventSubChannelSubscriptionSubscription.mjs";
import { EventSubChannelUnbanSubscription } from "./subscriptions/EventSubChannelUnbanSubscription.mjs";
import { EventSubChannelUpdateSubscription } from "./subscriptions/EventSubChannelUpdateSubscription.mjs";
import { EventSubDropEntitlementGrantSubscription } from "./subscriptions/EventSubDropEntitlementGrantSubscription.mjs";
import { EventSubExtensionBitsTransactionCreateSubscription } from "./subscriptions/EventSubExtensionBitsTransactionCreateSubscription.mjs";
import { EventSubStreamOfflineSubscription } from "./subscriptions/EventSubStreamOfflineSubscription.mjs";
import { EventSubStreamOnlineSubscription } from "./subscriptions/EventSubStreamOnlineSubscription.mjs";
import { EventSubUserAuthorizationGrantSubscription } from "./subscriptions/EventSubUserAuthorizationGrantSubscription.mjs";
import { EventSubUserAuthorizationRevokeSubscription } from "./subscriptions/EventSubUserAuthorizationRevokeSubscription.mjs";
import { EventSubUserUpdateSubscription } from "./subscriptions/EventSubUserUpdateSubscription.mjs";
const numberRegex = /^\d+$/;
/**
 * @private
 * @hideProtected
 */
let EventSubBase = class EventSubBase extends EventEmitter {
    constructor(config) {
        super();
        this._subscriptions = new Map();
        this._subscriptionsByTwitchId = new Map();
        this._twitchSubscriptions = new Map();
        /** @private */ this._legacySecrets = false;
        /**
         * Fires when a subscription is revoked.
         *
         * @eventListener
         *
         * @param subscription The subscription that was revoked.
         */
        this.onRevoke = this.registerEvent();
        /**
         * Fires when the client successfully created a subscription.
         *
         * @eventListener
         *
         * @param subscription The subscription that was successfully created.
         * @param apiSubscription The subscription data from the API.
         */
        this.onSubscriptionCreateSuccess = this.registerEvent();
        /**
         * Fires when the client fails to create a subscription.
         *
         * @eventListener
         *
         * @param subscription The subscription that was not successfully created.
         * @param error The error that was thrown.
         */
        this.onSubscriptionCreateFailure = this.registerEvent();
        /**
         * Fires when the client successfully deleted a subscription.
         *
         * @eventListener
         *
         * @param subscription The subscription that was successfully deleted.
         */
        this.onSubscriptionDeleteSuccess = this.registerEvent();
        /**
         * Fires when the client fails to delete a subscription.
         *
         * @eventListener
         *
         * @param subscription The subscription that was not successfully deleted.
         * @param error The error that was thrown.
         */
        this.onSubscriptionDeleteFailure = this.registerEvent();
        this._apiClient = config.apiClient;
        this._logger = createLogger({
            name: 'twurple:eventsub',
            ...config.logger,
        });
    }
    /** @private */
    _dropSubscription(id) {
        this._subscriptions.delete(id);
    }
    /** @private */
    _dropTwitchSubscription(id) {
        if (this._twitchSubscriptions.has(id)) {
            const data = this._twitchSubscriptions.get(id);
            this._twitchSubscriptions.delete(id);
            this._subscriptionsByTwitchId.delete(data.id);
        }
    }
    /** @private */
    _registerTwitchSubscription(subscription, data) {
        this._twitchSubscriptions.set(subscription.id, data);
        this._subscriptionsByTwitchId.set(data.id, subscription);
        this.emit(this.onSubscriptionCreateSuccess, subscription, data);
    }
    /** @private */
    _notifySubscriptionCreateError(subscription, error) {
        this.emit(this.onSubscriptionCreateFailure, subscription, error);
    }
    /** @private */
    _notifySubscriptionDeleteSuccess(subscription) {
        this.emit(this.onSubscriptionDeleteSuccess, subscription);
    }
    /** @private */
    _notifySubscriptionDeleteError(subscription, error) {
        this.emit(this.onSubscriptionDeleteFailure, subscription, error);
    }
    /**
     * Subscribes to events representing a stream going live.
     *
     * @param user The user for which to get notifications about their streams going live.
     * @param handler The function that will be called for any new notifications.
     */
    onStreamOnline(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToStreamOnlineEvents');
        return this._genericSubscribe(EventSubStreamOnlineSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events representing a stream going offline.
     *
     * @param user The user for which to get notifications about their streams going offline.
     * @param handler The function that will be called for any new notifications.
     */
    onStreamOffline(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToStreamOfflineEvents');
        return this._genericSubscribe(EventSubStreamOfflineSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events representing a change in channel metadata, e.g. stream title or category.
     *
     * @param user The user for which to get notifications about updates.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelUpdate(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelUpdateEvents');
        return this._genericSubscribe(EventSubChannelUpdateSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user following a channel.
     *
     * @param user The user for which to get notifications about their followers.
     * @param moderator A user that has permission to read followers in the broadcaster's channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelFollow(user, moderator, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelFollowEvents');
        const moderatorId = this._extractUserIdWithNumericWarning(moderator, 'subscribeToChannelFollowEvents');
        return this._genericSubscribe(EventSubChannelFollowSubscription, handler, this, userId, moderatorId);
    }
    /**
     * Subscribes to events that represent a user subscribing to a channel.
     *
     * @param user The user for which to get notifications for about their subscribers.
     * @param handler  The function that will be called for any new notifications.
     */
    onChannelSubscription(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelSubscriptionEvents');
        return this._genericSubscribe(EventSubChannelSubscriptionSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user gifting a subscription to a channel to someone else.
     *
     * @param user The user for which to get notifications for about subscriptions people gift in their channel.
     * @param handler  The function that will be called for any new notifications.
     */
    onChannelSubscriptionGift(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelSubscriptionGiftEvents');
        return this._genericSubscribe(EventSubChannelSubscriptionGiftSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user's subscription to a channel being announced.
     *
     * @param user The user for which to get notifications for about announced subscriptions.
     * @param handler  The function that will be called for any new notifications.
     */
    onChannelSubscriptionMessage(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelSubscriptionMessageEvents');
        return this._genericSubscribe(EventSubChannelSubscriptionMessageSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user's subscription to a channel ending.
     *
     * @param user The user for which to get notifications for about ending subscriptions.
     * @param handler  The function that will be called for any new notifications.
     */
    onChannelSubscriptionEnd(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelSubscriptionEndEvents');
        return this._genericSubscribe(EventSubChannelSubscriptionEndSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user cheering some bits.
     *
     * @param user The user for which to get notifications for about cheers they get.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelCheer(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelCheerEvents');
        return this._genericSubscribe(EventSubChannelCheerSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a charity campaign starting in a channel.
     *
     * @param user The user for which to get notifications about charity campaigns starting.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelCharityCampaignStart(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelCharityCampaignStartEvents');
        return this._genericSubscribe(EventSubChannelCharityCampaignStartSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a charity campaign ending in a channel.
     *
     * @param user The user for which to get notifications about charity campaigns ending.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelCharityCampaignStop(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelCharityCampaignStopEvents');
        return this._genericSubscribe(EventSubChannelCharityCampaignStopSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a donation to a charity campaign in a channel.
     *
     * @param user The user for which to get notifications about charity campaign donations.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelCharityDonation(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelCharityDonationEvents');
        return this._genericSubscribe(EventSubChannelCharityDonationSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent progress in a charity campaign in a channel.
     *
     * @param user The user for which to get notifications about charity campaign progress.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelCharityCampaignProgress(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelCharityCampaignProgressEvents');
        return this._genericSubscribe(EventSubChannelCharityCampaignProgressSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user getting banned from a channel.
     *
     * @param user The user for which to get notifications for when users get banned in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelBan(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelBanEvents');
        return this._genericSubscribe(EventSubChannelBanSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user getting unbanned from a channel.
     *
     * @param user The user for which to get notifications for when users get unbanned in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelUnban(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelUnbanEvents');
        return this._genericSubscribe(EventSubChannelUnbanSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent Shield Mode being activated in a channel.
     *
     * @param broadcaster The user for which to get notifications for when Shield Mode is activated in their channel.
     * @param moderator A user that has permission to read Shield Mode status in the broadcaster's channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelShieldModeBegin(broadcaster, moderator, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(broadcaster, 'subscribeToChannelShieldModeStartEvents');
        const moderatorId = this._extractUserIdWithNumericWarning(moderator, 'subscribeToChannelShieldModeStartEvents');
        return this._genericSubscribe(EventSubChannelShieldModeBeginSubscription, handler, this, broadcasterId, moderatorId);
    }
    /**
     * Subscribes to events that represent Shield Mode being deactivated in a channel.
     *
     * @param broadcaster The user for which to get notifications for when Shield Mode is deactivated in their channel.
     * @param moderator A user that has permission to read Shield Mode status in the broadcaster's channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelShieldModeEnd(broadcaster, moderator, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(broadcaster, 'subscribeToChannelShieldModeEndEvents');
        const moderatorId = this._extractUserIdWithNumericWarning(moderator, 'subscribeToChannelShieldModeEndEvents');
        return this._genericSubscribe(EventSubChannelShieldModeEndSubscription, handler, this, broadcasterId, moderatorId);
    }
    /**
     * Subscribes to events that represent a user getting moderator permissions in a channel.
     *
     * @param user The user for which to get notifications for when users get moderator permissions in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelModeratorAdd(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelModeratorAddEvents');
        return this._genericSubscribe(EventSubChannelModeratorAddSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user losing moderator permissions in a channel.
     *
     * @param user The user for which to get notifications for when users lose moderator permissions in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelModeratorRemove(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelModeratorRemoveEvents');
        return this._genericSubscribe(EventSubChannelModeratorRemoveSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a broadcaster raiding another broadcaster.
     *
     * @param user The broadcaster for which to get outgoing raid notifications.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRaidFrom(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelRaidEventsFrom');
        return this._genericSubscribe(EventSubChannelRaidSubscription, handler, this, userId, 'from');
    }
    /**
     * Subscribes to events that represent a broadcaster being raided by another broadcaster.
     *
     * @param user The broadcaster for which to get incoming raid notifications.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRaidTo(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelRaidEventsTo');
        return this._genericSubscribe(EventSubChannelRaidSubscription, handler, this, userId, 'to');
    }
    /**
     * Subscribes to events that represent a Channel Points reward being added to a channel.
     *
     * @param user The user for which to get notifications for when they add a reward to their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRewardAdd(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelRewardAddEvents');
        return this._genericSubscribe(EventSubChannelRewardAddSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a Channel Points reward being updated.
     *
     * @param user The user for which to get notifications for when they update a reward.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRewardUpdate(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToRewardUpdateEvents');
        return this._genericSubscribe(EventSubChannelRewardUpdateSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a specific Channel Points reward being updated.
     *
     * @param user The user for which to get notifications for when they update the reward.
     * @param rewardId The ID of the reward for which to get notifications when it is updated.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRewardUpdateForReward(user, rewardId, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToRewardUpdateEvents');
        return this._genericSubscribe(EventSubChannelRewardUpdateSubscription, handler, this, userId, rewardId);
    }
    /**
     * Subscribes to events that represent a Channel Points reward being removed.
     *
     * @param user The user for which to get notifications for when they remove a reward.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRewardRemove(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToRewardRemoveEvents');
        return this._genericSubscribe(EventSubChannelRewardRemoveSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a specific Channel Points reward being removed.
     *
     * @param user The user for which to get notifications for when they remove the reward.
     * @param rewardId The ID of the reward to get notifications for when it is removed.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRewardRemoveForReward(user, rewardId, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToRewardRemoveEventsForReward');
        return this._genericSubscribe(EventSubChannelRewardRemoveSubscription, handler, this, userId, rewardId);
    }
    /**
     * Subscribes to events that represents a Channel Points reward being redeemed.
     *
     * @param user The user for which to get notifications for when their rewards are redeemed.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRedemptionAdd(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelRedemptionEvents');
        return this._genericSubscribe(EventSubChannelRedemptionAddSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a specific Channel Points reward being redeemed.
     *
     * @param user The user for which to get notifications when their reward is redeemed.
     * @param rewardId The ID of the reward for which to get notifications when it is redeemed.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRedemptionAddForReward(user, rewardId, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToRedemptionAddEventsForReward');
        return this._genericSubscribe(EventSubChannelRedemptionAddSubscription, handler, this, userId, rewardId);
    }
    /**
     * Subscribes to events that represent a Channel Points reward being updated by a broadcaster.
     *
     * @param user The user for which to get notifications for when they update a reward.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRedemptionUpdate(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelRedemptionUpdateEvents');
        return this._genericSubscribe(EventSubChannelRedemptionUpdateSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a specific Channel Points reward being updated by a broadcaster.
     *
     * @param user The user for which to get notifications for when they update the reward.
     * @param rewardId The ID of the reward for which to get notifications when it gets updated.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelRedemptionUpdateForReward(user, rewardId, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelRedemptionUpdateEventsForReward');
        return this._genericSubscribe(EventSubChannelRedemptionUpdateSubscription, handler, this, userId, rewardId);
    }
    /**
     * Subscribes to events that represent a poll starting in a channel.
     *
     * @param user The broadcaster for which to receive poll begin events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPollBegin(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPollBeginEvents');
        return this._genericSubscribe(EventSubChannelPollBeginSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a poll being voted on in a channel.
     *
     * @param user The broadcaster for which to receive poll progress events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPollProgress(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPollProgressEvents');
        return this._genericSubscribe(EventSubChannelPollProgressSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a poll ending in a channel.
     *
     * @param user The broadcaster for which to receive poll end events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPollEnd(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPollEndEvents');
        return this._genericSubscribe(EventSubChannelPollEndSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a prediction starting in a channel.
     *
     * @param user The broadcaster for which to receive prediction begin events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPredictionBegin(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPredictionBeginEvents');
        return this._genericSubscribe(EventSubChannelPredictionBeginSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a prediction being voted on in a channel.
     *
     * @param user The broadcaster for which to receive prediction progress events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPredictionProgress(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPredictionProgressEvents');
        return this._genericSubscribe(EventSubChannelPredictionProgressSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a prediction being locked in a channel.
     *
     * @param user The broadcaster for which to receive prediction lock events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPredictionLock(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPredictionLockEvents');
        return this._genericSubscribe(EventSubChannelPredictionLockSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a prediction ending in a channel.
     *
     * @param user The broadcaster for which to receive prediction end events.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelPredictionEnd(user, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelPredictionEndEvents');
        return this._genericSubscribe(EventSubChannelPredictionEndSubscription, handler, this, broadcasterId);
    }
    /**
     * Subscribes to events that represent a Goal beginning.
     *
     * @param user The user for which to get notifications about Goals in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelGoalBegin(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelGoalBeginEvents');
        return this._genericSubscribe(EventSubChannelGoalBeginSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent progress in a Goal in a channel.
     *
     * @param user The user for which to get notifications about Goals in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelGoalProgress(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelGoalProgressEvents');
        return this._genericSubscribe(EventSubChannelGoalProgressSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent the end of a Goal in a channel.
     *
     * @param user The user for which to get notifications about Goals in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelGoalEnd(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelGoalEndEvents');
        return this._genericSubscribe(EventSubChannelGoalEndSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a Hype Train beginning.
     *
     * @param user The user for which to get notifications about Hype Trains in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelHypeTrainBegin(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelHypeTrainBeginEvents');
        return this._genericSubscribe(EventSubChannelHypeTrainBeginSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent progress in a Hype Train in a channel.
     *
     * @param user The user for which to get notifications about Hype Trains in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelHypeTrainProgress(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelHypeTrainProgressEvents');
        return this._genericSubscribe(EventSubChannelHypeTrainProgressSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent the end of a Hype Train in a channel.
     *
     * @param user The user for which to get notifications about Hype Trains in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelHypeTrainEnd(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelHypeTrainEndEvents');
        return this._genericSubscribe(EventSubChannelHypeTrainEndSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a broadcaster shouting out another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to outgoing shoutout events.
     * @param moderator A user that has permission to see or manage shoutout events in the broadcaster's channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelShoutoutCreate(broadcaster, moderator, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(broadcaster, 'subscribeToChannelShoutoutCreateEvents');
        const moderatorId = this._extractUserIdWithNumericWarning(moderator, 'subscribeToChannelShoutoutCreateEvents');
        return this._genericSubscribe(EventSubChannelShoutoutCreateSubscription, handler, this, broadcasterId, moderatorId);
    }
    /**
     * Subscribes to events that represent a broadcaster being shouted out by another broadcaster.
     *
     * @param broadcaster The broadcaster for which you want to listen to incoming shoutout events.
     * @param moderator A user that has permission to see or manage shoutout events in the broadcaster's channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelShoutoutReceive(broadcaster, moderator, handler) {
        const broadcasterId = this._extractUserIdWithNumericWarning(broadcaster, 'subscribeToChannelShoutoutReceiveEvents');
        const moderatorId = this._extractUserIdWithNumericWarning(moderator, 'subscribeToChannelShoutoutReceiveEvents');
        return this._genericSubscribe(EventSubChannelShoutoutReceiveSubscription, handler, this, broadcasterId, moderatorId);
    }
    /**
     * Subscribes to events that represent an ad break beginning.
     *
     * @param user The user for which to get notifications about ad breaks in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelAdBreakBegin(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelAdBreakBeginEvents');
        return this._genericSubscribe(EventSubChannelAdBreakBeginSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent an channel's chat being cleared.
     *
     * @param user The user for which to get notifications about chat being cleared in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelChatClear(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelChatClearEvents');
        return this._genericSubscribe(EventSubChannelChatClearSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a user's chat messages being cleared in a channel.
     *
     * @param user The user for which to get notifications about a user's chat messages being cleared in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelChatClearUserMessages(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelChatClearUserMessagesEvents');
        return this._genericSubscribe(EventSubChannelChatClearUserMessagesSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a chat message being deleted in a channel.
     *
     * @param user The user for which to get notifications about a chat message being deleted in their channel.
     * @param handler The function that will be called for any new notifications.
     */
    onChannelChatMessageDelete(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToChannelChatMessageDeleteEvents');
        return this._genericSubscribe(EventSubChannelChatMessageDeleteSubscription, handler, this, userId);
    }
    /**
     * Subscribes to events that represent a drop entitlement being granted.
     *
     * @param filter The filter to apply for the events.
     * @param handler The function that will be called for any new notifications.
     */
    onDropEntitlementGrant(filter, handler) {
        return this._genericSubscribe(EventSubDropEntitlementGrantSubscription, handler, this, filter);
    }
    /**
     * Subscribes to events that represent a Bits transaction in an extension.
     *
     * @param handler  The function that will be called for any new notifications.
     */
    onExtensionBitsTransactionCreate(handler) {
        const { clientId } = this._apiClient._authProvider;
        return this._genericSubscribe(EventSubExtensionBitsTransactionCreateSubscription, handler, this, clientId);
    }
    /**
     * Subscribes to events that represent a user granting authorization to an application.
     *
     * @param handler The function that will be called for any new notifications.
     */
    onUserAuthorizationGrant(handler) {
        const { clientId } = this._apiClient._authProvider;
        return this._genericSubscribe(EventSubUserAuthorizationGrantSubscription, handler, this, clientId);
    }
    /**
     * Subscribes to events that represent a user revoking authorization from an application.
     *
     * @param handler The function that will be called for any new notifications.
     */
    onUserAuthorizationRevoke(handler) {
        const { clientId } = this._apiClient._authProvider;
        return this._genericSubscribe(EventSubUserAuthorizationRevokeSubscription, handler, this, clientId);
    }
    /**
     * Subscribes to events that represent a user updating their account details.
     *
     * @param user The user for which to get notifications about account updates.
     * @param handler The function that will be called for any new notifications.
     */
    onUserUpdate(user, handler) {
        const userId = this._extractUserIdWithNumericWarning(user, 'subscribeToUserUpdateEvents');
        return this._genericSubscribe(EventSubUserUpdateSubscription, handler, this, userId);
    }
    /**
     * @param id
     * @protected
     */
    _getCorrectSubscriptionByTwitchId(id) {
        return this._subscriptionsByTwitchId.get(id);
    }
    _genericSubscribe(clazz, handler, client, ...params) {
        const subscription = new clazz(handler, client, ...params);
        if (this._isReadyToSubscribe(subscription)) {
            subscription.start(this._findTwitchSubscriptionToContinue(subscription));
        }
        this._subscriptions.set(subscription.id, subscription);
        return subscription;
    }
    _extractUserIdWithNumericWarning(user, methodName) {
        const userId = extractUserId(user);
        if (!numberRegex.test(userId)) {
            this._logger.warn(`${methodName}: The given user is a non-numeric string. You might be sending a user name instead of a user ID.`);
        }
        return userId;
    }
};
__decorate([
    Enumerable(false)
], EventSubBase.prototype, "_subscriptions", void 0);
__decorate([
    Enumerable(false)
], EventSubBase.prototype, "_subscriptionsByTwitchId", void 0);
__decorate([
    Enumerable(false)
], EventSubBase.prototype, "_twitchSubscriptions", void 0);
__decorate([
    Enumerable(false)
], EventSubBase.prototype, "_apiClient", void 0);
EventSubBase = __decorate([
    rtfm('eventsub-base', 'EventSubBase')
], EventSubBase);
export { EventSubBase };
