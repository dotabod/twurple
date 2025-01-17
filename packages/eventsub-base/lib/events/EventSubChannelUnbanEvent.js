"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelUnbanEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a user being unbanned in a channel.
 */
let EventSubChannelUnbanEvent = class EventSubChannelUnbanEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the unbanned user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the unbanned user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the unbanned user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the unbanned user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster from whose chat the user was unbanned.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster from whose chat the user was unbanned.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster from whose chat the user was unbanned.
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
     * The ID of the moderator who issued the unban.
     */
    get moderatorId() {
        return this[common_1.rawDataSymbol].moderator_user_id;
    }
    /**
     * The name of the moderator who issued the unban.
     */
    get moderatorName() {
        return this[common_1.rawDataSymbol].moderator_user_login;
    }
    /**
     * The display name of the moderator who issued the unban.
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
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelUnbanEvent.prototype, "_client", void 0);
EventSubChannelUnbanEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelUnbanEvent', 'userId')
], EventSubChannelUnbanEvent);
exports.EventSubChannelUnbanEvent = EventSubChannelUnbanEvent;
