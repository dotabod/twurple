"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixStream = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A Twitch stream.
 */
let HelixStream = class HelixStream extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The stream ID.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The user ID.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The user's name.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The user's display name.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets information about the user broadcasting the stream.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The game ID, or an empty string if the stream doesn't currently have a game.
     */
    get gameId() {
        return this[common_1.rawDataSymbol].game_id;
    }
    /**
     * The game name, or an empty string if the stream doesn't currently have a game.
     */
    get gameName() {
        return this[common_1.rawDataSymbol].game_name;
    }
    /**
     * Gets information about the game that is being played on the stream.
     *
     * Returns null if the stream doesn't currently have a game.
     */
    async getGame() {
        return this[common_1.rawDataSymbol].game_id
            ? (0, common_1.checkRelationAssertion)(await this._client.games.getGameById(this[common_1.rawDataSymbol].game_id))
            : null;
    }
    /**
     * The type of the stream.
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The title of the stream.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The number of viewers the stream currently has.
     */
    get viewers() {
        return this[common_1.rawDataSymbol].viewer_count;
    }
    /**
     * The time when the stream started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The language of the stream.
     */
    get language() {
        return this[common_1.rawDataSymbol].language;
    }
    /**
     * The URL of the thumbnail of the stream.
     *
     * This URL includes the placeholders `{width}` and `{height}`
     * which you must replace with the desired dimensions of the thumbnail (in pixels).
     *
     * You can also use {@link HelixStream#getThumbnailUrl} to do this replacement.
     */
    get thumbnailUrl() {
        return this[common_1.rawDataSymbol].thumbnail_url;
    }
    /**
     * Builds the thumbnail URL of the stream using the given dimensions.
     *
     * @param width The width of the thumbnail.
     * @param height The height of the thumbnail.
     */
    getThumbnailUrl(width, height) {
        return this[common_1.rawDataSymbol].thumbnail_url
            .replace('{width}', width.toString())
            .replace('{height}', height.toString());
    }
    /**
     * The tags applied to the stream.
     */
    get tags() {
        return this[common_1.rawDataSymbol].tags;
    }
    /**
     * Whether the stream is set to be targeted to mature audiences only.
     */
    get isMature() {
        return this[common_1.rawDataSymbol].is_mature;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixStream.prototype, "_client", void 0);
HelixStream = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixStream', 'id')
], HelixStream);
exports.HelixStream = HelixStream;
