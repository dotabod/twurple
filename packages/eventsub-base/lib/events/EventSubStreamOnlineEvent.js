"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubStreamOnlineEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a stream going live.
 */
let EventSubStreamOnlineEvent = class EventSubStreamOnlineEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
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
     * Gets more information about the stream.
     *
     * This may sometimes return null, as the Helix API might be behind due to caching on Twitch's side.
     */
    async getStream() {
        return await this._client.streams.getStreamByUserId(this[common_1.rawDataSymbol].broadcaster_user_id);
    }
    /**
     * The ID of the stream going live.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The type of the stream going live.
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The date and time when the stream was started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubStreamOnlineEvent.prototype, "_client", void 0);
EventSubStreamOnlineEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubStreamOnlineEvent', 'broadcasterId')
], EventSubStreamOnlineEvent);
exports.EventSubStreamOnlineEvent = EventSubStreamOnlineEvent;
