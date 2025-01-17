"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionBeginOutcome = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A possible outcome of a prediction, as defined when beginning that prediction.
 */
let EventSubChannelPredictionBeginOutcome = class EventSubChannelPredictionBeginOutcome extends common_1.DataObject {
    /**
     * The ID of the outcome.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The title of the outcome.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The color of the outcome.
     */
    get color() {
        return this[common_1.rawDataSymbol].color;
    }
};
EventSubChannelPredictionBeginOutcome = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPredictionBeginOutcome', 'id')
], EventSubChannelPredictionBeginOutcome);
exports.EventSubChannelPredictionBeginOutcome = EventSubChannelPredictionBeginOutcome;
