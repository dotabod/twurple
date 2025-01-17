import { __decorate } from "tslib";
import { mapNullable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * Information about an access token.
 */
let TokenInfo = class TokenInfo extends DataObject {
    /** @internal */
    constructor(data) {
        super(data);
        this._obtainmentDate = new Date();
    }
    /**
     * The client ID.
     */
    get clientId() {
        return this[rawDataSymbol].client_id;
    }
    /**
     * The ID of the authenticated user.
     */
    get userId() {
        var _a;
        return (_a = this[rawDataSymbol].user_id) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The name of the authenticated user.
     */
    get userName() {
        var _a;
        return (_a = this[rawDataSymbol].login) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The scopes for which the token is valid.
     */
    get scopes() {
        return this[rawDataSymbol].scopes;
    }
    /**
     * The time when the token will expire.
     *
     * If this returns null, it means that the token never expires (happens with some old client IDs).
     */
    get expiryDate() {
        return mapNullable(this[rawDataSymbol].expires_in, v => new Date(this._obtainmentDate.getTime() + v * 1000));
    }
};
TokenInfo = __decorate([
    rtfm('auth', 'TokenInfo', 'clientId')
], TokenInfo);
export { TokenInfo };
