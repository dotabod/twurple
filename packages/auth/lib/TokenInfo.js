"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInfo = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * Information about an access token.
 */
let TokenInfo = class TokenInfo extends common_1.DataObject {
    /** @internal */
    constructor(data) {
        super(data);
        this._obtainmentDate = new Date();
    }
    /**
     * The client ID.
     */
    get clientId() {
        return this[common_1.rawDataSymbol].client_id;
    }
    /**
     * The ID of the authenticated user.
     */
    get userId() {
        var _a;
        return (_a = this[common_1.rawDataSymbol].user_id) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The name of the authenticated user.
     */
    get userName() {
        var _a;
        return (_a = this[common_1.rawDataSymbol].login) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The scopes for which the token is valid.
     */
    get scopes() {
        return this[common_1.rawDataSymbol].scopes;
    }
    /**
     * The time when the token will expire.
     *
     * If this returns null, it means that the token never expires (happens with some old client IDs).
     */
    get expiryDate() {
        return (0, shared_utils_1.mapNullable)(this[common_1.rawDataSymbol].expires_in, v => new Date(this._obtainmentDate.getTime() + v * 1000));
    }
};
TokenInfo = tslib_1.__decorate([
    (0, common_1.rtfm)('auth', 'TokenInfo', 'clientId')
], TokenInfo);
exports.TokenInfo = TokenInfo;
