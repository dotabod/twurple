import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixEmote } from "./HelixEmote.mjs";
/**
 * A Twitch Channel emote.
 *
 * @inheritDoc
 */
let HelixEmoteFromSet = class HelixEmoteFromSet extends HelixEmote {
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
        return this[rawDataSymbol].emote_type;
    }
    /**
     * The ID of the emote set the emote is part of.
     */
    get emoteSetId() {
        return this[rawDataSymbol].emote_set_id;
    }
    /**
     * The ID of the user that owns the emote, or null if the emote is not owned by a user.
     */
    get ownerId() {
        switch (this[rawDataSymbol].owner_id) {
            case '0':
            case 'twitch': {
                return null;
            }
            default: {
                return this[rawDataSymbol].owner_id;
            }
        }
    }
    /**
     * Gets more information about the user that owns the emote, or null if the emote is not owned by a user.
     */
    async getOwner() {
        switch (this[rawDataSymbol].owner_id) {
            case '0':
            case 'twitch': {
                return null;
            }
            default: {
                return await this._client.users.getUserById(this[rawDataSymbol].owner_id);
            }
        }
    }
};
__decorate([
    Enumerable(false)
], HelixEmoteFromSet.prototype, "_client", void 0);
HelixEmoteFromSet = __decorate([
    rtfm('api', 'HelixEmoteFromSet', 'id')
], HelixEmoteFromSet);
export { HelixEmoteFromSet };
