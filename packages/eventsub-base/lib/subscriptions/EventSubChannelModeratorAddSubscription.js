"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelModeratorAddSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelModeratorEvent_1 = require("../events/EventSubChannelModeratorEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubChannelModeratorAddSubscription = class EventSubChannelModeratorAddSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'add-moderator';
    }
    get id() {
        return `channel.moderator.add.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubChannelModeratorEvent_1.EventSubChannelModeratorEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToChannelModeratorAddEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubChannelModeratorAddSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubChannelModeratorAddSubscription);
exports.EventSubChannelModeratorAddSubscription = EventSubChannelModeratorAddSubscription;
