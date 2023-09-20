"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubRedemptionMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a user redeeming a custom channel points reward.
 */
let PubSubRedemptionMessage = class PubSubRedemptionMessage extends common_1.DataObject {
    /**
     * The internal redemption ID.
     */
    get id() {
        return this[common_1.rawDataSymbol].data.redemption.id;
    }
    /**
     * The ID of the user that redeemed the reward.
     */
    get userId() {
        return this[common_1.rawDataSymbol].data.redemption.user.id;
    }
    /**
     * The name of the user that redeemed the reward.
     */
    get userName() {
        return this[common_1.rawDataSymbol].data.redemption.user.login;
    }
    /**
     * The display name of the user that redeemed the reward.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].data.redemption.user.display_name;
    }
    /**
     * The ID of the channel where the reward was redeemed.
     */
    get channelId() {
        return this[common_1.rawDataSymbol].data.redemption.channel_id;
    }
    /**
     * The date when the reward was redeemed.
     */
    get redemptionDate() {
        return new Date(this[common_1.rawDataSymbol].data.redemption.redeemed_at);
    }
    /**
     * The ID of the reward.
     */
    get rewardId() {
        return this[common_1.rawDataSymbol].data.redemption.reward.id;
    }
    /**
     * The title of the reward.
     */
    get rewardTitle() {
        return this[common_1.rawDataSymbol].data.redemption.reward.title;
    }
    /**
     * The prompt of the reward.
     */
    get rewardPrompt() {
        return this[common_1.rawDataSymbol].data.redemption.reward.prompt;
    }
    /**
     * The cost of the reward, in channel points.
     */
    get rewardCost() {
        return this[common_1.rawDataSymbol].data.redemption.reward.cost;
    }
    /**
     * Whether the reward gets added to the request queue.
     */
    get rewardIsQueued() {
        return !this[common_1.rawDataSymbol].data.redemption.reward.should_redemptions_skip_request_queue;
    }
    /**
     * The image set associated with the reward.
     */
    get rewardImage() {
        return this[common_1.rawDataSymbol].data.redemption.reward.image;
    }
    /**
     * The default image set associated with the reward.
     */
    get defaultImage() {
        return this[common_1.rawDataSymbol].data.redemption.reward.default_image;
    }
    /**
     * The full message that was sent with the notification.
     */
    get message() {
        return this[common_1.rawDataSymbol].data.redemption.user_input;
    }
    /**
     * The status of the redemption.
     */
    get status() {
        return this[common_1.rawDataSymbol].data.redemption.status;
    }
};
PubSubRedemptionMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubRedemptionMessage', 'id')
], PubSubRedemptionMessage);
exports.PubSubRedemptionMessage = PubSubRedemptionMessage;
