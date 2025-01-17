"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelAdBreakBeginSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelAdBreakBeginEvent_1 = require("../events/EventSubChannelAdBreakBeginEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelAdBreakBeginSubscription = class EventSubChannelAdBreakBeginSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'ad-break-begin';
    }
    get id() {
        return `channel.ad_break.begin.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelAdBreakBeginEvent_1.EventSubChannelAdBreakBeginEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelAdBreakBeginEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelAdBreakBeginSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelAdBreakBeginSubscription);
exports.EventSubChannelAdBreakBeginSubscription = EventSubChannelAdBreakBeginSubscription;
