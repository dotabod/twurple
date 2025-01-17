"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelCharityCampaignStopSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelCharityCampaignStopEvent_1 = require("../events/EventSubChannelCharityCampaignStopEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelCharityCampaignStopSubscription = class EventSubChannelCharityCampaignStopSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'charity-stop';
    }
    get id() {
        return `channel.charity_campaign.stop.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelCharityCampaignStopEvent_1.EventSubChannelCharityCampaignStopEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelCharityCampaignStopEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelCharityCampaignStopSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelCharityCampaignStopSubscription);
exports.EventSubChannelCharityCampaignStopSubscription = EventSubChannelCharityCampaignStopSubscription;
