import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a broadcaster adding or removing a moderator in their channel.
 */
let EventSubChannelModeratorEvent = class EventSubChannelModeratorEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the broadcaster that added or removed a moderator.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster that added or removed a moderator.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster that added or removed a moderator.
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
     * The ID of the user that was added or removed as a moderator.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user that was added or removed as a moderator.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that was added or removed as a moderator.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelModeratorEvent.prototype, "_client", void 0);
EventSubChannelModeratorEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelModeratorEvent', 'userId')
], EventSubChannelModeratorEvent);
export { EventSubChannelModeratorEvent };
