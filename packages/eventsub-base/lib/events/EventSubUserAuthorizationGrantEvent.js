"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubUserAuthorizationGrantEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a user revoking authorization for an application.
 */
let EventSubUserAuthorizationGrantEvent = class EventSubUserAuthorizationGrantEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user who granted the authorization.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user who granted the authorization.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user who granted the authorization.
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
    /**
     * The Client ID of the application that the user granted authorization to.
     */
    get clientId() {
        return this[common_1.rawDataSymbol].client_id;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubUserAuthorizationGrantEvent.prototype, "_client", void 0);
EventSubUserAuthorizationGrantEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubUserAuthorizationGrantEvent', 'userId')
], EventSubUserAuthorizationGrantEvent);
exports.EventSubUserAuthorizationGrantEvent = EventSubUserAuthorizationGrantEvent;
