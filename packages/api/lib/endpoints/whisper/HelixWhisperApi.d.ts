import { type UserIdResolvable } from '@twurple/common';
import { BaseApi } from '../BaseApi';
/**
 * The API methods that deal with whispers.
 *
 * Can be accessed using 'client.whispers' on an {@link ApiClient} instance
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * await api.whispers.sendWhisper('61369223', '86753099', 'Howdy, partner!');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Whispers
 */
export declare class HelixWhisperApi extends BaseApi {
    /**
     * Sends a whisper message to the specified user.
     *
     * NOTE: The API may silently drop whispers that it suspects of violating Twitch policies. (The API does not indicate that it dropped the whisper; it returns a 204 status code as if it succeeded).
     *
     * @param from The user sending the whisper. This user must have a verified phone number and must match the user in the access token.
     * @param to The user to receive the whisper.
     * @param message The whisper message to send. The message must not be empty.
     *
     * The maximum message lengths are:
     *
     * 500 characters if the user you're sending the message to hasn't whispered you before.
     * 10,000 characters if the user you're sending the message to has whispered you before.
     *
     * Messages that exceed the maximum length are truncated.
     */
    sendWhisper(from: UserIdResolvable, to: UserIdResolvable, message: string): Promise<void>;
}
//# sourceMappingURL=HelixWhisperApi.d.ts.map