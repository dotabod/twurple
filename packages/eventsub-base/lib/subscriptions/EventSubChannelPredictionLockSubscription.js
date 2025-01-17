"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionLockSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelPredictionLockEvent_1 = require("../events/EventSubChannelPredictionLockEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelPredictionLockSubscription = class EventSubChannelPredictionLockSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'prediction-lock';
    }
    get id() {
        return `channel.prediction.lock.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelPredictionLockEvent_1.EventSubChannelPredictionLockEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelPredictionLockEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelPredictionLockSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelPredictionLockSubscription);
exports.EventSubChannelPredictionLockSubscription = EventSubChannelPredictionLockSubscription;
