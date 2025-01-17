import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixEmote } from "./HelixEmote.mjs";
/**
 * A Twitch Channel emote.
 *
 * @inheritDoc
 */
let HelixChannelEmote = class HelixChannelEmote extends HelixEmote {
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The subscription tier necessary to unlock the emote, or null if the emote is not a subscription emote.
     */
    get tier() {
        return this[rawDataSymbol].tier || null;
    }
    /**
     * The type of the emote.
     *
     * There are many types of emotes that Twitch seems to arbitrarily assign. Do not rely on this value.
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
     * Gets all emotes from the emote's set.
     */
    async getAllEmotesFromSet() {
        return await this._client.chat.getEmotesFromSets([this[rawDataSymbol].emote_set_id]);
    }
};
__decorate([
    Enumerable(false)
], HelixChannelEmote.prototype, "_client", void 0);
HelixChannelEmote = __decorate([
    rtfm('api', 'HelixChannelEmote', 'id')
], HelixChannelEmote);
export { HelixChannelEmote };
