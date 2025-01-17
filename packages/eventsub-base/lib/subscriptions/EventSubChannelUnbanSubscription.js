"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelUnbanSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelUnbanEvent_1 = require("../events/EventSubChannelUnbanEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelUnbanSubscription = class EventSubChannelUnbanSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'unban';
    }
    get id() {
        return `channel.unban.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelUnbanEvent_1.EventSubChannelUnbanEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelUnbanEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelUnbanSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelUnbanSubscription);
exports.EventSubChannelUnbanSubscription = EventSubChannelUnbanSubscription;
