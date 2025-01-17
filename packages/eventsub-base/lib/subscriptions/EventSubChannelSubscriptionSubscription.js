"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelSubscriptionSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelSubscriptionEvent_1 = require("../events/EventSubChannelSubscriptionEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelSubscriptionSubscription = class EventSubChannelSubscriptionSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'subscribe';
    }
    get id() {
        return `channel.subscribe.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelSubscriptionEvent_1.EventSubChannelSubscriptionEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelSubscriptionEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelSubscriptionSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelSubscriptionSubscription);
exports.EventSubChannelSubscriptionSubscription = EventSubChannelSubscriptionSubscription;
