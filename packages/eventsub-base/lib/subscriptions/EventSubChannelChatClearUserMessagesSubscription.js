"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelChatClearUserMessagesSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelChatClearUserMessagesEvent_1 = require("../events/EventSubChannelChatClearUserMessagesEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelChatClearUserMessagesSubscription = class EventSubChannelChatClearUserMessagesSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'chat-clear-user-messages';
    }
    get id() {
        return `channel.chat.clear_user_messages.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelChatClearUserMessagesEvent_1.EventSubChannelChatClearUserMessagesEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelChatClearUserMessagesEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelChatClearUserMessagesSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelChatClearUserMessagesSubscription);
exports.EventSubChannelChatClearUserMessagesSubscription = EventSubChannelChatClearUserMessagesSubscription;
