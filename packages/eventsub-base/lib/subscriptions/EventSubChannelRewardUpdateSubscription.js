"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelRewardUpdateSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelRewardEvent_1 = require("../events/EventSubChannelRewardEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelRewardUpdateSubscription = class EventSubChannelRewardUpdateSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId, _rewardId) {
        super(handler, client);
        this._userId = _userId;
        this._rewardId = _rewardId;
        /** @protected */ this._cliName = 'update-reward';
    }
    get id() {
        if (this._rewardId == null) {
            return `channel.channel_points_custom_reward.update.${this._userId}`;
        }
        return `channel.channel_points_custom_reward.update.${this._userId}.${this._rewardId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelRewardEvent_1.EventSubChannelRewardEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._rewardId) {
            return await this._client._apiClient.eventSub.subscribeToChannelRewardUpdateEventsForReward(this._userId, this._rewardId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRewardUpdateEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRewardUpdateSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelRewardUpdateSubscription);
exports.EventSubChannelRewardUpdateSubscription = EventSubChannelRewardUpdateSubscription;
