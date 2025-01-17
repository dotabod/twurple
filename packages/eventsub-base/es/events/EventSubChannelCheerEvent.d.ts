import type { HelixUser } from '@twurple/api';
import { DataObject } from '@twurple/common';
import { type EventSubChannelCheerEventData } from './EventSubChannelCheerEvent.external';
/**
 * An EventSub event representing a user cheering bits.
 */
export declare class EventSubChannelCheerEvent extends DataObject<EventSubChannelCheerEventData> {
    /**
     * The ID of the cheering user, null if anonymous.
     */
    get userId(): string | null;
    /**
     * The name of the cheering user, null if anonymous.
     */
    get userName(): string | null;
    /**
     * The display name of the cheering user, null if anonymous.
     */
    get userDisplayName(): string | null;
    /**
     * Gets more information about the user.
     */
    getUser(): Promise<HelixUser | null>;
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * Whether the cheering user chose to be anonymous.
     */
    get isAnonymous(): boolean;
    /**
     * The message sent with the cheer.
     */
    get message(): string;
    /**
     * The amount of bits cheered.
     */
    get bits(): number;
}
