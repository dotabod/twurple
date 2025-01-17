"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixDropsEntitlement = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An entitlement for a drop.
 */
let HelixDropsEntitlement = class HelixDropsEntitlement extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the entitlement.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The ID of the reward.
     */
    get rewardId() {
        return this[common_1.rawDataSymbol].benefit_id;
    }
    /**
     * The date when the entitlement was granted.
     */
    get grantDate() {
        return new Date(this[common_1.rawDataSymbol].timestamp);
    }
    /**
     * The ID of the entitled user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * Gets more information about the entitled user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The ID of the game the entitlement was granted for.
     */
    get gameId() {
        return this[common_1.rawDataSymbol].game_id;
    }
    /**
     * Gets more information about the game the entitlement was granted for.
     */
    async getGame() {
        return (0, common_1.checkRelationAssertion)(await this._client.games.getGameById(this[common_1.rawDataSymbol].game_id));
    }
    /**
     * The fulfillment status of the entitlement.
     */
    get fulfillmentStatus() {
        return this[common_1.rawDataSymbol].fulfillment_status;
    }
    /**
     * The date when the entitlement was last updated.
     */
    get updateDate() {
        return new Date(this[common_1.rawDataSymbol].last_updated);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixDropsEntitlement.prototype, "_client", void 0);
HelixDropsEntitlement = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixDropsEntitlement')
], HelixDropsEntitlement);
exports.HelixDropsEntitlement = HelixDropsEntitlement;
