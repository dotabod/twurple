import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelBanEvent } from "../events/EventSubChannelBanEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelBanSubscription = class EventSubChannelBanSubscription extends EventSubSubscription {
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
        return new EventSubChannelBanEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelBanEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelBanSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelBanSubscription);
export { EventSubChannelBanSubscription };
