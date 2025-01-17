import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a channel being followed.
 */
let EventSubChannelFollowEvent = class EventSubChannelFollowEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the following user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the following user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the following user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the following user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
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
     * The date when the user followed.
     */
    get followDate() {
        return new Date(this[rawDataSymbol].followed_at);
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelFollowEvent.prototype, "_client", void 0);
EventSubChannelFollowEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelFollowEvent', 'userId')
], EventSubChannelFollowEvent);
export { EventSubChannelFollowEvent };
