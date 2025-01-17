"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionOutcome = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const EventSubChannelPredictionBeginOutcome_1 = require("./EventSubChannelPredictionBeginOutcome");
const EventSubChannelPredictionPredictor_1 = require("./EventSubChannelPredictionPredictor");
/**
 * A possible outcome of a prediction.
 */
let EventSubChannelPredictionOutcome = class EventSubChannelPredictionOutcome extends EventSubChannelPredictionBeginOutcome_1.EventSubChannelPredictionBeginOutcome {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The number of users that predicted the outcome.
     */
    get users() {
        return this[common_1.rawDataSymbol].users;
    }
    /**
     * The number of channel points that were bet on the outcome.
     */
    get channelPoints() {
        return this[common_1.rawDataSymbol].channel_points;
    }
    /**
     * The top predictors of the choice.
     */
    get topPredictors() {
        return this[common_1.rawDataSymbol].top_predictors.map(data => new EventSubChannelPredictionPredictor_1.EventSubChannelPredictionPredictor(data, this._client));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelPredictionOutcome.prototype, "_client", void 0);
EventSubChannelPredictionOutcome = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPredictionOutcome', 'id')
], EventSubChannelPredictionOutcome);
exports.EventSubChannelPredictionOutcome = EventSubChannelPredictionOutcome;
