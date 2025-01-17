import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a user being banned in a channel.
 */
let EventSubChannelBanEvent = class EventSubChannelBanEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the banned user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the banned user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the banned user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the banned user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The ID of the broadcaster from whose chat the user was banned.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster from whose chat the user was banned.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster from whose chat the user was banned.
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
     * The ID of the moderator who issued the ban/timeout.
     */
    get moderatorId() {
        return this[rawDataSymbol].moderator_user_id;
    }
    /**
     * The name of the moderator who issued the ban/timeout.
     */
    get moderatorName() {
        return this[rawDataSymbol].moderator_user_login;
    }
    /**
     * The display name of the moderator who issued the ban/timeout.
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
    /**
     * The reason behind the ban.
     */
    get reason() {
        return this[rawDataSymbol].reason;
    }
    /**
     * The date and time when the user was banned or put in a timeout.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].banned_at);
    }
    /**
     * If it is a timeout, the date and time when the timeout will end. Will be null if permanent ban.
     */
    get endDate() {
        return mapNullable(this[rawDataSymbol].ends_at, v => new Date(v));
    }
    /**
     * Whether the ban is permanent.
     */
    get isPermanent() {
        return this[rawDataSymbol].is_permanent;
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelBanEvent.prototype, "_client", void 0);
EventSubChannelBanEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelBanEvent', 'userId')
], EventSubChannelBanEvent);
export { EventSubChannelBanEvent };
