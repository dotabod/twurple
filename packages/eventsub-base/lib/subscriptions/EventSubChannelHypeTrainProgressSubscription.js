"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelHypeTrainProgressSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelHypeTrainProgressEvent_1 = require("../events/EventSubChannelHypeTrainProgressEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelHypeTrainProgressSubscription = class EventSubChannelHypeTrainProgressSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'hype-train-progress';
    }
    get id() {
        return `channel.hype_train.progress.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelHypeTrainProgressEvent_1.EventSubChannelHypeTrainProgressEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelHypeTrainProgressEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelHypeTrainProgressSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelHypeTrainProgressSubscription);
exports.EventSubChannelHypeTrainProgressSubscription = EventSubChannelHypeTrainProgressSubscription;
