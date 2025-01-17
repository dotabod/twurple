import { ClearMsg } from "./messageTypes/ClearMsg.mjs";
import { GlobalUserState } from "./messageTypes/GlobalUserState.mjs";
/**
 * This capability mostly just adds tags to existing commands.
 *
 * @internal
 */
export const TwitchTagsCapability = {
    name: 'twitch.tv/tags',
    messageTypes: [GlobalUserState, ClearMsg],
};
