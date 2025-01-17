import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A user that took part in a prediction.
 */
let HelixPredictor = class HelixPredictor extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The user ID of the predictor.
     */
    get userId() {
        return this[rawDataSymbol].id;
    }
    /**
     * The name of the predictor.
     */
    get userName() {
        return this[rawDataSymbol].login;
    }
    /**
     * The display name of the predictor.
     */
    get userDisplayName() {
        return this[rawDataSymbol].name;
    }
    /**
     * Gets more information about the predictor.
     */
    async getUser() {
        return await this._client.users.getUserById(this[rawDataSymbol].id);
    }
    /**
     * The amount of channel points the predictor used for the prediction.
     */
    get channelPointsUsed() {
        return this[rawDataSymbol].channel_points_used;
    }
    /**
     * The amount of channel points the predictor won for the prediction, or null if the prediction is not resolved yet, was cancelled or lost.
     */
    get channelPointsWon() {
        return this[rawDataSymbol].channel_points_won;
    }
};
__decorate([
    Enumerable(false)
], HelixPredictor.prototype, "_client", void 0);
HelixPredictor = __decorate([
    rtfm('api', 'HelixPredictor', 'userId')
], HelixPredictor);
export { HelixPredictor };
