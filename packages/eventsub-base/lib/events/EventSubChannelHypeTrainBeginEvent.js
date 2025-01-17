"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelHypeTrainBeginEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const EventSubChannelHypeTrainContribution_1 = require("./common/EventSubChannelHypeTrainContribution");
/**
 * An EventSub event representing a Hype Train starting in a channel.
 */
let EventSubChannelHypeTrainBeginEvent = class EventSubChannelHypeTrainBeginEvent extends common_1.DataObject {
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
     * The level the Hype Train started on.
     */
    get level() {
        return this[common_1.rawDataSymbol].level;
    }
    /**
     * The total points already contributed to the Hype Train.
     */
    get total() {
        return this[common_1.rawDataSymbol].total;
    }
    /**
     * The number of points contributed to the Hype Train at the current level.
     */
    get progress() {
        return this[common_1.rawDataSymbol].progress;
    }
    /**
     * The number of points required to reach the next level.
     */
    get goal() {
        return this[common_1.rawDataSymbol].goal;
    }
    /**
     * The contributors with the most points, for both bits and subscriptions.
     */
    get topContributors() {
        var _a, _b;
        return ((_b = (_a = this[common_1.rawDataSymbol].top_contributions) === null || _a === void 0 ? void 0 : _a.map(data => new EventSubChannelHypeTrainContribution_1.EventSubChannelHypeTrainContribution(data, this._client))) !== null && _b !== void 0 ? _b : []);
    }
    /**
     * The most recent contribution.
     */
    get lastContribution() {
        return new EventSubChannelHypeTrainContribution_1.EventSubChannelHypeTrainContribution(this[common_1.rawDataSymbol].last_contribution, this._client);
    }
    /**
     * The time when the Hype Train started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The time when the Hype Train is expected to expire, unless a change of level occurs to extend the expiration.
     */
    get expiryDate() {
        return new Date(this[common_1.rawDataSymbol].expires_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelHypeTrainBeginEvent.prototype, "_client", void 0);
EventSubChannelHypeTrainBeginEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelHypeTrainBeginEvent', 'broadcasterId')
], EventSubChannelHypeTrainBeginEvent);
exports.EventSubChannelHypeTrainBeginEvent = EventSubChannelHypeTrainBeginEvent;
