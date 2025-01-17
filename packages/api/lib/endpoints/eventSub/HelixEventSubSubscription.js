"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixEventSubSubscription = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub subscription.
 */
let HelixEventSubSubscription = class HelixEventSubSubscription extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the subscription.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The status of the subscription.
     */
    get status() {
        return this[common_1.rawDataSymbol].status;
    }
    /**
     * The event type that the subscription is listening to.
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The cost of the subscription.
     */
    get cost() {
        return this[common_1.rawDataSymbol].cost;
    }
    /**
     * The condition of the subscription.
     */
    get condition() {
        return this[common_1.rawDataSymbol].condition;
    }
    /**
     * The date and time of creation of the subscription.
     */
    get creationDate() {
        return new Date(this[common_1.rawDataSymbol].created_at);
    }
    /**
     * End the EventSub subscription.
     */
    async unsubscribe() {
        await this._client.eventSub.deleteSubscription(this[common_1.rawDataSymbol].id);
    }
    /** @private */
    get _transport() {
        return this[common_1.rawDataSymbol].transport;
    }
    /** @private */
    set _status(status) {
        this[common_1.rawDataSymbol].status = status;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixEventSubSubscription.prototype, "_client", void 0);
HelixEventSubSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixEventSubSubscription', 'id')
], HelixEventSubSubscription);
exports.HelixEventSubSubscription = HelixEventSubSubscription;
