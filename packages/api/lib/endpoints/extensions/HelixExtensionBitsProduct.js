"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixExtensionBitsProduct = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An extension's product to purchase with Bits.
 */
let HelixExtensionBitsProduct = class HelixExtensionBitsProduct extends common_1.DataObject {
    /**
     * The product's unique identifier.
     */
    get sku() {
        return this[common_1.rawDataSymbol].sku;
    }
    /**
     * The product's cost, in bits.
     */
    get cost() {
        return this[common_1.rawDataSymbol].cost.amount;
    }
    /**
     * The product's display name.
     */
    get displayName() {
        return this[common_1.rawDataSymbol].display_name;
    }
    /**
     * Whether the product is in development.
     */
    get inDevelopment() {
        return this[common_1.rawDataSymbol].in_development;
    }
    /**
     * Whether the product's purchases is broadcast to all users.
     */
    get isBroadcast() {
        return this[common_1.rawDataSymbol].is_broadcast;
    }
    /**
     * The product's expiration date. If the product never expires, this is null.
     */
    get expirationDate() {
        return (0, shared_utils_1.mapNullable)(this[common_1.rawDataSymbol].expiration, exp => new Date(exp));
    }
};
HelixExtensionBitsProduct = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixExtensionBitsProduct', 'sku')
], HelixExtensionBitsProduct);
exports.HelixExtensionBitsProduct = HelixExtensionBitsProduct;
