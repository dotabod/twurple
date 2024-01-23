import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelChatClearEvent } from "../events/EventSubChannelChatClearEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelChatClearSubscription = class EventSubChannelChatClearSubscription extends EventSubSubscription {
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
        return new EventSubChannelChatClearEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelChatClearEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelChatClearSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelChatClearSubscription);
export { EventSubChannelChatClearSubscription };
