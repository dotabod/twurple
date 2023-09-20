"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelRedemptionAddEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing a Channel Points redemption.
 */
let EventSubChannelRedemptionAddEvent = class EventSubChannelRedemptionAddEvent extends common_1.DataObject {
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
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The ID of the user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The input text given by the user.
     *
     * If there is no input to be given, this is an empty string.
     */
    get input() {
        return this[common_1.rawDataSymbol].user_input;
    }
    /**
     * The status of the redemption.
     */
    get status() {
        return this[common_1.rawDataSymbol].status;
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
     * The cost of the reward that was redeemed.
     */
    get rewardCost() {
        return this[common_1.rawDataSymbol].reward.cost;
    }
    /**
     * The description of the reward that was redeemed.
     */
    get rewardPrompt() {
        return this[common_1.rawDataSymbol].reward.prompt;
    }
    /**
     * Gets more information about the reward that was redeemed.
     */
    async getReward() {
        return (0, common_1.checkRelationAssertion)(await this._client.channelPoints.getCustomRewardById(this[common_1.rawDataSymbol].broadcaster_user_id, this[common_1.rawDataSymbol].reward.id));
    }
    /**
     * The time when the user redeemed the reward.
     */
    get redemptionDate() {
        return new Date(this[common_1.rawDataSymbol].redeemed_at);
    }
    /**
     * Updates the redemption's status.
     *
     * @param newStatus The status the redemption should have.
     */
    async updateStatus(newStatus) {
        const result = await this._client.channelPoints.updateRedemptionStatusByIds(this[common_1.rawDataSymbol].broadcaster_user_id, this[common_1.rawDataSymbol].reward.id, [this[common_1.rawDataSymbol].id], newStatus);
        return result[0];
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelRedemptionAddEvent.prototype, "_client", void 0);
EventSubChannelRedemptionAddEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelRedemptionAddEvent', 'id')
], EventSubChannelRedemptionAddEvent);
exports.EventSubChannelRedemptionAddEvent = EventSubChannelRedemptionAddEvent;
