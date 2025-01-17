"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelCheerEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a user cheering bits.
 */
let EventSubChannelCheerEvent = class EventSubChannelCheerEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the cheering user, null if anonymous.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the cheering user, null if anonymous.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the cheering user, null if anonymous.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return await (0, shared_utils_1.mapNullable)(this[common_1.rawDataSymbol].user_id, async (v) => await this._client.users.getUserById(v));
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_user_id));
    }
    /**
     * Whether the cheering user chose to be anonymous.
     */
    get isAnonymous() {
        return this[common_1.rawDataSymbol].is_anonymous;
    }
    /**
     * The message sent with the cheer.
     */
    get message() {
        return this[common_1.rawDataSymbol].message;
    }
    /**
     * The amount of bits cheered.
     */
    get bits() {
        return this[common_1.rawDataSymbol].bits;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelCheerEvent.prototype, "_client", void 0);
EventSubChannelCheerEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelCheerEvent', 'userId')
], EventSubChannelCheerEvent);
exports.EventSubChannelCheerEvent = EventSubChannelCheerEvent;
