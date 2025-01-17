import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelRewardEvent } from "../events/EventSubChannelRewardEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelRewardRemoveSubscription = class EventSubChannelRewardRemoveSubscription extends EventSubSubscription {
    constructor(handler, client, _userId, _rewardId) {
        super(handler, client);
        this._userId = _userId;
        this._rewardId = _rewardId;
        /** @protected */ this._cliName = 'remove-reward';
    }
    get id() {
        if (this._rewardId == null) {
            return `channel.channel_points_custom_reward.remove.${this._userId}`;
        }
        return `channel.channel_points_custom_reward.remove.${this._userId}.${this._rewardId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelRewardEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._rewardId) {
            return await this._client._apiClient.eventSub.subscribeToChannelRewardRemoveEventsForReward(this._userId, this._rewardId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRewardRemoveEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRewardRemoveSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelRewardRemoveSubscription);
export { EventSubChannelRewardRemoveSubscription };
