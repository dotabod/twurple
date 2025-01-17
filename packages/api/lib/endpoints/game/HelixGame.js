"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixGame = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A game as displayed on Twitch.
 */
let HelixGame = class HelixGame extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the game.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The name of the game.
     */
    get name() {
        return this[common_1.rawDataSymbol].name;
    }
    /**
     * The URL of the box art of the game.
     */
    get boxArtUrl() {
        return this[common_1.rawDataSymbol].box_art_url;
    }
    /**
     * The IGDB ID of the game, or null if the game doesn't have an IGDB ID assigned at Twitch.
     */
    get igdbId() {
        return this[common_1.rawDataSymbol].igdb_id || null;
    }
    /**
     * Builds the URL of the box art of the game using the given dimensions.
     *
     * @param width The width of the box art.
     * @param height The height of the box art.
     */
    getBoxArtUrl(width, height) {
        return this[common_1.rawDataSymbol].box_art_url
            .replace('{width}', width.toString())
            .replace('{height}', height.toString());
    }
    /**
     * Gets streams that are currently playing the game.
     *
     * @param pagination
     * @expandParams
     */
    async getStreams(pagination) {
        return await this._client.streams.getStreams({ ...pagination, game: this[common_1.rawDataSymbol].id });
    }
    /**
     * Creates a paginator for streams that are currently playing the game.
     */
    getStreamsPaginated() {
        return this._client.streams.getStreamsPaginated({ game: this[common_1.rawDataSymbol].id });
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixGame.prototype, "_client", void 0);
HelixGame = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixGame', 'id')
], HelixGame);
exports.HelixGame = HelixGame;
