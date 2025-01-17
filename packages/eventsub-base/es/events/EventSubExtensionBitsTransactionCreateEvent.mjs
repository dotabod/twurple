import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a bits transaction in an extension.
 */
let EventSubExtensionBitsTransactionCreateEvent = class EventSubExtensionBitsTransactionCreateEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the transaction.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The client ID of the extension.
     */
    get clientId() {
        return this[rawDataSymbol].extension_client_id;
    }
    /**
     * The ID of the subscribing user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the subscribing user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the subscribing user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the subscribing user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
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
     * The name of the product the transaction is referring to.
     */
    get productName() {
        return this[rawDataSymbol].product.name;
    }
    /**
     * The SKU of the product the transaction is referring to.
     */
    get productSku() {
        return this[rawDataSymbol].product.sku;
    }
    /**
     * The cost of the product the transaction is referring to, in Bits.
     */
    get productCost() {
        return this[rawDataSymbol].product.bits;
    }
    /**
     * Whether the product the transaction is referring to is in development.
     */
    get productInDevelopment() {
        return this[rawDataSymbol].product.in_development;
    }
};
__decorate([
    Enumerable(false)
], EventSubExtensionBitsTransactionCreateEvent.prototype, "_client", void 0);
EventSubExtensionBitsTransactionCreateEvent = __decorate([
    rtfm('eventsub-base', 'EventSubExtensionBitsTransactionCreateEvent', 'id')
], EventSubExtensionBitsTransactionCreateEvent);
export { EventSubExtensionBitsTransactionCreateEvent };
