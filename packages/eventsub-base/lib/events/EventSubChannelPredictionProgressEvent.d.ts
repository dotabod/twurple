import type { HelixUser } from '@twurple/api';
import { DataObject } from '@twurple/common';
import { EventSubChannelPredictionOutcome } from './common/EventSubChannelPredictionOutcome';
import { type EventSubChannelPredictionProgressEventData } from './EventSubChannelPredictionProgressEvent.external';
/**
 * An EventSub event representing a prediction being voted on in a channel.
 */
export declare class EventSubChannelPredictionProgressEvent extends DataObject<EventSubChannelPredictionProgressEventData> {
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
     * The time when the prediction is locked.
     */
    get lockDate(): Date;
}
//# sourceMappingURL=EventSubChannelPredictionProgressEvent.d.ts.map