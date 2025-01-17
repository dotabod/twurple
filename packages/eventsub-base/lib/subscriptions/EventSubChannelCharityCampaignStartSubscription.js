"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelCharityCampaignStartSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelCharityCampaignStartEvent_1 = require("../events/EventSubChannelCharityCampaignStartEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelCharityCampaignStartSubscription = class EventSubChannelCharityCampaignStartSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'charity-start';
    }
    get id() {
        return `channel.charity_campaign.start.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelCharityCampaignStartEvent_1.EventSubChannelCharityCampaignStartEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelCharityCampaignStartEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelCharityCampaignStartSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelCharityCampaignStartSubscription);
exports.EventSubChannelCharityCampaignStartSubscription = EventSubChannelCharityCampaignStartSubscription;
