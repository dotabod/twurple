import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelSubscriptionEvent } from "../events/EventSubChannelSubscriptionEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelSubscriptionSubscription = class EventSubChannelSubscriptionSubscription extends EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'subscribe';
    }
    get id() {
        return `channel.subscribe.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelSubscriptionEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelSubscriptionEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelSubscriptionSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelSubscriptionSubscription);
export { EventSubChannelSubscriptionSubscription };
