"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixExtensionTransaction = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A bits transaction made inside an extension.
 */
let HelixExtensionTransaction = class HelixExtensionTransaction extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the transaction.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The time when the transaction was made.
     */
    get transactionDate() {
        return new Date(this[common_1.rawDataSymbol].timestamp);
    }
    /**
     * The ID of the broadcaster that runs the extension on their channel.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * The display name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets information about the broadcaster that runs the extension on their channel.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id));
    }
    /**
     * The ID of the user that made the transaction.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user that made the transaction.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that made the transaction.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets information about the user that made the transaction.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The product type. Currently always BITS_IN_EXTENSION.
     */
    get productType() {
        return this[common_1.rawDataSymbol].product_type;
    }
    /**
     * The product SKU.
     */
    get productSku() {
        return this[common_1.rawDataSymbol].product_data.sku;
    }
    /**
     * The cost of the product, in bits.
     */
    get productCost() {
        return this[common_1.rawDataSymbol].product_data.cost.amount;
    }
    /**
     * The display name of the product.
     */
    get productDisplayName() {
        return this[common_1.rawDataSymbol].product_data.displayName;
    }
    /**
     * Whether the product is in development.
     */
    get productInDevelopment() {
        return this[common_1.rawDataSymbol].product_data.inDevelopment;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixExtensionTransaction.prototype, "_client", void 0);
HelixExtensionTransaction = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixExtensionTransaction', 'id')
], HelixExtensionTransaction);
exports.HelixExtensionTransaction = HelixExtensionTransaction;
