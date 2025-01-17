import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { rawDataSymbol, rtfm } from '@twurple/common';
import { EventSubChannelPredictionBeginOutcome } from "./EventSubChannelPredictionBeginOutcome.mjs";
import { EventSubChannelPredictionPredictor } from "./EventSubChannelPredictionPredictor.mjs";
/**
 * A possible outcome of a prediction.
 */
let EventSubChannelPredictionOutcome = class EventSubChannelPredictionOutcome extends EventSubChannelPredictionBeginOutcome {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The number of users that predicted the outcome.
     */
    get users() {
        return this[rawDataSymbol].users;
    }
    /**
     * The number of channel points that were bet on the outcome.
     */
    get channelPoints() {
        return this[rawDataSymbol].channel_points;
    }
    /**
     * The top predictors of the choice.
     */
    get topPredictors() {
        return this[rawDataSymbol].top_predictors.map(data => new EventSubChannelPredictionPredictor(data, this._client));
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelPredictionOutcome.prototype, "_client", void 0);
EventSubChannelPredictionOutcome = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPredictionOutcome', 'id')
], EventSubChannelPredictionOutcome);
export { EventSubChannelPredictionOutcome };
