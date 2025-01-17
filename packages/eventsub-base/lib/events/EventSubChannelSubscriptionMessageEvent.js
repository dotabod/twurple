"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelSubscriptionMessageEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing the public announcement of a channel subscription by the subscriber.
 */
let EventSubChannelSubscriptionMessageEvent = class EventSubChannelSubscriptionMessageEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user whose subscription is being announced.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user whose subscription is being announced.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user whose subscription is being announced.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user whose subscription is being announced.
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
     * The total number of months the user has been subscribed.
     */
    get cumulativeMonths() {
        return this[common_1.rawDataSymbol].cumulative_months;
    }
    /**
     * The number of months the user has been subscribed in a row, or null if they don't want to share it.
     */
    get streakMonths() {
        return this[common_1.rawDataSymbol].streak_months;
    }
    /**
     * The number of months the user has now subscribed.
     */
    get durationMonths() {
        return this[common_1.rawDataSymbol].duration_months;
    }
    /**
     * The text of the message.
     */
    get messageText() {
        return this[common_1.rawDataSymbol].message.text;
    }
    /**
     * The offsets of emote usages in the message.
     */
    get emoteOffsets() {
        var _a;
        return new Map(Object.entries((0, shared_utils_1.groupBy)((_a = this[common_1.rawDataSymbol].message.emotes) !== null && _a !== void 0 ? _a : [], 'id')).map(([id, ranges]) => [
            id,
            ranges.map(({ begin, end }) => `${begin}-${end}`),
        ]));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelSubscriptionMessageEvent.prototype, "_client", void 0);
EventSubChannelSubscriptionMessageEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelSubscriptionMessageEvent', 'userId')
], EventSubChannelSubscriptionMessageEvent);
exports.EventSubChannelSubscriptionMessageEvent = EventSubChannelSubscriptionMessageEvent;
