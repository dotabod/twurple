"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelCheerSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelCheerEvent_1 = require("../events/EventSubChannelCheerEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelCheerSubscription = class EventSubChannelCheerSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'cheer';
    }
    get id() {
        return `channel.cheer.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelCheerEvent_1.EventSubChannelCheerEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelCheerEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelCheerSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelCheerSubscription);
exports.EventSubChannelCheerSubscription = EventSubChannelCheerSubscription;
