import type { IRouter } from 'express-serve-static-core';
import { EventSubHttpBase, type EventSubHttpBaseConfig } from './EventSubHttpBase';
/**
 * The configuration of the EventSub middleware.
 *
 * @inheritDoc
 */
export interface EventSubMiddlewareConfig extends EventSubHttpBaseConfig {
    /**
     * The host name the root application is available under.
     */
    hostName: string;
    /**
     * The path your listener is mounted under.
     */
    pathPrefix?: string;
    /**
     * Whether the path prefix will added to the mount point. Defaults to `true`.
     *
     * Must be `false` if you use this with subrouters.
     */
    usePathPrefixInHandlers?: boolean;
}
/**
 * An Express middleware for the Twitch EventSub event distribution mechanism.
 *
 * You can find an extensive example on how to use this class in the [documentation](/docs/getting-data/eventsub/express).
 *
 * @hideProtected
 * @inheritDoc
 *
 * @meta category main
 */
export declare class EventSubMiddleware extends EventSubHttpBase {
    private readonly _hostName;
    private readonly _pathPrefix?;
    private readonly _usePathPrefixInHandlers;
    /**
     * Creates a new EventSub middleware wrapper.
     *
     * @param config
     *
     * @expandParams
     */
    constructor(config: EventSubMiddlewareConfig);
    /**
     * Applies middleware that handles EventSub notifications to an Express app/router.
     *
     * @param router The app or router the middleware should be applied to.
     */
    apply(router: IRouter): void;
    /**
     * Marks the middleware as ready to receive events.
     *
     * The express app should be started before this.
     */
    markAsReady(): Promise<void>;
    protected getHostName(): Promise<string>;
    protected getPathPrefix(): Promise<string | undefined>;
}
