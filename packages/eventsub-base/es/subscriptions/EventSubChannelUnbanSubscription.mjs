import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelUnbanEvent } from "../events/EventSubChannelUnbanEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelUnbanSubscription = class EventSubChannelUnbanSubscription extends EventSubSubscription {
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
        return new EventSubChannelUnbanEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelUnbanEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelUnbanSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelUnbanSubscription);
export { EventSubChannelUnbanSubscription };
