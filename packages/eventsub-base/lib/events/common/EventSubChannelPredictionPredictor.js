"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPredictionPredictor = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A user that voted on a prediction.
 */
let EventSubChannelPredictionPredictor = class EventSubChannelPredictionPredictor extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the predictor.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the predictor.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the predictor.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the predictor.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The number of channel points the predictor used.
     */
    get channelPointsUsed() {
        return this[common_1.rawDataSymbol].channel_points_used;
    }
    /**
     * The number of channel points the predictor won, or null if they didn't win (yet).
     */
    get channelPointsWon() {
        return this[common_1.rawDataSymbol].channel_points_won;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelPredictionPredictor.prototype, "_client", void 0);
EventSubChannelPredictionPredictor = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPredictionPredictor', 'userId')
], EventSubChannelPredictionPredictor);
exports.EventSubChannelPredictionPredictor = EventSubChannelPredictionPredictor;
