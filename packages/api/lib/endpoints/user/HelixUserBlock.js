"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixUserBlock = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An user blocked by a previously given user.
 */
let HelixUserBlock = class HelixUserBlock extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the blocked user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the blocked user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the blocked user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].display_name;
    }
    /**
     * Gets additional information about the blocked user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixUserBlock.prototype, "_client", void 0);
HelixUserBlock = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixUserBlock', 'userId')
], HelixUserBlock);
exports.HelixUserBlock = HelixUserBlock;
