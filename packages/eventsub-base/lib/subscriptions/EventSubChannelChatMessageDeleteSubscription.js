"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelChatMessageDeleteSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelChatMessageDeleteEvent_1 = require("../events/EventSubChannelChatMessageDeleteEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelChatMessageDeleteSubscription = class EventSubChannelChatMessageDeleteSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'chat-message-delete';
    }
    get id() {
        return `channel.chat.message_delete.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelChatMessageDeleteEvent_1.EventSubChannelChatMessageDeleteEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelChatMessageDeleteEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelChatMessageDeleteSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelChatMessageDeleteSubscription);
exports.EventSubChannelChatMessageDeleteSubscription = EventSubChannelChatMessageDeleteSubscription;
