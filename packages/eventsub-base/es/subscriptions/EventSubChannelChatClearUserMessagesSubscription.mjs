import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelChatClearUserMessagesEvent } from "../events/EventSubChannelChatClearUserMessagesEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelChatClearUserMessagesSubscription = class EventSubChannelChatClearUserMessagesSubscription extends EventSubSubscription {
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
        return new EventSubChannelChatClearUserMessagesEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelChatClearUserMessagesEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelChatClearUserMessagesSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelChatClearUserMessagesSubscription);
export { EventSubChannelChatClearUserMessagesSubscription };
