import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub subscription.
 */
let HelixEventSubSubscription = class HelixEventSubSubscription extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the subscription.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The status of the subscription.
     */
    get status() {
        return this[rawDataSymbol].status;
    }
    /**
     * The event type that the subscription is listening to.
     */
    get type() {
        return this[rawDataSymbol].type;
    }
    /**
     * The cost of the subscription.
     */
    get cost() {
        return this[rawDataSymbol].cost;
    }
    /**
     * The condition of the subscription.
     */
    get condition() {
        return this[rawDataSymbol].condition;
    }
    /**
     * The date and time of creation of the subscription.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * End the EventSub subscription.
     */
    async unsubscribe() {
        await this._client.eventSub.deleteSubscription(this[rawDataSymbol].id);
    }
    /** @private */
    get _transport() {
        return this[rawDataSymbol].transport;
    }
    /** @private */
    set _status(status) {
        this[rawDataSymbol].status = status;
    }
};
__decorate([
    Enumerable(false)
], HelixEventSubSubscription.prototype, "_client", void 0);
HelixEventSubSubscription = __decorate([
    rtfm('api', 'HelixEventSubSubscription', 'id')
], HelixEventSubSubscription);
export { HelixEventSubSubscription };
