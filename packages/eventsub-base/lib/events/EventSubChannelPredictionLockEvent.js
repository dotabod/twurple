"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionLockEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const EventSubChannelPredictionOutcome_1 = require("./common/EventSubChannelPredictionOutcome");
/**
 * An EventSub event representing a prediction being locked in a channel.
 */
let EventSubChannelPredictionLockEvent = class EventSubChannelPredictionLockEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the prediction.
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
     * The title of the prediction.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The possible of the prediction.
     */
    get outcomes() {
        return this[common_1.rawDataSymbol].outcomes.map(data => new EventSubChannelPredictionOutcome_1.EventSubChannelPredictionOutcome(data, this._client));
    }
    /**
     * The time when the prediction started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The time when the prediction was locked.
     */
    get lockDate() {
        return new Date(this[common_1.rawDataSymbol].locked_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelPredictionLockEvent.prototype, "_client", void 0);
EventSubChannelPredictionLockEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPredictionLockEvent', 'broadcasterId')
], EventSubChannelPredictionLockEvent);
exports.EventSubChannelPredictionLockEvent = EventSubChannelPredictionLockEvent;
