"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixHypeTrainEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixHypeTrainContribution_1 = require("./HelixHypeTrainContribution");
/**
 * A Hype Train event.
 */
let HelixHypeTrainEvent = class HelixHypeTrainEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The unique ID of the Hype Train event.
     */
    get eventId() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The type of the Hype Train event.
     */
    get eventType() {
        return this[common_1.rawDataSymbol].event_type;
    }
    /**
     * The date of the Hype Train event.
     */
    get eventDate() {
        return new Date(this[common_1.rawDataSymbol].event_timestamp);
    }
    /**
     * The version of the Hype Train event.
     */
    get eventVersion() {
        return this[common_1.rawDataSymbol].version;
    }
    /**
     * The unique ID of the Hype Train.
     */
    get id() {
        return this[common_1.rawDataSymbol].event_data.id;
    }
    /**
     * The user ID of the broadcaster where the Hype Train event was triggered.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].event_data.broadcaster_id;
    }
    /**
     * Gets more information about the broadcaster where the Hype Train event was triggered.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].event_data.broadcaster_id));
    }
    /**
     * The level of the Hype Train event.
     */
    get level() {
        return this[common_1.rawDataSymbol].event_data.level;
    }
    /**
     * The time when the Hype Train started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].event_data.started_at);
    }
    /**
     * The time when the Hype Train is set to expire.
     */
    get expiryDate() {
        return new Date(this[common_1.rawDataSymbol].event_data.expires_at);
    }
    /**
     * The time when the Hype Train cooldown will end.
     */
    get cooldownDate() {
        return new Date(this[common_1.rawDataSymbol].event_data.cooldown_end_time);
    }
    /**
     * The total amount of progress points of the Hype Train event.
     */
    get total() {
        return this[common_1.rawDataSymbol].event_data.total;
    }
    /**
     * The progress points goal to reach the next Hype Train level.
     */
    get goal() {
        return this[common_1.rawDataSymbol].event_data.goal;
    }
    /**
     * The last contribution to the Hype Train event.
     */
    get lastContribution() {
        return new HelixHypeTrainContribution_1.HelixHypeTrainContribution(this[common_1.rawDataSymbol].event_data.last_contribution, this._client);
    }
    /**
     * Array list of the top contributions to the Hype Train event for bits and subs.
     */
    get topContributions() {
        return this[common_1.rawDataSymbol].event_data.top_contributions.map(cont => new HelixHypeTrainContribution_1.HelixHypeTrainContribution(cont, this._client));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixHypeTrainEvent.prototype, "_client", void 0);
HelixHypeTrainEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixHypeTrainEvent', 'id')
], HelixHypeTrainEvent);
exports.HelixHypeTrainEvent = HelixHypeTrainEvent;
