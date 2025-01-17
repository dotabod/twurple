"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubUserUpdateEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing updating their account details.
 */
let EventSubUserUpdateEvent = class EventSubUserUpdateEvent extends common_1.DataObject {
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
     * The user's profile description.
     */
    get userDescription() {
        return this[common_1.rawDataSymbol].description;
    }
    /**
     * The user's email address.
     *
     * This is `null` if you are not authorized to read the email address,
     * i.e. you have never successfully requested the scope `user:read:email` from the user.
     */
    get userEmail() {
        var _a;
        return (_a = this[common_1.rawDataSymbol].email) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Whether the user's email address has been verified by Twitch.
     *
     * This is `null` if you are not authorized to read the email address,
     * i.e. you have never successfully requested the scope `user:read:email` from the user.
     */
    get userEmailIsVerified() {
        return this[common_1.rawDataSymbol].email ? this[common_1.rawDataSymbol].email_verified : null;
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
], EventSubUserUpdateEvent.prototype, "_client", void 0);
EventSubUserUpdateEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubUserUpdateEvent', 'userId')
], EventSubUserUpdateEvent);
exports.EventSubUserUpdateEvent = EventSubUserUpdateEvent;
