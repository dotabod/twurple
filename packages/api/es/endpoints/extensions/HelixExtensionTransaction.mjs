import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A bits transaction made inside an extension.
 */
let HelixExtensionTransaction = class HelixExtensionTransaction extends DataObject {
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
     * The time when the transaction was made.
     */
    get transactionDate() {
        return new Date(this[rawDataSymbol].timestamp);
    }
    /**
     * The ID of the broadcaster that runs the extension on their channel.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * The display name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets information about the broadcaster that runs the extension on their channel.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The ID of the user that made the transaction.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user that made the transaction.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that made the transaction.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets information about the user that made the transaction.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The product type. Currently always BITS_IN_EXTENSION.
     */
    get productType() {
        return this[rawDataSymbol].product_type;
    }
    /**
     * The product SKU.
     */
    get productSku() {
        return this[rawDataSymbol].product_data.sku;
    }
    /**
     * The cost of the product, in bits.
     */
    get productCost() {
        return this[rawDataSymbol].product_data.cost.amount;
    }
    /**
     * The display name of the product.
     */
    get productDisplayName() {
        return this[rawDataSymbol].product_data.displayName;
    }
    /**
     * Whether the product is in development.
     */
    get productInDevelopment() {
        return this[rawDataSymbol].product_data.inDevelopment;
    }
};
__decorate([
    Enumerable(false)
], HelixExtensionTransaction.prototype, "_client", void 0);
HelixExtensionTransaction = __decorate([
    rtfm('api', 'HelixExtensionTransaction', 'id')
], HelixExtensionTransaction);
export { HelixExtensionTransaction };
