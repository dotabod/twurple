"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelSubscriptionMessageSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelSubscriptionMessageEvent_1 = require("../events/EventSubChannelSubscriptionMessageEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelSubscriptionMessageSubscription = class EventSubChannelSubscriptionMessageSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'subscribe-message';
    }
    get id() {
        return `channel.subscription.message.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelSubscriptionMessageEvent_1.EventSubChannelSubscriptionMessageEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelSubscriptionMessageEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelSubscriptionMessageSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelSubscriptionMessageSubscription);
exports.EventSubChannelSubscriptionMessageSubscription = EventSubChannelSubscriptionMessageSubscription;
