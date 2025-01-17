"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelCharityDonationSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelCharityDonationEvent_1 = require("../events/EventSubChannelCharityDonationEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelCharityDonationSubscription = class EventSubChannelCharityDonationSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'charity-donation';
    }
    get id() {
        return `channel.charity_campaign.donate.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelCharityDonationEvent_1.EventSubChannelCharityDonationEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelCharityDonationEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelCharityDonationSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelCharityDonationSubscription);
exports.EventSubChannelCharityDonationSubscription = EventSubChannelCharityDonationSubscription;
