"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelGoalEndEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a creator goal starting in a channel.
 */
let EventSubChannelGoalEndEvent = class EventSubChannelGoalEndEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the goal.
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
     * The type of the goal. Can be either "follower" or "subscription".
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The description of the goal.
     */
    get description() {
        return this[common_1.rawDataSymbol].description;
    }
    /**
     * Whether the goal has been achieved or not.
     */
    get isAchieved() {
        return this[common_1.rawDataSymbol].is_achieved;
    }
    /**
     * The current value of the goal.
     */
    get currentAmount() {
        return this[common_1.rawDataSymbol].current_amount;
    }
    /**
     * The target value of the goal.
     */
    get targetAmount() {
        return this[common_1.rawDataSymbol].target_amount;
    }
    /**
     * The time when the goal started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The time when the goal ended.
     */
    get endDate() {
        return new Date(this[common_1.rawDataSymbol].ended_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelGoalEndEvent.prototype, "_client", void 0);
EventSubChannelGoalEndEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelGoalEndEvent', 'broadcasterId')
], EventSubChannelGoalEndEvent);
exports.EventSubChannelGoalEndEvent = EventSubChannelGoalEndEvent;
