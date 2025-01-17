import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubUserUpdateEvent } from "../events/EventSubUserUpdateEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubUserUpdateSubscription = class EventSubUserUpdateSubscription extends EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'user.update';
    }
    get id() {
        return `user.update.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubUserUpdateEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToUserUpdateEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubUserUpdateSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubUserUpdateSubscription);
export { EventSubUserUpdateSubscription };
