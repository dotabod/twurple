import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A possible outcome of a prediction, as defined when beginning that prediction.
 */
let EventSubChannelPredictionBeginOutcome = class EventSubChannelPredictionBeginOutcome extends DataObject {
    /**
     * The ID of the outcome.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The title of the outcome.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The color of the outcome.
     */
    get color() {
        return this[rawDataSymbol].color;
    }
};
EventSubChannelPredictionBeginOutcome = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPredictionBeginOutcome', 'id')
], EventSubChannelPredictionBeginOutcome);
export { EventSubChannelPredictionBeginOutcome };
