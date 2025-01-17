"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelHypeTrainBeginSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelHypeTrainBeginEvent_1 = require("../events/EventSubChannelHypeTrainBeginEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelHypeTrainBeginSubscription = class EventSubChannelHypeTrainBeginSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'hype-train-begin';
    }
    get id() {
        return `channel.hype_train.begin.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelHypeTrainBeginEvent_1.EventSubChannelHypeTrainBeginEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelHypeTrainBeginEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelHypeTrainBeginSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelHypeTrainBeginSubscription);
exports.EventSubChannelHypeTrainBeginSubscription = EventSubChannelHypeTrainBeginSubscription;
