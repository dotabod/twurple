"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelShoutoutCreateSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelShoutoutCreateEvent_1 = require("../events/EventSubChannelShoutoutCreateEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelShoutoutCreateSubscription = class EventSubChannelShoutoutCreateSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId, _moderatorId) {
        super(handler, client);
        this._userId = _userId;
        this._moderatorId = _moderatorId;
        /** @protected */ this._cliName = 'shoutout-create';
    }
    get id() {
        return `channel.shoutout.create.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelShoutoutCreateEvent_1.EventSubChannelShoutoutCreateEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.asUser(this._moderatorId, async (ctx) => await ctx.eventSub.subscribeToChannelShoutoutCreateEvents(this._userId, await this._getTransportOptions()));
    }
};
EventSubChannelShoutoutCreateSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelShoutoutCreateSubscription);
exports.EventSubChannelShoutoutCreateSubscription = EventSubChannelShoutoutCreateSubscription;
