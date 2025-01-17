"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubDropEntitlementGrantEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a drop entitlement grant.
 */
let EventSubDropEntitlementGrantEvent = class EventSubDropEntitlementGrantEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the organization.
     */
    get organizationId() {
        return this[common_1.rawDataSymbol].organization_id;
    }
    /**
     * The ID of the category/game.
     */
    get categoryId() {
        return this[common_1.rawDataSymbol].category_id;
    }
    /**
     * The name of the category/game.
     */
    get categoryName() {
        return this[common_1.rawDataSymbol].category_name;
    }
    /**
     * Gets more information about the category/game.
     */
    async getCategory() {
        return (0, common_1.checkRelationAssertion)(await this._client.games.getGameById(this[common_1.rawDataSymbol].category_id));
    }
    /**
     * The ID of the campaign.
     */
    get campaignId() {
        return this[common_1.rawDataSymbol].campaign_id;
    }
    /**
     * The ID of the entitled user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the entitled user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the entitled user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the entitled user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The ID of the entitlement.
     */
    get entitlementId() {
        return this[common_1.rawDataSymbol].entitlement_id;
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
        return new Date(this[common_1.rawDataSymbol].created_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubDropEntitlementGrantEvent.prototype, "_client", void 0);
EventSubDropEntitlementGrantEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubDropEntitlementGrantEvent', 'entitlementId')
], EventSubDropEntitlementGrantEvent);
exports.EventSubDropEntitlementGrantEvent = EventSubDropEntitlementGrantEvent;
