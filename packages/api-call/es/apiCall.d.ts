import { type Response } from '@d-fischer/cross-fetch';
import type { TwitchApiCallFetchOptions, TwitchApiCallOptions } from './TwitchApiCallOptions';
/**
 * Makes a call to the Twitch API using the given credentials, returning the raw Response object.
 *
 * @param options The configuration of the call.
 * @param clientId The client ID of your application.
 * @param accessToken The access token to call the API with.
 *
 * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
 * @param authorizationType The type of Authorization header to send.
 *
 * Defaults to "Bearer" for Helix and "OAuth" for everything else.
 * @param fetchOptions Additional options to be passed to the `fetch` function.
 * @param mockServerPort
 */
export declare function callTwitchApiRaw(options: TwitchApiCallOptions, clientId?: string, accessToken?: string, authorizationType?: string, fetchOptions?: TwitchApiCallFetchOptions, mockServerPort?: number): Promise<Response>;
/**
 * Makes a call to the Twitch API using given credentials.
 *
 * @param options The configuration of the call.
 * @param clientId The client ID of your application.
 * @param accessToken The access token to call the API with.
 *
 * You need to obtain one using one of the [Twitch OAuth flows](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).
 * @param authorizationType The type of Authorization header to send.
 *
 * Defaults to "Bearer" for Helix and "OAuth" for everything else.
 * @param fetchOptions Additional options to be passed to the `fetch` function.
 */
export declare function callTwitchApi<T = unknown>(options: TwitchApiCallOptions, clientId?: string, accessToken?: string, authorizationType?: string, fetchOptions?: TwitchApiCallFetchOptions): Promise<T>;
