"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubUserUpdateSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubUserUpdateEvent_1 = require("../events/EventSubUserUpdateEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubUserUpdateSubscription = class EventSubUserUpdateSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'user.update';
    }
    get id() {
        return `user.update.${this._userId}`;
    }
    get authUserId() {
        return this._userId;
    }
    transformData(data) {
        return new EventSubUserUpdateEvent_1.EventSubUserUpdateEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToUserUpdateEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubUserUpdateSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubUserUpdateSubscription);
exports.EventSubUserUpdateSubscription = EventSubUserUpdateSubscription;
