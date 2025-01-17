import { ConnectionAdapter } from './ConnectionAdapter';
/**
 * The configuration of the reverse proxy connection adapter.
 *
 * @inheritDoc
 */
export interface ReverseProxyAdapterConfig {
    /**
     * The port the server should listen to.
     *
     * If not given, defaults to 8080.
     */
    port?: number;
    /**
     * The host name the reverse proxy is available under.
     */
    hostName: string;
    /**
     * The path prefix your reverse proxy redirects to the listener.
     */
    pathPrefix?: string;
    /**
     * Whether the path prefix is passed to the handler.
     *
     * Defaults to `false` which means that the layer redirecting to this server needs to strip the path prefix in order for it to work.
     *
     * For example, if the path prefix is set to /hooks, an external connection to /hooks/abc should pass /abc as the path to this server.
     *
     * Conversely, if this is set to `true`, the path should be passed as is (i.e. /hooks/abc).
     */
    usePathPrefixInHandlers?: boolean;
}
/**
 * A WebHook connection adapter that supports a reverse proxy in front of the listener.
 *
 * @hideProtected
 *
 * @meta category adapters
 */
export declare class ReverseProxyAdapter extends ConnectionAdapter {
    private readonly _hostName;
    private readonly _port;
    private readonly _pathPrefix?;
    private readonly _usePathPrefixInHandlers;
    /**
     * Creates a reverse proxy connection adapter.
     *
     * @expandParams
     *
     * @param options
     */
    constructor(options: ReverseProxyAdapterConfig);
    /** @protected */
    get listenerPort(): number;
    /** @protected */
    getHostName(): Promise<string>;
    /** @protected */
    get pathPrefix(): string | undefined;
    /** @protected */
    get usePathPrefixInHandlers(): boolean;
}
