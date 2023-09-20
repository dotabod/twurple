"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const ircv3_1 = require("ircv3");
const ChatUser_1 = require("../ChatUser");
const emoteUtil_1 = require("../utils/emoteUtil");
/**
 * A regular chat message.
 */
let ChatMessage = class ChatMessage extends ircv3_1.MessageTypes.Commands.PrivateMessage {
    /**
     * The ID of the message.
     */
    get id() {
        return this._tags.get('id');
    }
    /**
     * The date the message was sent at.
     */
    get date() {
        const timestamp = this._tags.get('tmi-sent-ts');
        return new Date(Number(timestamp));
    }
    /**
     * Info about the user that send the message, like their user ID and their status in the current channel.
     */
    get userInfo() {
        return new ChatUser_1.ChatUser(this._prefix.nick, this._tags);
    }
    /**
     * The ID of the channel the message is in.
     */
    get channelId() {
        var _a;
        return (_a = this._tags.get('room-id')) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Whether the message is a cheer.
     */
    get isCheer() {
        return this._tags.has('bits');
    }
    /**
     * Whether the message represents a redemption of a custom channel points reward.
     */
    get isRedemption() {
        return Boolean(this._tags.get('custom-reward-id'));
    }
    /**
     * The ID of the redeemed reward, or `null` if the message does not represent a redemption.
     */
    get rewardId() {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return this._tags.get('custom-reward-id') || null;
    }
    /**
     * Whether the message is the first message of the chatter who sent it.
     */
    get isFirst() {
        return this._tags.get('first-msg') === '1';
    }
    /**
     * Whether the message is sent by a returning chatter.
     *
     * Twitch defines this as a new viewer who has chatted at least twice in the last 30 days.
     */
    get isReturningChatter() {
        return this._tags.get('returning-chatter') === '1';
    }
    /**
     * Whether the message is highlighted by using channel points.
     */
    get isHighlight() {
        return this._tags.get('msg-id') === 'highlighted-message';
    }
    /**
     * Whether the message is a reply to another message.
     */
    get isReply() {
        return this._tags.has('reply-parent-msg-id');
    }
    /**
     * The ID of the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageId() {
        var _a;
        return (_a = this._tags.get('reply-parent-msg-id')) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The text of the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageText() {
        var _a;
        return (_a = this._tags.get('reply-parent-msg-body')) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The ID of the user that wrote the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageUserId() {
        var _a;
        return (_a = this._tags.get('reply-parent-user-id')) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The name of the user that wrote the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageUserName() {
        var _a;
        return (_a = this._tags.get('reply-parent-user-login')) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The display name of the user that wrote the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageUserDisplayName() {
        var _a;
        return (_a = this._tags.get('reply-parent-display-name')) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The number of bits cheered with the message.
     */
    get bits() {
        var _a;
        return Number((_a = this._tags.get('bits')) !== null && _a !== void 0 ? _a : 0);
    }
    /**
     * The offsets of emote usages in the message.
     */
    get emoteOffsets() {
        return (0, emoteUtil_1.parseEmoteOffsets)(this._tags.get('emotes'));
    }
};
ChatMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('chat', 'ChatMessage', 'id')
], ChatMessage);
exports.ChatMessage = ChatMessage;