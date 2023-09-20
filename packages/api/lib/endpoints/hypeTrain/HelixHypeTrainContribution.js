"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixHypeTrainContribution = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A Hype Train contributor.
 */
let HelixHypeTrainContribution = class HelixHypeTrainContribution extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user contributing to the Hype Train.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user;
    }
    /**
     * Gets additional information about the user contributing to the Hype Train.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user));
    }
    /**
     * The Hype Train event type.
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The total contribution amount in subs or bits.
     */
    get total() {
        return this[common_1.rawDataSymbol].total;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixHypeTrainContribution.prototype, "_client", void 0);
HelixHypeTrainContribution = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixHypeTrainContribution', 'userId')
], HelixHypeTrainContribution);
exports.HelixHypeTrainContribution = HelixHypeTrainContribution;
