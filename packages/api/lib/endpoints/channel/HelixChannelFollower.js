"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixChannelFollower = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * Represents a user that follows a channel.
 */
let HelixChannelFollower = class HelixChannelFollower extends common_1.DataObject {
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
     * Gets additional information about the user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
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
], HelixChannelFollower.prototype, "_client", void 0);
HelixChannelFollower = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixChannelFollower', 'userId')
], HelixChannelFollower);
exports.HelixChannelFollower = HelixChannelFollower;
