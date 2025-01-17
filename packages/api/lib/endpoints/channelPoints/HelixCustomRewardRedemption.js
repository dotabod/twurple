"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixCustomRewardRedemption = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A redemption of a custom Channel Points reward.
 */
let HelixCustomRewardRedemption = class HelixCustomRewardRedemption extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the redemption.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster where the reward was redeemed.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster where the reward was redeemed.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster where the reward was redeemed.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster where the reward was redeemed.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id));
    }
    /**
     * The ID of the user that redeemed the reward.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user that redeemed the reward.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that redeemed the reward.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user that redeemed the reward.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The text the user wrote when redeeming the reward.
     */
    get userInput() {
        return this[common_1.rawDataSymbol].user_input;
    }
    /**
     * Whether the redemption was fulfilled.
     */
    get isFulfilled() {
        return this[common_1.rawDataSymbol].status === 'FULFILLED';
    }
    /**
     * Whether the redemption was canceled.
     */
    get isCanceled() {
        return this[common_1.rawDataSymbol].status === 'CANCELED';
    }
    /**
     * The date and time when the reward was redeemed.
     */
    get redemptionDate() {
        return new Date(this[common_1.rawDataSymbol].redeemed_at);
    }
    /**
     * The ID of the reward that was redeemed.
     */
    get rewardId() {
        return this[common_1.rawDataSymbol].reward.id;
    }
    /**
     * The title of the reward that was redeemed.
     */
    get rewardTitle() {
        return this[common_1.rawDataSymbol].reward.title;
    }
    /**
     * The prompt of the reward that was redeemed.
     */
    get rewardPrompt() {
        return this[common_1.rawDataSymbol].reward.prompt;
    }
    /**
     * The cost of the reward that was redeemed.
     */
    get rewardCost() {
        return this[common_1.rawDataSymbol].reward.cost;
    }
    /**
     * Gets more information about the reward that was redeemed.
     */
    async getReward() {
        return (0, common_1.checkRelationAssertion)(await this._client.channelPoints.getCustomRewardById(this[common_1.rawDataSymbol].broadcaster_id, this[common_1.rawDataSymbol].reward.id));
    }
    /**
     * Updates the redemption's status.
     *
     * @param newStatus The status the redemption should have.
     */
    async updateStatus(newStatus) {
        const result = await this._client.channelPoints.updateRedemptionStatusByIds(this[common_1.rawDataSymbol].broadcaster_id, this[common_1.rawDataSymbol].reward.id, [this[common_1.rawDataSymbol].id], newStatus);
        return result[0];
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixCustomRewardRedemption.prototype, "_client", void 0);
HelixCustomRewardRedemption = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixCustomRewardRedemption', 'id')
], HelixCustomRewardRedemption);
exports.HelixCustomRewardRedemption = HelixCustomRewardRedemption;
