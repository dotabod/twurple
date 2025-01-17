"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelBanEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a user being banned in a channel.
 */
let EventSubChannelBanEvent = class EventSubChannelBanEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the banned user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the banned user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the banned user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the banned user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster from whose chat the user was banned.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster from whose chat the user was banned.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster from whose chat the user was banned.
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
     * The ID of the moderator who issued the ban/timeout.
     */
    get moderatorId() {
        return this[common_1.rawDataSymbol].moderator_user_id;
    }
    /**
     * The name of the moderator who issued the ban/timeout.
     */
    get moderatorName() {
        return this[common_1.rawDataSymbol].moderator_user_login;
    }
    /**
     * The display name of the moderator who issued the ban/timeout.
     */
    get moderatorDisplayName() {
        return this[common_1.rawDataSymbol].moderator_user_name;
    }
    /**
     * Gets more information about the moderator.
     */
    async getModerator() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].moderator_user_id));
    }
    /**
     * The reason behind the ban.
     */
    get reason() {
        return this[common_1.rawDataSymbol].reason;
    }
    /**
     * The date and time when the user was banned or put in a timeout.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].banned_at);
    }
    /**
     * If it is a timeout, the date and time when the timeout will end. Will be null if permanent ban.
     */
    get endDate() {
        return (0, shared_utils_1.mapNullable)(this[common_1.rawDataSymbol].ends_at, v => new Date(v));
    }
    /**
     * Whether the ban is permanent.
     */
    get isPermanent() {
        return this[common_1.rawDataSymbol].is_permanent;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelBanEvent.prototype, "_client", void 0);
EventSubChannelBanEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelBanEvent', 'userId')
], EventSubChannelBanEvent);
exports.EventSubChannelBanEvent = EventSubChannelBanEvent;
