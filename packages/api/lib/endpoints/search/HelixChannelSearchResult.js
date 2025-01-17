"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixChannelSearchResult = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * The result of a channel search.
 */
let HelixChannelSearchResult = class HelixChannelSearchResult extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The language of the channel.
     */
    get language() {
        return this[common_1.rawDataSymbol].broadcaster_language;
    }
    /**
     * The ID of the channel.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The name of the channel.
     */
    get name() {
        return this[common_1.rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the channel.
     */
    get displayName() {
        return this[common_1.rawDataSymbol].display_name;
    }
    /**
     * Gets additional information about the owner of the channel.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].id));
    }
    /**
     * The ID of the game currently played on the channel.
     */
    get gameId() {
        return this[common_1.rawDataSymbol].game_id;
    }
    /**
     * The name of the game currently played on the channel.
     */
    get gameName() {
        return this[common_1.rawDataSymbol].game_name;
    }
    /**
     * Gets information about the game that is being played on the stream.
     */
    async getGame() {
        return this[common_1.rawDataSymbol].game_id
            ? (0, common_1.checkRelationAssertion)(await this._client.games.getGameById(this[common_1.rawDataSymbol].game_id))
            : null;
    }
    /**
     * Whether the channel is currently live.
     */
    get isLive() {
        return this[common_1.rawDataSymbol].is_live;
    }
    /**
     * The tags applied to the channel.
     */
    get tags() {
        return this[common_1.rawDataSymbol].tags;
    }
    /**
     * The thumbnail URL of the stream.
     */
    get thumbnailUrl() {
        return this[common_1.rawDataSymbol].thumbnail_url;
    }
    /**
     * The start date of the stream. Returns `null` if the stream is not live.
     */
    get startDate() {
        return this[common_1.rawDataSymbol].is_live ? new Date(this[common_1.rawDataSymbol].started_at) : null;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixChannelSearchResult.prototype, "_client", void 0);
HelixChannelSearchResult = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixChannelSearchResult', 'id')
], HelixChannelSearchResult);
exports.HelixChannelSearchResult = HelixChannelSearchResult;
