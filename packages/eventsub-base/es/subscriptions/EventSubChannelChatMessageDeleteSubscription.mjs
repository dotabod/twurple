import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelChatMessageDeleteEvent } from "../events/EventSubChannelChatMessageDeleteEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelChatMessageDeleteSubscription = class EventSubChannelChatMessageDeleteSubscription extends EventSubSubscription {
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
        return new EventSubChannelChatMessageDeleteEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelChatMessageDeleteEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelChatMessageDeleteSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelChatMessageDeleteSubscription);
export { EventSubChannelChatMessageDeleteSubscription };
