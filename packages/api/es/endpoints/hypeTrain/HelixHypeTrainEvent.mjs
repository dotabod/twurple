import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixHypeTrainContribution } from "./HelixHypeTrainContribution.mjs";
/**
 * A Hype Train event.
 */
let HelixHypeTrainEvent = class HelixHypeTrainEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The unique ID of the Hype Train event.
     */
    get eventId() {
        return this[rawDataSymbol].id;
    }
    /**
     * The type of the Hype Train event.
     */
    get eventType() {
        return this[rawDataSymbol].event_type;
    }
    /**
     * The date of the Hype Train event.
     */
    get eventDate() {
        return new Date(this[rawDataSymbol].event_timestamp);
    }
    /**
     * The version of the Hype Train event.
     */
    get eventVersion() {
        return this[rawDataSymbol].version;
    }
    /**
     * The unique ID of the Hype Train.
     */
    get id() {
        return this[rawDataSymbol].event_data.id;
    }
    /**
     * The user ID of the broadcaster where the Hype Train event was triggered.
     */
    get broadcasterId() {
        return this[rawDataSymbol].event_data.broadcaster_id;
    }
    /**
     * Gets more information about the broadcaster where the Hype Train event was triggered.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].event_data.broadcaster_id));
    }
    /**
     * The level of the Hype Train event.
     */
    get level() {
        return this[rawDataSymbol].event_data.level;
    }
    /**
     * The time when the Hype Train started.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].event_data.started_at);
    }
    /**
     * The time when the Hype Train is set to expire.
     */
    get expiryDate() {
        return new Date(this[rawDataSymbol].event_data.expires_at);
    }
    /**
     * The time when the Hype Train cooldown will end.
     */
    get cooldownDate() {
        return new Date(this[rawDataSymbol].event_data.cooldown_end_time);
    }
    /**
     * The total amount of progress points of the Hype Train event.
     */
    get total() {
        return this[rawDataSymbol].event_data.total;
    }
    /**
     * The progress points goal to reach the next Hype Train level.
     */
    get goal() {
        return this[rawDataSymbol].event_data.goal;
    }
    /**
     * The last contribution to the Hype Train event.
     */
    get lastContribution() {
        return new HelixHypeTrainContribution(this[rawDataSymbol].event_data.last_contribution, this._client);
    }
    /**
     * Array list of the top contributions to the Hype Train event for bits and subs.
     */
    get topContributions() {
        return this[rawDataSymbol].event_data.top_contributions.map(cont => new HelixHypeTrainContribution(cont, this._client));
    }
};
__decorate([
    Enumerable(false)
], HelixHypeTrainEvent.prototype, "_client", void 0);
HelixHypeTrainEvent = __decorate([
    rtfm('api', 'HelixHypeTrainEvent', 'id')
], HelixHypeTrainEvent);
export { HelixHypeTrainEvent };
