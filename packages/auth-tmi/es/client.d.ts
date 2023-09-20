import type { AuthProvider } from '@twurple/auth';
import type { Options as BaseOptions } from 'tmi.js';
import { Client as BaseClient } from 'tmi.js';
/**
 * The tmi.js options, with the auth provider replacing the identity option.
 *
 * @inheritDoc
 */
export interface Options extends Omit<BaseOptions, 'identity'> {
    /**
     * An authentication provider that supplies tokens to the client.
     *
     * For more information, see the {@link AuthProvider} documentation.
     */
    authProvider: AuthProvider;
    /**
     * The intents to use with the auth provider. Will always additionally check the "chat" intent last.
     */
    authIntents?: string[];
}
/**
 * An extension of the tmi.js client which extends it with {@link AuthProvider} integration.
 */
export declare class DecoratedClient extends BaseClient {
    /**
     * Creates a new tmi.js client which utilizes the given {@link AuthProvider} instance.
     *
     * @param opts The tmi.js options, with the auth provider replacing the identity option.
     */
    constructor(opts: Options);
}
export declare const Client: typeof DecoratedClient & ((opts: Options) => DecoratedClient);
export type Client = DecoratedClient;
