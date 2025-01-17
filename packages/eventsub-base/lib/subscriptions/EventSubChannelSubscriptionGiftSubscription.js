"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelSubscriptionGiftSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelSubscriptionGiftEvent_1 = require("../events/EventSubChannelSubscriptionGiftEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelSubscriptionGiftSubscription = class EventSubChannelSubscriptionGiftSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'gift';
    }
    get id() {
        return `channel.subscription.gift.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelSubscriptionGiftEvent_1.EventSubChannelSubscriptionGiftEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelSubscriptionGiftEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelSubscriptionGiftSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelSubscriptionGiftSubscription);
exports.EventSubChannelSubscriptionGiftSubscription = EventSubChannelSubscriptionGiftSubscription;
