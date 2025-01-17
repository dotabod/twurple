"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubStreamOnlineSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubStreamOnlineEvent_1 = require("../events/EventSubStreamOnlineEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubStreamOnlineSubscription = class EventSubStreamOnlineSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'streamup';
    }
    get id() {
        return `stream.online.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubStreamOnlineEvent_1.EventSubStreamOnlineEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToStreamOnlineEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubStreamOnlineSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubStreamOnlineSubscription);
exports.EventSubStreamOnlineSubscription = EventSubStreamOnlineSubscription;
