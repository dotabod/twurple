"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelHypeTrainEndEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const EventSubChannelHypeTrainContribution_1 = require("./common/EventSubChannelHypeTrainContribution");
/**
 * An EventSub event representing the end of a Hype train event.
 */
let EventSubChannelHypeTrainEndEvent = class EventSubChannelHypeTrainEndEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the Hype Train.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
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
     * The level the Hype Train ended on.
     */
    get level() {
        return this[common_1.rawDataSymbol].level;
    }
    /**
     * The total points contributed to the Hype Train.
     */
    get total() {
        return this[common_1.rawDataSymbol].total;
    }
    /**
     * The contributors with the most points, for both bits and subscriptions.
     */
    get topContributors() {
        var _a, _b;
        return ((_b = (_a = this[common_1.rawDataSymbol].top_contributions) === null || _a === void 0 ? void 0 : _a.map(data => new EventSubChannelHypeTrainContribution_1.EventSubChannelHypeTrainContribution(data, this._client))) !== null && _b !== void 0 ? _b : []);
    }
    /**
     * The time when the Hype Train started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The time when the Hype Train ended.
     */
    get endDate() {
        return new Date(this[common_1.rawDataSymbol].ended_at);
    }
    /**
     * The time when the Hype Train cooldown ends.
     */
    get cooldownEndDate() {
        return new Date(this[common_1.rawDataSymbol].cooldown_ends_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelHypeTrainEndEvent.prototype, "_client", void 0);
EventSubChannelHypeTrainEndEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelHypeTrainEndEvent', 'broadcasterId')
], EventSubChannelHypeTrainEndEvent);
exports.EventSubChannelHypeTrainEndEvent = EventSubChannelHypeTrainEndEvent;
