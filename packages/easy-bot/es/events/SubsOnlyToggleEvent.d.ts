import { type HelixUser } from '@twurple/api';
/**
 * An event representing subscriber-only mode being toggled in a channel.
 *
 * @meta category events
 */
export declare class SubsOnlyToggleEvent {
    /**
     * The name of the broadcaster.
     */
    get broadcasterName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * Whether subscriber-only mode was enabled.
     *
     * `true` means it was enabled, `false` means it was disabled.
     */
    get enabled(): boolean;
    /**
     * Enables subscriber-only mode in the channel.
     */
    enable(): Promise<void>;
    /**
     * Disables subscriber-only mode in the channel.
     */
    disable(): Promise<void>;
}
