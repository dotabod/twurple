"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelHypeTrainContribution = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
class EventSubChannelHypeTrainContribution extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The contributor's ID.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The contributor's user name.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The contributor's display name.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the contributor.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The type of the contribution.
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The contributor's total contribution.
     */
    get total() {
        return this[common_1.rawDataSymbol].total;
    }
}
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelHypeTrainContribution.prototype, "_client", void 0);
exports.EventSubChannelHypeTrainContribution = EventSubChannelHypeTrainContribution;
