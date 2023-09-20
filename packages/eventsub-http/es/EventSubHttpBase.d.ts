import type { HelixEventSubSubscription, HelixEventSubWebHookTransportOptions } from '@twurple/api';
import type { EventSubBaseConfig, EventSubNotificationPayload, EventSubSubscription, EventSubSubscriptionBody } from '@twurple/eventsub-base';
import { EventSubBase } from '@twurple/eventsub-base';
import type { Request, RequestHandler } from 'httpanda';
/** @private */
export interface EventSubVerificationPayload {
    subscription: EventSubSubscriptionBody;
    challenge: string;
}
/** @private */
export type EventSubHttpPayload = EventSubVerificationPayload | EventSubNotificationPayload;
/**
 * The base configuration for EventSub over HTTP.
 *
 * @inheritDoc
 */
export interface EventSubHttpBaseConfig extends EventSubBaseConfig {
    /**
     * Your EventSub secret.
     *
     * This should be a randomly generated string, but it should be the same between restarts.
     *
     * WARNING: Please do not use your application's client secret!
     */
    secret: string;
    /**
     * Whether to ignore packets that are not sent with a Host header matching the configured host name.
     *
     * Enabled by default. Set this to `false` to disable it.
     */
    strictHostCheck?: boolean;
    /**
     * Whether to add additional helper routes such as the test route at the root.
     *
     * Enabled by default. Set this to `false` to disable it.
     */
    helperRoutes?: boolean;
    /**
     * Whether to use the legacy way of augmenting your EventSub secret in subscriptions.
     *
     * This setting is only provided for compatibility/migration purposes.
     * You should switch it off at your earliest convenience.
     *
     * You can set this to the string 'migrate' to migrate your subscription to the new secrets.
     * This will treat all existing subscriptions as legacy and all new subscriptions as non-legacy,
     * then you may migrate the existing subscriptions using `.migrate()`.
     */
    legacySecrets?: boolean | 'migrate';
}
/**
 * @private
 * @hideProtected
 * @inheritDoc
 */
export declare abstract class EventSubHttpBase extends EventSubBase {
    private readonly _strictHostCheck;
    protected readonly _helperRoutes: boolean;
    protected _readyToSubscribe: boolean;
    /**
     * Fires when a subscription is successfully verified or fails to verify.
     *
     * @eventListener
     *
     * @param success Whether the verification succeeded.
     * @param subscription The subscription that was verified.
     */
    readonly onVerify: import("@d-fischer/typed-event-emitter/lib").EventBinder<[success: boolean, subscription: EventSubSubscription<unknown>]>;
    constructor(config: EventSubHttpBaseConfig);
    /** @private */
    _getTransportOptionsForSubscription(subscription: EventSubSubscription): Promise<HelixEventSubWebHookTransportOptions>;
    /** @private */
    _getCliTestCommandForSubscription(subscription: EventSubSubscription): Promise<string>;
    /** @private */
    _isReadyToSubscribe(): boolean;
    protected abstract getHostName(): Promise<string>;
    protected abstract getPathPrefix(): Promise<string | undefined>;
    protected _resumeExistingSubscriptions(): Promise<void>;
    protected _createHandleRequest(): RequestHandler;
    protected _createDropLegacyRequest(): RequestHandler;
    protected _createHandleHealthRequest(): RequestHandler;
    protected _isHostDenied(req: Request): Promise<boolean>;
    protected _findTwitchSubscriptionToContinue(subscription: EventSubSubscription): HelixEventSubSubscription | undefined;
    private _verifyData;
    private _createSecretForSubscription;
}
