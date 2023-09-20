"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubUserModerationNotificationMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a moderation action on your message..
 */
let PubSubUserModerationNotificationMessage = class PubSubUserModerationNotificationMessage extends common_1.DataObject {
    /** @internal */
    constructor(data, _channelId) {
        super(data);
        this._channelId = _channelId;
    }
    /**
     * The ID of the channel where the message was posted.
     */
    get channelId() {
        return this._channelId;
    }
    /**
     * The ID of the message.
     */
    get messageId() {
        return this[common_1.rawDataSymbol].data.message_id;
    }
    /**
     * The status of the queue entry.
     */
    get status() {
        return this[common_1.rawDataSymbol].data.status;
    }
};
PubSubUserModerationNotificationMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubUserModerationNotificationMessage', 'messageId')
], PubSubUserModerationNotificationMessage);
exports.PubSubUserModerationNotificationMessage = PubSubUserModerationNotificationMessage;
