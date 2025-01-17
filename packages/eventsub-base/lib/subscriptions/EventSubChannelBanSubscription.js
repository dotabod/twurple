"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelBanSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelBanEvent_1 = require("../events/EventSubChannelBanEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelBanSubscription = class EventSubChannelBanSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'ban';
    }
    get id() {
        return `channel.ban.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelBanEvent_1.EventSubChannelBanEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelBanEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelBanSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelBanSubscription);
exports.EventSubChannelBanSubscription = EventSubChannelBanSubscription;
