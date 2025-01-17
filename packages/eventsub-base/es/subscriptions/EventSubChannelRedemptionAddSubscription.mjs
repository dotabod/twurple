import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelRedemptionAddEvent } from "../events/EventSubChannelRedemptionAddEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelRedemptionAddSubscription = class EventSubChannelRedemptionAddSubscription extends EventSubSubscription {
    constructor(handler, client, _userId, _rewardId) {
        super(handler, client);
        this._userId = _userId;
        this._rewardId = _rewardId;
        /** @protected */ this._cliName = 'add-redemption';
    }
    get id() {
        if (this._rewardId == null) {
            return `channel.channel_points_custom_reward_redemption.add.${this._userId}`;
        }
        return `channel.channel_points_custom_reward_redemption.add.${this._userId}.${this._rewardId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelRedemptionAddEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._rewardId) {
            return await this._client._apiClient.eventSub.subscribeToChannelRedemptionAddEventsForReward(this._userId, this._rewardId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRedemptionAddEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRedemptionAddSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelRedemptionAddSubscription);
export { EventSubChannelRedemptionAddSubscription };
