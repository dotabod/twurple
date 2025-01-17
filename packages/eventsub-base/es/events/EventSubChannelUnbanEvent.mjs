import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a user being unbanned in a channel.
 */
let EventSubChannelUnbanEvent = class EventSubChannelUnbanEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the unbanned user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the unbanned user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the unbanned user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the unbanned user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster from whose chat the user was unbanned.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster from whose chat the user was unbanned.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster from whose chat the user was unbanned.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The ID of the moderator who issued the unban.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_user_id;
    }
    /**
     * The name of the moderator who issued the unban.
     */
    get moderatorName() {
        return this[rawDataSymbol].moderator_user_login;
    }
    /**
     * The display name of the moderator who issued the unban.
     */
    get moderatorDisplayName() {
        return this[rawDataSymbol].moderator_user_name;
    }
    /**
     * Gets more information about the moderator.
     */
    async getModerator() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].moderator_user_id));
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelUnbanEvent.prototype, "_client", void 0);
EventSubChannelUnbanEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelUnbanEvent', 'userId')
], EventSubChannelUnbanEvent);
export { EventSubChannelUnbanEvent };
