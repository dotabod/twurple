import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, HellFreezesOverError, rawDataSymbol, rtfm } from '@twurple/common';
import { EventSubChannelPredictionOutcome } from "./common/EventSubChannelPredictionOutcome.mjs";
/**
 * An EventSub event representing a prediction being locked in a channel.
 */
let EventSubChannelPredictionEndEvent = class EventSubChannelPredictionEndEvent extends DataObject {
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
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The title of the prediction.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The possible outcomes of the prediction.
     */
    get outcomes() {
        return this[rawDataSymbol].outcomes.map(data => new EventSubChannelPredictionOutcome(data, this._client));
    }
    /**
     * The time when the prediction started.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].started_at);
    }
    /**
     * The time when the prediction ended.
     */
    get endDate() {
        return new Date(this[rawDataSymbol].ended_at);
    }
    /**
     * The status of the prediction.
     */
    get status() {
        return this[rawDataSymbol].status;
    }
    /**
     * The ID of the winning outcome, or null if the prediction was canceled.
     */
    get winningOutcomeId() {
        // can apparently be empty string
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this[rawDataSymbol].winning_outcome_id || null;
    }
    /**
     * The winning outcome, or null if the prediction was canceled.
     */
    get winningOutcome() {
        if (!this[rawDataSymbol].winning_outcome_id) {
            return null;
        }
        const found = this[rawDataSymbol].outcomes.find(o => o.id === this[rawDataSymbol].winning_outcome_id);
        if (!found) {
            throw new HellFreezesOverError('Winning outcome not found in outcomes array');
        }
        return new EventSubChannelPredictionOutcome(found, this._client);
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelPredictionEndEvent.prototype, "_client", void 0);
EventSubChannelPredictionEndEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPredictionEndEvent', 'broadcasterId')
], EventSubChannelPredictionEndEvent);
export { EventSubChannelPredictionEndEvent };
