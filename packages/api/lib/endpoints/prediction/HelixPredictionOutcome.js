"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPredictionOutcome = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixPredictor_1 = require("./HelixPredictor");
/**
 * A possible outcome in a channel prediction.
 */
let HelixPredictionOutcome = class HelixPredictionOutcome extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
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
     * The number of users that guessed the outcome.
     */
    get users() {
        return this[common_1.rawDataSymbol].users;
    }
    /**
     * The total number of channel points that were spent on guessing the outcome.
     */
    get totalChannelPoints() {
        return this[common_1.rawDataSymbol].channel_points;
    }
    /**
     * The color of the outcome.
     */
    get color() {
        return this[common_1.rawDataSymbol].color;
    }
    /**
     * The top predictors of the outcome.
     */
    get topPredictors() {
        var _a, _b;
        return (_b = (_a = this[common_1.rawDataSymbol].top_predictors) === null || _a === void 0 ? void 0 : _a.map(data => new HelixPredictor_1.HelixPredictor(data, this._client))) !== null && _b !== void 0 ? _b : [];
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixPredictionOutcome.prototype, "_client", void 0);
HelixPredictionOutcome = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPredictionOutcome', 'id')
], HelixPredictionOutcome);
exports.HelixPredictionOutcome = HelixPredictionOutcome;
