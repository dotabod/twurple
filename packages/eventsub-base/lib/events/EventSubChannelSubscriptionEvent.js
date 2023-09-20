"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelSubscriptionEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a channel subscription.
 */
let EventSubChannelSubscriptionEvent = class EventSubChannelSubscriptionEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the subscribing user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the subscribing user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the subscribing user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the subscribing user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The tier of the subscription, either 1000, 2000 or 3000.
     */
    get tier() {
        return this[common_1.rawDataSymbol].tier;
    }
    /**
     * Whether the subscription has been gifted.
     */
    get isGift() {
        return this[common_1.rawDataSymbol].is_gift;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelSubscriptionEvent.prototype, "_client", void 0);
EventSubChannelSubscriptionEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelSubscriptionEvent', 'userId')
], EventSubChannelSubscriptionEvent);
exports.EventSubChannelSubscriptionEvent = EventSubChannelSubscriptionEvent;