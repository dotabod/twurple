"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelRedemptionAddSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelRedemptionAddEvent_1 = require("../events/EventSubChannelRedemptionAddEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelRedemptionAddSubscription = class EventSubChannelRedemptionAddSubscription extends EventSubSubscription_1.EventSubSubscription {
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
        return new EventSubChannelRedemptionAddEvent_1.EventSubChannelRedemptionAddEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        if (this._rewardId) {
            return await this._client._apiClient.eventSub.subscribeToChannelRedemptionAddEventsForReward(this._userId, this._rewardId, await this._getTransportOptions());
        }
        return await this._client._apiClient.eventSub.subscribeToChannelRedemptionAddEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelRedemptionAddSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelRedemptionAddSubscription);
exports.EventSubChannelRedemptionAddSubscription = EventSubChannelRedemptionAddSubscription;
