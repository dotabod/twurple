"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelChatClearSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelChatClearEvent_1 = require("../events/EventSubChannelChatClearEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelChatClearSubscription = class EventSubChannelChatClearSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'chat-clear';
    }
    get id() {
        return `channel.chat.clear.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelChatClearEvent_1.EventSubChannelChatClearEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelChatClearEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelChatClearSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelChatClearSubscription);
exports.EventSubChannelChatClearSubscription = EventSubChannelChatClearSubscription;
