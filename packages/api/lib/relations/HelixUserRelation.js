"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixUserRelation = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A relation of anything with a user.
 */
let HelixUserRelation = class HelixUserRelation extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user.
     */
    get id() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user.
     */
    get name() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user.
     */
    get displayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets additional information about the user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixUserRelation.prototype, "_client", void 0);
HelixUserRelation = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixUserRelation', 'id')
], HelixUserRelation);
exports.HelixUserRelation = HelixUserRelation;
