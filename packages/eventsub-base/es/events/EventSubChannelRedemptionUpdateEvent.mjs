import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An EventSub event representing a Channel Points redemption being updated.
 */
let EventSubChannelRedemptionUpdateEvent = class EventSubChannelRedemptionUpdateEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the redemption being updated.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The ID of the user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The input text given by the user.
     *
     * If there is no input to be given, this is an empty string.
     */
    get input() {
        return this[rawDataSymbol].user_input;
    }
    /**
     * The status of the redemption.
     */
    get status() {
        return this[rawDataSymbol].status;
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
     * The cost of the reward that was redeemed.
     */
    get rewardCost() {
        return this[rawDataSymbol].reward.cost;
    }
    /**
     * The description of the reward that was redeemed.
     */
    get rewardPrompt() {
        return this[rawDataSymbol].reward.prompt;
    }
    /**
     * The time when the user redeemed the reward.
     */
    get redemptionDate() {
        return new Date(this[rawDataSymbol].redeemed_at);
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelRedemptionUpdateEvent.prototype, "_client", void 0);
EventSubChannelRedemptionUpdateEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelRedemptionUpdateEvent', 'id')
], EventSubChannelRedemptionUpdateEvent);
export { EventSubChannelRedemptionUpdateEvent };
