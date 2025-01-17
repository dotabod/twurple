"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubUserAuthorizationGrantSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubUserAuthorizationGrantEvent_1 = require("../events/EventSubUserAuthorizationGrantEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubUserAuthorizationGrantSubscription = class EventSubUserAuthorizationGrantSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'grant';
        this.authUserId = null;
    }
    get id() {
        return `user.authorization.grant.${this._userId}`;
    }
    transformData(data) {
        return new EventSubUserAuthorizationGrantEvent_1.EventSubUserAuthorizationGrantEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToUserAuthorizationGrantEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubUserAuthorizationGrantSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubUserAuthorizationGrantSubscription);
exports.EventSubUserAuthorizationGrantSubscription = EventSubUserAuthorizationGrantSubscription;
