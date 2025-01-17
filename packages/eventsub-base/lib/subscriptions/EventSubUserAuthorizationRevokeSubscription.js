"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubUserAuthorizationRevokeSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubUserAuthorizationRevokeEvent_1 = require("../events/EventSubUserAuthorizationRevokeEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubUserAuthorizationRevokeSubscription = class EventSubUserAuthorizationRevokeSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _userId) {
        super(handler, client);
        this._userId = _userId;
        /** @protected */ this._cliName = 'revoke';
        this.authUserId = null;
    }
    get id() {
        return `user.authorization.revoke.${this._userId}`;
    }
    transformData(data) {
        return new EventSubUserAuthorizationRevokeEvent_1.EventSubUserAuthorizationRevokeEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToUserAuthorizationRevokeEvents(this._userId, await this._getTransportOptions());
    }
};
EventSubUserAuthorizationRevokeSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubUserAuthorizationRevokeSubscription);
exports.EventSubUserAuthorizationRevokeSubscription = EventSubUserAuthorizationRevokeSubscription;
