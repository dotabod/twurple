"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelRaidSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelRaidEvent_1 = require("../events/EventSubChannelRaidEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelRaidSubscription = class EventSubChannelRaidSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId, _direction) {
        super(handler, client);
        this._userId = _userId;
        this._direction = _direction;
        /** @protected */ this._cliName = 'raid';
    }
    get id() {
        return `channel.raid.${this._direction}.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelRaidEvent_1.EventSubChannelRaidEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._direction === 'from') {
            return await this._client._apiClient.eventSub.subscribeToChannelRaidEventsFrom(this._userId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRaidEventsTo(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRaidSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelRaidSubscription);
exports.EventSubChannelRaidSubscription = EventSubChannelRaidSubscription;
