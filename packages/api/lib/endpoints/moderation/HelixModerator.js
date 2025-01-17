"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixModerator = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * Information about the moderator status of a user.
 */
let HelixModerator = class HelixModerator extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixModerator.prototype, "_client", void 0);
HelixModerator = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixModerator', 'userId')
], HelixModerator);
exports.HelixModerator = HelixModerator;
