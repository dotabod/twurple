import type { HelixEventSubSubscription, HelixEventSubTransportOptions } from '@twurple/api';
import type { EventSubBase } from '../EventSubBase';
/**
 * A subscription to an EventSub event.
 *
 * @hideProtected
 */
export declare abstract class EventSubSubscription</** @private */ T = unknown> {
    protected _handler: (obj: T) => void;
    protected _client: EventSubBase;
    private _startedFromExistingTwitchSub;
    private _verified;
    private _twitchSubscriptionData?;
    /** @protected */ abstract readonly _cliName: string;
    /**
     * Whether the subscription has been verified by Twitch.
     */
    get verified(): boolean;
    /** @private */
    get _twitchId(): string | undefined;
    /** @private */
    _verify(): void;
    /** @private */
    _handleData(body: Record<string, unknown>): void;
    /**
     * Activates the subscription.
     *
     * You don't have to call this method manually after subscribing, as it's done automatically.
     * It's only used to reactivate a subscription after calling `.stop()`.
     *
     * @param resumeFrom The subscription data from Twitch to check whether the subscription needs to be re-added.
     */
    start(resumeFrom?: HelixEventSubSubscription): void;
    /**
     * Suspends the subscription, not removing it from the listener.
     */
    suspend(): void;
    /**
     * Deactivates the subscription and removes it from the listener.
     */
    stop(): void;
    /**
     * Migrates the subscription from legacy secrets to modern secrets.
     */
    migrate(): Promise<void>;
    /**
     * Outputs the base command to execute for testing the subscription using the Twitch CLI.
     *
     * Some additional parameters, like the target user, may be required.
     */
    getCliTestCommand(): Promise<string>;
    /**
     * Whether the subscription uses a legacy secret.
     *
     * You can use this property to check whether any subscription still has to be migrated from legacy secrets.
     */
    get usesLegacySecret(): boolean;
    /**
     * The user ID the subscription is supposed to be authenticated as.
     *
     * Is only null for subscriptions that don't relate to a user, like extension transactions or user authorizations.
     */
    abstract get authUserId(): string | null;
    /** @private */
    _droppedByTwitch(): void;
    protected _getTransportOptions(): Promise<HelixEventSubTransportOptions>;
    /** @private */
    abstract get id(): string;
    protected abstract _subscribe(): Promise<HelixEventSubSubscription>;
    protected abstract transformData(response: unknown): T;
    private _subscribeAndSave;
    private _unsubscribe;
}
