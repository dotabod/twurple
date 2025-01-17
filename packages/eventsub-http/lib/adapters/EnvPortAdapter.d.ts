import { ReverseProxyAdapter } from './ReverseProxyAdapter';
/**
 * The configuration for the environment port connection adapter.
 */
export interface EnvPortAdapterConfig {
    /**
     * The environment variable name the adapter should get the port from.
     *
     * @default PORT
     */
    variableName?: string;
    /**
     * The host name the reverse proxy is available under.
     */
    hostName: string;
}
/**
 * A connection adapter that reads the port to listen on from the environment.
 *
 * @hideProtected
 *
 * @meta category adapters
 */
export declare class EnvPortAdapter extends ReverseProxyAdapter {
    /**
     * Creates a new environment port connection adapter.
     *
     * @expandParams
     *
     * @param options
     */
    constructor(options: EnvPortAdapterConfig);
}
//# sourceMappingURL=EnvPortAdapter.d.ts.map