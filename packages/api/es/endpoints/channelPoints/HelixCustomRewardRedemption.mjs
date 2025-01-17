import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A redemption of a custom Channel Points reward.
 */
let HelixCustomRewardRedemption = class HelixCustomRewardRedemption extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the redemption.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster where the reward was redeemed.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster where the reward was redeemed.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster where the reward was redeemed.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster where the reward was redeemed.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The ID of the user that redeemed the reward.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user that redeemed the reward.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user that redeemed the reward.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user that redeemed the reward.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The text the user wrote when redeeming the reward.
     */
    get userInput() {
        return this[rawDataSymbol].user_input;
    }
    /**
     * Whether the redemption was fulfilled.
     */
    get isFulfilled() {
        return this[rawDataSymbol].status === 'FULFILLED';
    }
    /**
     * Whether the redemption was canceled.
     */
    get isCanceled() {
        return this[rawDataSymbol].status === 'CANCELED';
    }
    /**
     * The date and time when the reward was redeemed.
     */
    get redemptionDate() {
        return new Date(this[rawDataSymbol].redeemed_at);
    }
    /**
     * The ID of the reward that was redeemed.
     */
    get rewardId() {
        return this[rawDataSymbol].reward.id;
    }
    /**
     * The title of the reward that was redeemed.
     */
    get rewardTitle() {
        return this[rawDataSymbol].reward.title;
    }
    /**
     * The prompt of the reward that was redeemed.
     */
    get rewardPrompt() {
        return this[rawDataSymbol].reward.prompt;
    }
    /**
     * The cost of the reward that was redeemed.
     */
    get rewardCost() {
        return this[rawDataSymbol].reward.cost;
    }
    /**
     * Gets more information about the reward that was redeemed.
     */
    async getReward() {
        return checkRelationAssertion(await this._client.channelPoints.getCustomRewardById(this[rawDataSymbol].broadcaster_id, this[rawDataSymbol].reward.id));
    }
    /**
     * Updates the redemption's status.
     *
     * @param newStatus The status the redemption should have.
     */
    async updateStatus(newStatus) {
        const result = await this._client.channelPoints.updateRedemptionStatusByIds(this[rawDataSymbol].broadcaster_id, this[rawDataSymbol].reward.id, [this[rawDataSymbol].id], newStatus);
        return result[0];
    }
};
__decorate([
    Enumerable(false)
], HelixCustomRewardRedemption.prototype, "_client", void 0);
HelixCustomRewardRedemption = __decorate([
    rtfm('api', 'HelixCustomRewardRedemption', 'id')
], HelixCustomRewardRedemption);
export { HelixCustomRewardRedemption };
