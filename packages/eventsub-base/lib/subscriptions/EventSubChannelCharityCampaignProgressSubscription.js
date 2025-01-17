"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelCharityCampaignProgressSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelCharityCampaignProgressEvent_1 = require("../events/EventSubChannelCharityCampaignProgressEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelCharityCampaignProgressSubscription = class EventSubChannelCharityCampaignProgressSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'charity-progress';
    }
    get id() {
        return `channel.charity_campaign.progress.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelCharityCampaignProgressEvent_1.EventSubChannelCharityCampaignProgressEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelCharityCampaignProgressEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelCharityCampaignProgressSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelCharityCampaignProgressSubscription);
exports.EventSubChannelCharityCampaignProgressSubscription = EventSubChannelCharityCampaignProgressSubscription;
