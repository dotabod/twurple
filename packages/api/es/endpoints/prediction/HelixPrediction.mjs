import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, HellFreezesOverError, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixPredictionOutcome } from "./HelixPredictionOutcome.mjs";
/**
 * A channel prediction.
 */
let HelixPrediction = class HelixPrediction extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the prediction.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The title of the prediction.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The status of the prediction.
     */
    get status() {
        return this[rawDataSymbol].status;
    }
    /**
     * The time after which the prediction will be automatically locked, in seconds from creation.
     */
    get autoLockAfter() {
        return this[rawDataSymbol].prediction_window;
    }
    /**
     * The date when the prediction started.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The date when the prediction ended, or null if it didn't end yet.
     */
    get endDate() {
        return this[rawDataSymbol].ended_at ? new Date(this[rawDataSymbol].ended_at) : null;
    }
    /**
     * The date when the prediction was locked, or null if it wasn't locked yet.
     */
    get lockDate() {
        return this[rawDataSymbol].locked_at ? new Date(this[rawDataSymbol].locked_at) : null;
    }
    /**
     * The possible outcomes of the prediction.
     */
    get outcomes() {
        return this[rawDataSymbol].outcomes.map(data => new HelixPredictionOutcome(data, this._client));
    }
    /**
     * The ID of the winning outcome, or null if the prediction is currently running or was canceled.
     */
    get winningOutcomeId() {
        // can apparently be empty string
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this[rawDataSymbol].winning_outcome_id || null;
    }
    /**
     * The winning outcome, or null if the prediction is currently running or was canceled.
     */
    get winningOutcome() {
        if (!this[rawDataSymbol].winning_outcome_id) {
            return null;
        }
        const found = this[rawDataSymbol].outcomes.find(o => o.id === this[rawDataSymbol].winning_outcome_id);
        if (!found) {
            throw new HellFreezesOverError('Winning outcome not found in outcomes array');
        }
        return new HelixPredictionOutcome(found, this._client);
    }
};
__decorate([
    Enumerable(false)
], HelixPrediction.prototype, "_client", void 0);
HelixPrediction = __decorate([
    rtfm('api', 'HelixPrediction', 'id')
], HelixPrediction);
export { HelixPrediction };
