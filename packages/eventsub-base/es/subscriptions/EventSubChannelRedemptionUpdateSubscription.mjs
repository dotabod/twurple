import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelRedemptionUpdateEvent } from "../events/EventSubChannelRedemptionUpdateEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelRedemptionUpdateSubscription = class EventSubChannelRedemptionUpdateSubscription extends EventSubSubscription {
    constructor(handler, client, _userId, _rewardId) {
        super(handler, client);
        this._userId = _userId;
        this._rewardId = _rewardId;
        /** @protected */ this._cliName = 'update-redemption';
    }
    get id() {
        if (this._rewardId == null) {
            return `channel.channel_points_custom_reward_redemption.update.${this._userId}`;
        }
        return `channel.channel_points_custom_reward_redemption.update.${this._userId}.${this._rewardId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelRedemptionUpdateEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._rewardId) {
            return await this._client._apiClient.eventSub.subscribeToChannelRedemptionUpdateEventsForReward(this._userId, this._rewardId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRedemptionUpdateEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRedemptionUpdateSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelRedemptionUpdateSubscription);
export { EventSubChannelRedemptionUpdateSubscription };
