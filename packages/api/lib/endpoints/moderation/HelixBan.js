"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixBan = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixBanUser_1 = require("./HelixBanUser");
/**
 * Information about the ban of a user.
 *
 * @inheritDoc
 */
let HelixBan = class HelixBan extends HelixBanUser_1.HelixBanUser {
    /** @internal */
    constructor(data, client) {
        super(data, data.expires_at || null, client);
    }
    /**
     * The name of the user that was banned or put in a timeout.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that was banned or put in a timeout.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * The name of the moderator that banned or put the user in the timeout.
     */
    get moderatorName() {
        return this[common_1.rawDataSymbol].moderator_login;
    }
    /**
     * The display name of the moderator that banned or put the user in the timeout.
     */
    get moderatorDisplayName() {
        return this[common_1.rawDataSymbol].moderator_name;
    }
    /**
     * The reason why the user was banned or timed out. Returns `null` if no reason was given.
     */
    get reason() {
        return this[common_1.rawDataSymbol].reason || null;
    }
};
HelixBan = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixBan', 'userId')
], HelixBan);
exports.HelixBan = HelixBan;
