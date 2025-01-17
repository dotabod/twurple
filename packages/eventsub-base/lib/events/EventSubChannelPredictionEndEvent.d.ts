import type { HelixUser } from '@twurple/api';
import { DataObject } from '@twurple/common';
import { EventSubChannelPredictionOutcome } from './common/EventSubChannelPredictionOutcome';
import { type EventSubChannelPredictionEndEventData, type EventSubChannelPredictionEndStatus } from './EventSubChannelPredictionEndEvent.external';
/**
 * An EventSub event representing a prediction being locked in a channel.
 */
export declare class EventSubChannelPredictionEndEvent extends DataObject<EventSubChannelPredictionEndEventData> {
    /**
     * The ID of the prediction.
     */
    get id(): string;
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
     * The title of the prediction.
     */
    get title(): string;
    /**
     * The possible outcomes of the prediction.
     */
    get outcomes(): EventSubChannelPredictionOutcome[];
    /**
     * The time when the prediction started.
     */
    get startDate(): Date;
    /**
     * The time when the prediction ended.
     */
    get endDate(): Date;
    /**
     * The status of the prediction.
     */
    get status(): EventSubChannelPredictionEndStatus;
    /**
     * The ID of the winning outcome, or null if the prediction was canceled.
     */
    get winningOutcomeId(): string | null;
    /**
     * The winning outcome, or null if the prediction was canceled.
     */
    get winningOutcome(): EventSubChannelPredictionOutcome | null;
}
//# sourceMappingURL=EventSubChannelPredictionEndEvent.d.ts.map