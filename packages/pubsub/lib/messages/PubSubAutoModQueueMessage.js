"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubAutoModQueueMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a message being processed in the AutoMod queue.
 */
let PubSubAutoModQueueMessage = class PubSubAutoModQueueMessage extends common_1.DataObject {
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
        return this[common_1.rawDataSymbol].data.message.id;
    }
    /**
     * The content of the message.
     */
    get messageContent() {
        return this[common_1.rawDataSymbol].data.message.content.text;
    }
    /**
     * The fragments of the message that were found to be against the moderation level of the channel.
     */
    get foundMessageFragments() {
        return this[common_1.rawDataSymbol].data.message.content.fragments;
    }
    /**
     * The ID of the user that sent the message.
     */
    get senderId() {
        return this[common_1.rawDataSymbol].data.message.sender.user_id;
    }
    /**
     * The name of the user that sent the message.
     */
    get senderName() {
        return this[common_1.rawDataSymbol].data.message.sender.login;
    }
    /**
     * The display name of the user that sent the message.
     */
    get senderDisplayName() {
        return this[common_1.rawDataSymbol].data.message.sender.display_name;
    }
    /**
     * The chat color of the user that sent the message.
     */
    get senderColor() {
        return this[common_1.rawDataSymbol].data.message.sender.chat_color;
    }
    /**
     * The date when the message was sent.
     */
    get sendDate() {
        return new Date(this[common_1.rawDataSymbol].data.message.sent_at);
    }
    /**
     * The classification of the message content.
     */
    get contentClassification() {
        return this[common_1.rawDataSymbol].data.content_classification;
    }
    /**
     * The status of the queue entry.
     */
    get status() {
        return this[common_1.rawDataSymbol].data.status;
    }
    /**
     * The ID of the user that resolved the queue entry, or null if it was not resolved or timed out.
     */
    get resolverId() {
        return this[common_1.rawDataSymbol].data.resolver_id || null;
    }
    /**
     * The name of the user that resolved the queue entry, or null if it was not resolved or timed out.
     */
    get resolverName() {
        return this[common_1.rawDataSymbol].data.resolver_login || null;
    }
};
PubSubAutoModQueueMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubAutoModQueueMessage', 'messageId')
], PubSubAutoModQueueMessage);
exports.PubSubAutoModQueueMessage = PubSubAutoModQueueMessage;
