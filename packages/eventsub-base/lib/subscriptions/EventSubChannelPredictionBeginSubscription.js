"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionBeginSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelPredictionBeginEvent_1 = require("../events/EventSubChannelPredictionBeginEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelPredictionBeginSubscription = class EventSubChannelPredictionBeginSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'prediction-begin';
    }
    get id() {
        return `channel.prediction.begin.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelPredictionBeginEvent_1.EventSubChannelPredictionBeginEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelPredictionBeginEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelPredictionBeginSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelPredictionBeginSubscription);
exports.EventSubChannelPredictionBeginSubscription = EventSubChannelPredictionBeginSubscription;
