import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a channel subscription.
 */
let EventSubChannelSubscriptionEvent = class EventSubChannelSubscriptionEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the subscribing user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the subscribing user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the subscribing user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the subscribing user.
     */
    async getUser() {
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
     * The tier of the subscription, either 1000, 2000 or 3000.
     */
    get tier() {
        return this[rawDataSymbol].tier;
    }
    /**
     * Whether the subscription has been gifted.
     */
    get isGift() {
        return this[rawDataSymbol].is_gift;
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelSubscriptionEvent.prototype, "_client", void 0);
EventSubChannelSubscriptionEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelSubscriptionEvent', 'userId')
], EventSubChannelSubscriptionEvent);
export { EventSubChannelSubscriptionEvent };
