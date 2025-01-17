"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixEmoteFromSet = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixEmote_1 = require("./HelixEmote");
/**
 * A Twitch Channel emote.
 *
 * @inheritDoc
 */
let HelixEmoteFromSet = class HelixEmoteFromSet extends HelixEmote_1.HelixEmote {
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The type of the emote.
     *
     * Known values are: `subscriptions`, `bitstier`, `follower`, `rewards`, `globals`, `smilies`, `prime`, `limitedtime`.
     *
     * This list may be non-exhaustive.
     */
    get type() {
        return this[common_1.rawDataSymbol].emote_type;
    }
    /**
     * The ID of the emote set the emote is part of.
     */
    get emoteSetId() {
        return this[common_1.rawDataSymbol].emote_set_id;
    }
    /**
     * The ID of the user that owns the emote, or null if the emote is not owned by a user.
     */
    get ownerId() {
        switch (this[common_1.rawDataSymbol].owner_id) {
            case '0':
            case 'twitch': {
                return null;
            }
            default: {
                return this[common_1.rawDataSymbol].owner_id;
            }
        }
    }
    /**
     * Gets more information about the user that owns the emote, or null if the emote is not owned by a user.
     */
    async getOwner() {
        switch (this[common_1.rawDataSymbol].owner_id) {
            case '0':
            case 'twitch': {
                return null;
            }
            default: {
                return await this._client.users.getUserById(this[common_1.rawDataSymbol].owner_id);
            }
        }
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixEmoteFromSet.prototype, "_client", void 0);
HelixEmoteFromSet = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixEmoteFromSet', 'id')
], HelixEmoteFromSet);
exports.HelixEmoteFromSet = HelixEmoteFromSet;
