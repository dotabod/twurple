import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A user that voted on a prediction.
 */
let EventSubChannelPredictionPredictor = class EventSubChannelPredictionPredictor extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the predictor.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the predictor.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the predictor.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the predictor.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The number of channel points the predictor used.
     */
    get channelPointsUsed() {
        return this[rawDataSymbol].channel_points_used;
    }
    /**
     * The number of channel points the predictor won, or null if they didn't win (yet).
     */
    get channelPointsWon() {
        return this[rawDataSymbol].channel_points_won;
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelPredictionPredictor.prototype, "_client", void 0);
EventSubChannelPredictionPredictor = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPredictionPredictor', 'userId')
], EventSubChannelPredictionPredictor);
export { EventSubChannelPredictionPredictor };
