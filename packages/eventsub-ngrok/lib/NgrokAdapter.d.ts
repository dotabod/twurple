import { ConnectionAdapter } from '@twurple/eventsub-http';
/**
 * The configuration of the ngrok adapter.
 */
export interface NgrokAdapterConfig {
    /**
     * The port to listen on. Defaults to 8000.
     */
    port?: number;
}
/**
 * A connection adapter that uses ngrok to make local testing easy.
 */
export declare class NgrokAdapter extends ConnectionAdapter {
    /**
     * Creates a new instance of the `NgrokAdapter`.
     *
     * @expandParams
     *
     * @param config
     */
    constructor(config?: NgrokAdapterConfig);
    /** @protected */
    get connectUsingSsl(): boolean;
    /** @protected */
    get listenerPort(): number;
    /** @protected */
    getHostName(): Promise<string>;
}
//# sourceMappingURL=NgrokAdapter.d.ts.map