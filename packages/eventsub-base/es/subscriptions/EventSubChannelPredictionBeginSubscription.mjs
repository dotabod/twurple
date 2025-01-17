import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelPredictionBeginEvent } from "../events/EventSubChannelPredictionBeginEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelPredictionBeginSubscription = class EventSubChannelPredictionBeginSubscription extends EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'prediction-begin';
    }
    get id() {
        return `channel.prediction.begin.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelPredictionBeginEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelPredictionBeginEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelPredictionBeginSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelPredictionBeginSubscription);
export { EventSubChannelPredictionBeginSubscription };
