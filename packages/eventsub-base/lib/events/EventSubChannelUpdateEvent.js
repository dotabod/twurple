"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelUpdateEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a change in channel metadata.
 */
let EventSubChannelUpdateEvent = class EventSubChannelUpdateEvent extends common_1.DataObject {
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
     * The title of the stream.
     */
    get streamTitle() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The language of the stream.
     */
    get streamLanguage() {
        return this[common_1.rawDataSymbol].language;
    }
    /**
     * The ID of the game that is currently being played on the channel.
     */
    get categoryId() {
        return this[common_1.rawDataSymbol].category_id;
    }
    /**
     * The name of the game that is currently being played on the channel.
     */
    get categoryName() {
        return this[common_1.rawDataSymbol].category_name;
    }
    /**
     * Gets more information about the game that is currently being played on the channel.
     */
    async getGame() {
        return this[common_1.rawDataSymbol].category_id
            ? (0, common_1.checkRelationAssertion)(await this._client.games.getGameById(this[common_1.rawDataSymbol].category_id))
            : null;
    }
    /**
     * Whether the channel is flagged as suitable for mature audiences only.
     */
    get isMature() {
        return this[common_1.rawDataSymbol].is_mature;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelUpdateEvent.prototype, "_client", void 0);
EventSubChannelUpdateEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelUpdateEvent', 'broadcasterId')
], EventSubChannelUpdateEvent);
exports.EventSubChannelUpdateEvent = EventSubChannelUpdateEvent;
