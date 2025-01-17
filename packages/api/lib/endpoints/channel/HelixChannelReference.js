"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixChannelReference = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A reference to a Twitch channel.
 */
let HelixChannelReference = class HelixChannelReference extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the channel.
     */
    get id() {
        return this[common_1.rawDataSymbol].broadcaster_id;
    }
    /**
     * The display name of the channel.
     */
    get displayName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the channel.
     */
    async getChannel() {
        return (0, common_1.checkRelationAssertion)(await this._client.channels.getChannelInfoById(this[common_1.rawDataSymbol].broadcaster_id));
    }
    /**
     * Gets more information about the broadcaster of the channel.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id));
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
     * The title of the channel.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixChannelReference.prototype, "_client", void 0);
HelixChannelReference = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixChannelReference', 'id')
], HelixChannelReference);
exports.HelixChannelReference = HelixChannelReference;
