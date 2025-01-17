"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubExtensionBitsTransactionCreateSubscription = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubExtensionBitsTransactionCreateEvent_1 = require("../events/EventSubExtensionBitsTransactionCreateEvent");
const EventSubSubscription_1 = require("./EventSubSubscription");
/** @internal */
let EventSubExtensionBitsTransactionCreateSubscription = class EventSubExtensionBitsTransactionCreateSubscription extends EventSubSubscription_1.EventSubSubscription {
    constructor(handler, client, _clientId) {
        super(handler, client);
        this._clientId = _clientId;
        /** @protected */ this._cliName = 'transaction';
        this.authUserId = null;
    }
    get id() {
        return `extension.bits_transaction.create.${this._clientId}`;
    }
    transformData(data) {
        return new EventSubExtensionBitsTransactionCreateEvent_1.EventSubExtensionBitsTransactionCreateEvent(data, this._client._apiClient);
    }
    async _subscribe() {
        return await this._client._apiClient.eventSub.subscribeToExtensionBitsTransactionCreateEvents(this._clientId, await this._getTransportOptions());
    }
};
EventSubExtensionBitsTransactionCreateSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubSubscription')
], EventSubExtensionBitsTransactionCreateSubscription);
exports.EventSubExtensionBitsTransactionCreateSubscription = EventSubExtensionBitsTransactionCreateSubscription;
