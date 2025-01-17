import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a channel subscription.
 */
let EventSubChannelSubscriptionGiftEvent = class EventSubChannelSubscriptionGiftEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the gifting user.
     */
    get gifterId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the gifting user.
     */
    get gifterName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the gifting user.
     */
    get gifterDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the gifting user.
     */
    async getGifter() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The amount of gifts that were gifted.
     */
    get amount() {
        return this[rawDataSymbol].total;
    }
    /**
     * The amount of gifts that the gifter has sent in total, or `null` the gift is anonymous.
     */
    get cumulativeAmount() {
        return this[rawDataSymbol].cumulative_total;
    }
    /**
     * The tier of the subscription, either 1000, 2000 or 3000.
     */
    get tier() {
        return this[rawDataSymbol].tier;
    }
    /**
     * Whether the gift is anonymous.
     */
    get isAnonymous() {
        return this[rawDataSymbol].is_anonymous;
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelSubscriptionGiftEvent.prototype, "_client", void 0);
EventSubChannelSubscriptionGiftEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelSubscriptionGiftEvent', 'gifterId')
], EventSubChannelSubscriptionGiftEvent);
export { EventSubChannelSubscriptionGiftEvent };
