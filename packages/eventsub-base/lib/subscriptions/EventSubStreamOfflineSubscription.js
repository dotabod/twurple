"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubStreamOfflineSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubStreamOfflineEvent_1 = require("../events/EventSubStreamOfflineEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubStreamOfflineSubscription = class EventSubStreamOfflineSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'streamdown';
    }
    get id() {
        return `stream.offline.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubStreamOfflineEvent_1.EventSubStreamOfflineEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToStreamOfflineEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubStreamOfflineSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubStreamOfflineSubscription);
exports.EventSubStreamOfflineSubscription = EventSubStreamOfflineSubscription;
