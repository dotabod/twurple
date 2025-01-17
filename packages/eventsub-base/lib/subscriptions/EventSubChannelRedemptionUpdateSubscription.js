"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelRedemptionUpdateSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelRedemptionUpdateEvent_1 = require("../events/EventSubChannelRedemptionUpdateEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelRedemptionUpdateSubscription = class EventSubChannelRedemptionUpdateSubscription extends EventSubSubscription_1.EventSubSubscription {
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
        return new EventSubChannelRedemptionUpdateEvent_1.EventSubChannelRedemptionUpdateEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._rewardId) {
            return await this._client._apiClient.eventSub.subscribeToChannelRedemptionUpdateEventsForReward(this._userId, this._rewardId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRedemptionUpdateEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRedemptionUpdateSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelRedemptionUpdateSubscription);
exports.EventSubChannelRedemptionUpdateSubscription = EventSubChannelRedemptionUpdateSubscription;
