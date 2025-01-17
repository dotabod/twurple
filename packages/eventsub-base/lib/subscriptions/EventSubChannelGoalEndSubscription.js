"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelGoalEndSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelGoalEndEvent_1 = require("../events/EventSubChannelGoalEndEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelGoalEndSubscription = class EventSubChannelGoalEndSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'goal-end';
    }
    get id() {
        return `channel.goal.end.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelGoalEndEvent_1.EventSubChannelGoalEndEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelGoalEndEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelGoalEndSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelGoalEndSubscription);
exports.EventSubChannelGoalEndSubscription = EventSubChannelGoalEndSubscription;
