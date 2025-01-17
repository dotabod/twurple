"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubExtensionBitsTransactionCreateEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a bits transaction in an extension.
 */
let EventSubExtensionBitsTransactionCreateEvent = class EventSubExtensionBitsTransactionCreateEvent extends common_1.DataObject {
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
     * The client ID of the extension.
     */
    get clientId() {
        return this[common_1.rawDataSymbol].extension_client_id;
    }
    /**
     * The ID of the subscribing user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the subscribing user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the subscribing user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the subscribing user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The name of the product the transaction is referring to.
     */
    get productName() {
        return this[common_1.rawDataSymbol].product.name;
    }
    /**
     * The SKU of the product the transaction is referring to.
     */
    get productSku() {
        return this[common_1.rawDataSymbol].product.sku;
    }
    /**
     * The cost of the product the transaction is referring to, in Bits.
     */
    get productCost() {
        return this[common_1.rawDataSymbol].product.bits;
    }
    /**
     * Whether the product the transaction is referring to is in development.
     */
    get productInDevelopment() {
        return this[common_1.rawDataSymbol].product.in_development;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubExtensionBitsTransactionCreateEvent.prototype, "_client", void 0);
EventSubExtensionBitsTransactionCreateEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubExtensionBitsTransactionCreateEvent', 'id')
], EventSubExtensionBitsTransactionCreateEvent);
exports.EventSubExtensionBitsTransactionCreateEvent = EventSubExtensionBitsTransactionCreateEvent;
