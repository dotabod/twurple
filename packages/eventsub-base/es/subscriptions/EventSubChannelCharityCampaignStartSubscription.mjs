import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { EventSubChannelCharityCampaignStartEvent } from "../events/EventSubChannelCharityCampaignStartEvent.mjs";
import { EventSubSubscription } from "./EventSubSubscription.mjs";
/** @internal */
let EventSubChannelCharityCampaignStartSubscription = class EventSubChannelCharityCampaignStartSubscription extends EventSubSubscription {
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
        return new EventSubChannelCharityCampaignStartEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelCharityCampaignStartEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelCharityCampaignStartSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubChannelCharityCampaignStartSubscription);
export { EventSubChannelCharityCampaignStartSubscription };