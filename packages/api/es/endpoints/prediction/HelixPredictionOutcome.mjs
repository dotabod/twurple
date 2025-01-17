import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixPredictor } from "./HelixPredictor.mjs";
/**
 * A possible outcome in a channel prediction.
 */
let HelixPredictionOutcome = class HelixPredictionOutcome extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
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
     * The number of users that guessed the outcome.
     */
    get users() {
        return this[rawDataSymbol].users;
    }
    /**
     * The total number of channel points that were spent on guessing the outcome.
     */
    get totalChannelPoints() {
        return this[rawDataSymbol].channel_points;
    }
    /**
     * The color of the outcome.
     */
    get color() {
        return this[rawDataSymbol].color;
    }
    /**
     * The top predictors of the outcome.
     */
    get topPredictors() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].top_predictors) === null || _a === void 0 ? void 0 : _a.map(data => new HelixPredictor(data, this._client))) !== null && _b !== void 0 ? _b : [];
    }
};
__decorate([
    Enumerable(false)
], HelixPredictionOutcome.prototype, "_client", void 0);
HelixPredictionOutcome = __decorate([
    rtfm('api', 'HelixPredictionOutcome', 'id')
], HelixPredictionOutcome);
export { HelixPredictionOutcome };
