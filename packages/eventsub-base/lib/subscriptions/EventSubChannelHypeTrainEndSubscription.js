"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelHypeTrainEndSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelHypeTrainEndEvent_1 = require("../events/EventSubChannelHypeTrainEndEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelHypeTrainEndSubscription = class EventSubChannelHypeTrainEndSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'hype-train-end';
    }
    get id() {
        return `channel.hype_train.end.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelHypeTrainEndEvent_1.EventSubChannelHypeTrainEndEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelHypeTrainEndEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelHypeTrainEndSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelHypeTrainEndSubscription);
exports.EventSubChannelHypeTrainEndSubscription = EventSubChannelHypeTrainEndSubscription;
