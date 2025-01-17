"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionProgressSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelPredictionProgressEvent_1 = require("../events/EventSubChannelPredictionProgressEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelPredictionProgressSubscription = class EventSubChannelPredictionProgressSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'prediction-progress';
    }
    get id() {
        return `channel.prediction.progress.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelPredictionProgressEvent_1.EventSubChannelPredictionProgressEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelPredictionProgressEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelPredictionProgressSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelPredictionProgressSubscription);
exports.EventSubChannelPredictionProgressSubscription = EventSubChannelPredictionProgressSubscription;
