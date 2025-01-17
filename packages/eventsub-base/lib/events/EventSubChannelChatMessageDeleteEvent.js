"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelChatMessageDeleteEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a chat message being deleted in a channel.
 */
let EventSubChannelChatMessageDeleteEvent = class EventSubChannelChatMessageDeleteEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user whose chat message was deleted.
     */
    get userId() {
        return this[common_1.rawDataSymbol].target_user_id;
    }
    /**
     * The name of the user whose chat message was deleted.
     */
    get userName() {
        return this[common_1.rawDataSymbol].target_user_login;
    }
    /**
     * The display name of the user whose chat message was deleted.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].target_user_name;
    }
    /**
     * Gets more information about the user whose chat message was deleted.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].target_user_id));
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
     * The ID of the message that was deleted.
     */
    get messageId() {
        return this[common_1.rawDataSymbol].message_id;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelChatMessageDeleteEvent.prototype, "_client", void 0);
EventSubChannelChatMessageDeleteEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelChatMessageDeleteEvent', 'broadcasterId')
], EventSubChannelChatMessageDeleteEvent);
exports.EventSubChannelChatMessageDeleteEvent = EventSubChannelChatMessageDeleteEvent;
