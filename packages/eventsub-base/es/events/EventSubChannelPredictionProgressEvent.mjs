import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { EventSubChannelPredictionOutcome } from "./common/EventSubChannelPredictionOutcome.mjs";
/**
 * An EventSub event representing a prediction being voted on in a channel.
 */
let EventSubChannelPredictionProgressEvent = class EventSubChannelPredictionProgressEvent extends DataObject {
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
     * The time when the prediction is locked.
     */
    get lockDate() {
        return new Date(this[rawDataSymbol].locks_at);
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelPredictionProgressEvent.prototype, "_client", void 0);
EventSubChannelPredictionProgressEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPredictionProgressEvent', 'broadcasterId')
], EventSubChannelPredictionProgressEvent);
export { EventSubChannelPredictionProgressEvent };
