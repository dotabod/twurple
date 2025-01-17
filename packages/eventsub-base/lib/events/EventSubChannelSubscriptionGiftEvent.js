"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelSubscriptionGiftEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a channel subscription.
 */
let EventSubChannelSubscriptionGiftEvent = class EventSubChannelSubscriptionGiftEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the gifting user.
     */
    get gifterId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the gifting user.
     */
    get gifterName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the gifting user.
     */
    get gifterDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the gifting user.
     */
    async getGifter() {
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
     * The amount of gifts that were gifted.
     */
    get amount() {
        return this[common_1.rawDataSymbol].total;
    }
    /**
     * The amount of gifts that the gifter has sent in total, or `null` the gift is anonymous.
     */
    get cumulativeAmount() {
        return this[common_1.rawDataSymbol].cumulative_total;
    }
    /**
     * The tier of the subscription, either 1000, 2000 or 3000.
     */
    get tier() {
        return this[common_1.rawDataSymbol].tier;
    }
    /**
     * Whether the gift is anonymous.
     */
    get isAnonymous() {
        return this[common_1.rawDataSymbol].is_anonymous;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelSubscriptionGiftEvent.prototype, "_client", void 0);
EventSubChannelSubscriptionGiftEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelSubscriptionGiftEvent', 'gifterId')
], EventSubChannelSubscriptionGiftEvent);
exports.EventSubChannelSubscriptionGiftEvent = EventSubChannelSubscriptionGiftEvent;
