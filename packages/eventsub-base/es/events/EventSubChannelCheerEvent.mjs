import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a user cheering bits.
 */
let EventSubChannelCheerEvent = class EventSubChannelCheerEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the cheering user, null if anonymous.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the cheering user, null if anonymous.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the cheering user, null if anonymous.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return await mapNullable(this[rawDataSymbol].user_id, async (v) => await this._client.users.getUserById(v));
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
     * Whether the cheering user chose to be anonymous.
     */
    get isAnonymous() {
        return this[rawDataSymbol].is_anonymous;
    }
    /**
     * The message sent with the cheer.
     */
    get message() {
        return this[rawDataSymbol].message;
    }
    /**
     * The amount of bits cheered.
     */
    get bits() {
        return this[rawDataSymbol].bits;
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelCheerEvent.prototype, "_client", void 0);
EventSubChannelCheerEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelCheerEvent', 'userId')
], EventSubChannelCheerEvent);
export { EventSubChannelCheerEvent };
