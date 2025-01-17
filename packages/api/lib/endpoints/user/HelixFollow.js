"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixFollow = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A relation of a user following a broadcaster.
 */
let HelixFollow = class HelixFollow extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The user ID of the following user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].from_id;
    }
    /**
     * The name of the following user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].from_login;
    }
    /**
     * The display name of the following user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].from_name;
    }
    /**
     * Gets the data of the following user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].from_id));
    }
    /**
     * The user ID of the followed broadcaster.
     */
    get followedUserId() {
        return this[common_1.rawDataSymbol].to_id;
    }
    /**
     * The name of the followed user.
     */
    get followedUserName() {
        return this[common_1.rawDataSymbol].to_login;
    }
    /**
     * The display name of the followed user.
     */
    get followedUserDisplayName() {
        return this[common_1.rawDataSymbol].to_name;
    }
    /**
     * Gets the data of the followed broadcaster.
     */
    async getFollowedUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].to_id));
    }
    /**
     * The date when the user followed the broadcaster.
     */
    get followDate() {
        return new Date(this[common_1.rawDataSymbol].followed_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixFollow.prototype, "_client", void 0);
HelixFollow = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixFollow')
], HelixFollow);
exports.HelixFollow = HelixFollow;
