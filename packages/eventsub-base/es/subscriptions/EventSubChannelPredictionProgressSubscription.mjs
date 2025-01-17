import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelPredictionProgressEvent } from "../events/EventSubChannelPredictionProgressEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelPredictionProgressSubscription = class EventSubChannelPredictionProgressSubscription extends EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'prediction-progress';
    }
    get id() {
        return `channel.prediction.progress.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelPredictionProgressEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelPredictionProgressEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelPredictionProgressSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelPredictionProgressSubscription);
export { EventSubChannelPredictionProgressSubscription };
