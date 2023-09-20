import { MessageTypes } from 'ircv3';
import { ChatUser } from '../ChatUser';
/**
 * A regular chat message.
 */
export declare class ChatMessage extends MessageTypes.Commands.PrivateMessage {
    /**
     * The ID of the message.
     */
    get id(): string;
    /**
     * The date the message was sent at.
     */
    get date(): Date;
    /**
     * Info about the user that send the message, like their user ID and their status in the current channel.
     */
    get userInfo(): ChatUser;
    /**
     * The ID of the channel the message is in.
     */
    get channelId(): string | null;
    /**
     * Whether the message is a cheer.
     */
    get isCheer(): boolean;
    /**
     * Whether the message represents a redemption of a custom channel points reward.
     */
    get isRedemption(): boolean;
    /**
     * The ID of the redeemed reward, or `null` if the message does not represent a redemption.
     */
    get rewardId(): string | null;
    /**
     * Whether the message is the first message of the chatter who sent it.
     */
    get isFirst(): boolean;
    /**
     * Whether the message is sent by a returning chatter.
     *
     * Twitch defines this as a new viewer who has chatted at least twice in the last 30 days.
     */
    get isReturningChatter(): boolean;
    /**
     * Whether the message is highlighted by using channel points.
     */
    get isHighlight(): boolean;
    /**
     * Whether the message is a reply to another message.
     */
    get isReply(): boolean;
    /**
     * The ID of the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageId(): string | null;
    /**
     * The text of the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageText(): string | null;
    /**
     * The ID of the user that wrote the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageUserId(): string | null;
    /**
     * The name of the user that wrote the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageUserName(): string | null;
    /**
     * The display name of the user that wrote the message that this message is a reply to, or `null` if it's not a reply.
     */
    get parentMessageUserDisplayName(): string | null;
    /**
     * The number of bits cheered with the message.
     */
    get bits(): number;
    /**
     * The offsets of emote usages in the message.
     */
    get emoteOffsets(): Map<string, string[]>;
}
