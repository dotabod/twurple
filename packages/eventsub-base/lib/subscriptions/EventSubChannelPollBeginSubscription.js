"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPollBeginSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelPollBeginEvent_1 = require("../events/EventSubChannelPollBeginEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelPollBeginSubscription = class EventSubChannelPollBeginSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'poll-begin';
    }
    get id() {
        return `channel.poll.begin.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelPollBeginEvent_1.EventSubChannelPollBeginEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelPollBeginEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelPollBeginSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelPollBeginSubscription);
exports.EventSubChannelPollBeginSubscription = EventSubChannelPollBeginSubscription;
