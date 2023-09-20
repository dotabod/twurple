"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubSubscriptionMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a user subscribing to a channel.
 */
let PubSubSubscriptionMessage = class PubSubSubscriptionMessage extends common_1.DataObject {
    /**
     * The ID of the user subscribing to the channel.
     */
    get userId() {
        const data = this[common_1.rawDataSymbol];
        return data.context === 'subgift' ||
            data.context === 'anonsubgift' ||
            data.context === 'resubgift' ||
            data.context === 'anonresubgift'
            ? data.recipient_id
            : data.user_id;
    }
    /**
     * The name of the user subscribing to the channel.
     */
    get userName() {
        const data = this[common_1.rawDataSymbol];
        return data.context === 'subgift' ||
            data.context === 'anonsubgift' ||
            data.context === 'resubgift' ||
            data.context === 'anonresubgift'
            ? data.recipient_user_name
            : data.user_name;
    }
    /**
     * The display name of the user subscribing to the channel.
     */
    get userDisplayName() {
        const data = this[common_1.rawDataSymbol];
        return data.context === 'subgift' ||
            data.context === 'anonsubgift' ||
            data.context === 'resubgift' ||
            data.context === 'anonresubgift'
            ? data.recipient_display_name
            : data.display_name;
    }
    /**
     * The streak amount of months the user has been subscribed for.
     *
     * Returns 0 if a gift sub or the streaks months.
     */
    get streakMonths() {
        const data = this[common_1.rawDataSymbol];
        return data.context === 'subgift' ||
            data.context === 'anonsubgift' ||
            data.context === 'resubgift' ||
            data.context === 'anonresubgift'
            ? 0
            : data.streak_months;
    }
    /**
     * The cumulative amount of months the user has been subscribed for.
     *
     * Returns the months if a gift sub or the cumulative months.
     */
    get cumulativeMonths() {
        const data = this[common_1.rawDataSymbol];
        return data.context === 'subgift' ||
            data.context === 'anonsubgift' ||
            data.context === 'resubgift' ||
            data.context === 'anonresubgift'
            ? data.months
            : data.cumulative_months;
    }
    /**
     * The cumulative amount of months the user has been subscribed for.
     *
     * Returns the months if a gift sub or the cumulative months.
     */
    get months() {
        return this.cumulativeMonths;
    }
    /**
     * The time the user subscribed.
     */
    get time() {
        return new Date(this[common_1.rawDataSymbol].time);
    }
    /**
     * The message sent with the subscription.
     *
     * Returns null if the subscription is a gift subscription.
     */
    get message() {
        return this[common_1.rawDataSymbol].context === 'subgift' || this[common_1.rawDataSymbol].context === 'anonsubgift'
            ? null
            : this[common_1.rawDataSymbol].sub_message;
    }
    /**
     * The plan of the subscription.
     */
    get subPlan() {
        return this[common_1.rawDataSymbol].sub_plan;
    }
    /**
     * Whether the subscription is a resub.
     */
    get isResub() {
        return this[common_1.rawDataSymbol].context === 'resub';
    }
    /**
     * Whether the subscription is a gift.
     */
    get isGift() {
        return (this[common_1.rawDataSymbol].context === 'subgift' ||
            this[common_1.rawDataSymbol].context === 'resubgift' ||
            this[common_1.rawDataSymbol].context === 'anonsubgift' ||
            this[common_1.rawDataSymbol].context === 'anonresubgift');
    }
    /**
     * Whether the subscription is from an anonymous gifter.
     */
    get isAnonymous() {
        return this[common_1.rawDataSymbol].context === 'anonsubgift' || this[common_1.rawDataSymbol].context === 'anonresubgift';
    }
    /**
     * The ID of the user gifting the subscription.
     *
     * Returns null if the subscription is not a gift.
     */
    get gifterId() {
        return this.isGift ? this[common_1.rawDataSymbol].user_id : null;
    }
    /**
     * The name of the user gifting the subscription.
     *
     * Returns null if the subscription is not a gift.
     */
    get gifterName() {
        return this.isGift ? this[common_1.rawDataSymbol].user_name : null;
    }
    /**
     * The display name of the user gifting the subscription.
     *
     * Returns null if the subscription is not a gift.
     */
    get gifterDisplayName() {
        return this.isGift ? this[common_1.rawDataSymbol].display_name : null;
    }
    /**
     * The duration of subscription, in months.
     *
     * This refers to first-time subscriptions, auto-renewal subscriptions, re-subscriptions, or gifted subscriptions.
     */
    get duration() {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this[common_1.rawDataSymbol].multi_month_duration || 1;
    }
};
PubSubSubscriptionMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubSubscriptionMessage', 'userId')
], PubSubSubscriptionMessage);
exports.PubSubSubscriptionMessage = PubSubSubscriptionMessage;
