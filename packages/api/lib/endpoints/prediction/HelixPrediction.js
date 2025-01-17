"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPrediction = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixPredictionOutcome_1 = require("./HelixPredictionOutcome");
/**
 * A channel prediction.
 */
let HelixPrediction = class HelixPrediction extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the prediction.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id));
    }
    /**
     * The title of the prediction.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The status of the prediction.
     */
    get status() {
        return this[common_1.rawDataSymbol].status;
    }
    /**
     * The time after which the prediction will be automatically locked, in seconds from creation.
     */
    get autoLockAfter() {
        return this[common_1.rawDataSymbol].prediction_window;
    }
    /**
     * The date when the prediction started.
     */
    get creationDate() {
        return new Date(this[common_1.rawDataSymbol].created_at);
    }
    /**
     * The date when the prediction ended, or null if it didn't end yet.
     */
    get endDate() {
        return this[common_1.rawDataSymbol].ended_at ? new Date(this[common_1.rawDataSymbol].ended_at) : null;
    }
    /**
     * The date when the prediction was locked, or null if it wasn't locked yet.
     */
    get lockDate() {
        return this[common_1.rawDataSymbol].locked_at ? new Date(this[common_1.rawDataSymbol].locked_at) : null;
    }
    /**
     * The possible outcomes of the prediction.
     */
    get outcomes() {
        return this[common_1.rawDataSymbol].outcomes.map(data => new HelixPredictionOutcome_1.HelixPredictionOutcome(data, this._client));
    }
    /**
     * The ID of the winning outcome, or null if the prediction is currently running or was canceled.
     */
    get winningOutcomeId() {
        // can apparently be empty string
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this[common_1.rawDataSymbol].winning_outcome_id || null;
    }
    /**
     * The winning outcome, or null if the prediction is currently running or was canceled.
     */
    get winningOutcome() {
        if (!this[common_1.rawDataSymbol].winning_outcome_id) {
            return null;
        }
        const found = this[common_1.rawDataSymbol].outcomes.find(o => o.id === this[common_1.rawDataSymbol].winning_outcome_id);
        if (!found) {
            throw new common_1.HellFreezesOverError('Winning outcome not found in outcomes array');
        }
        return new HelixPredictionOutcome_1.HelixPredictionOutcome(found, this._client);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixPrediction.prototype, "_client", void 0);
HelixPrediction = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPrediction', 'id')
], HelixPrediction);
exports.HelixPrediction = HelixPrediction;
