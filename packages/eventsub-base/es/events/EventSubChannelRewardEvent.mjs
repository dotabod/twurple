import { __decorate } from "tslib";
import { Enumerable, mapNullable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a broadcaster adding, updating or removing a Channel Points reward for their channel.
 */
let EventSubChannelRewardEvent = class EventSubChannelRewardEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the reward.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster the reward belongs to.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster the reward belongs to.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster the reward belongs to.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the reward's broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
    /**
     * Whether the reward is enabled (shown to users).
     */
    get isEnabled() {
        return this[rawDataSymbol].is_enabled;
    }
    /**
     * Whether the reward is paused. If true, users can't redeem it.
     */
    get isPaused() {
        return this[rawDataSymbol].is_paused;
    }
    /**
     * Whether the reward is currently in stock.
     */
    get isInStock() {
        return this[rawDataSymbol].is_in_stock;
    }
    /**
     * The title of the reward.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The channel points cost of the reward.
     */
    get cost() {
        return this[rawDataSymbol].cost;
    }
    /**
     * The prompt shown to users when redeeming the reward.
     */
    get prompt() {
        return this[rawDataSymbol].prompt;
    }
    /**
     * Whether users need to enter information when redeeming the reward.
     */
    get userInputRequired() {
        return this[rawDataSymbol].is_user_input_required;
    }
    /**
     * Whether redemptions should be automatically approved.
     */
    get autoApproved() {
        return this[rawDataSymbol].should_redemptions_skip_request_queue;
    }
    /**
     * The time when the cooldown expires.
     */
    get cooldownExpiryDate() {
        return mapNullable(this[rawDataSymbol].cooldown_expires_at, v => new Date(v));
    }
    /**
     * How often the reward was already redeemed this stream.
     *
     * Only available when the stream is live and `maxRedemptionsPerStream` is set. Otherwise, this is `null`.
     */
    get redemptionsThisStream() {
        return this[rawDataSymbol].redemptions_redeemed_current_stream;
    }
    /**
     * The maximum number of redemptions of the reward per stream. `null` means no limit.
     */
    get maxRedemptionsPerStream() {
        return this[rawDataSymbol].max_per_stream.is_enabled ? this[rawDataSymbol].max_per_stream.value : null;
    }
    /**
     * The maximum number of redemptions of the reward per stream for each user. `null` means no limit.
     */
    get maxRedemptionsPerUserPerStream() {
        return this[rawDataSymbol].max_per_user_per_stream.is_enabled
            ? this[rawDataSymbol].max_per_user_per_stream.value
            : null;
    }
    /**
     * The cooldown between two redemptions of the reward, in seconds. `null` means no cooldown.
     */
    get globalCooldown() {
        return this[rawDataSymbol].global_cooldown.is_enabled ? this[rawDataSymbol].global_cooldown.seconds : null;
    }
    /**
     * The background color of the reward.
     */
    get backgroundColor() {
        return this[rawDataSymbol].background_color;
    }
    /**
     * Gets the URL of the image of the reward in the given scale.
     *
     * @param scale The scale of the image.
     */
    getImageUrl(scale) {
        var _a, _b;
        const urlProp = `url_${scale}x`;
        return (_b = (_a = this[rawDataSymbol].image) === null || _a === void 0 ? void 0 : _a[urlProp]) !== null && _b !== void 0 ? _b : this[rawDataSymbol].default_image[urlProp];
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelRewardEvent.prototype, "_client", void 0);
EventSubChannelRewardEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelRewardEvent', 'id')
], EventSubChannelRewardEvent);
export { EventSubChannelRewardEvent };
