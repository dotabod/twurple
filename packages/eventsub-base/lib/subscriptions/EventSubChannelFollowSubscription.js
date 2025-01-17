"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelFollowSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelFollowEvent_1 = require("../events/EventSubChannelFollowEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelFollowSubscription = class EventSubChannelFollowSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId, _moderatorId) {
        super(handler, client);
        this._userId = _userId;
        this._moderatorId = _moderatorId;
        /** @protected */ this._cliName = 'follow';
    }
    get id() {
        return `channel.follow.${this._userId}.${this._moderatorId}`;
    }
    get authUserId() {
        return this._moderatorId;
    }
    transformData(data) {
        return new EventSubChannelFollowEvent_1.EventSubChannelFollowEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.asUser(this._moderatorId, async (ctx) => await ctx.eventSub.subscribeToChannelFollowEvents(this._userId, await this._getTransportOptions()));
    }
};
EventSubChannelFollowSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelFollowSubscription);
exports.EventSubChannelFollowSubscription = EventSubChannelFollowSubscription;
