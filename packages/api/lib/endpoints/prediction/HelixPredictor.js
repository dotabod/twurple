"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPredictor = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A user that took part in a prediction.
 */
let HelixPredictor = class HelixPredictor extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The user ID of the predictor.
     */
    get userId() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The name of the predictor.
     */
    get userName() {
        return this[common_1.rawDataSymbol].login;
    }
    /**
     * The display name of the predictor.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].name;
    }
    /**
     * Gets more information about the predictor.
     */
    async getUser() {
        return await this._client.users.getUserById(this[common_1.rawDataSymbol].id);
    }
    /**
     * The amount of channel points the predictor used for the prediction.
     */
    get channelPointsUsed() {
        return this[common_1.rawDataSymbol].channel_points_used;
    }
    /**
     * The amount of channel points the predictor won for the prediction, or null if the prediction is not resolved yet, was cancelled or lost.
     */
    get channelPointsWon() {
        return this[common_1.rawDataSymbol].channel_points_won;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixPredictor.prototype, "_client", void 0);
HelixPredictor = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPredictor', 'userId')
], HelixPredictor);
exports.HelixPredictor = HelixPredictor;
