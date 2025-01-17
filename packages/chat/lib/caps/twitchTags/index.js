"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchTagsCapability = void 0;
const ClearMsg_1 = require("./messageTypes/ClearMsg");
const GlobalUserState_1 = require("./messageTypes/GlobalUserState");
/**
 * This capability mostly just adds tags to existing commands.
 *
 * @internal
 */
exports.TwitchTagsCapability = {
    name: 'twitch.tv/tags',
    messageTypes: [GlobalUserState_1.GlobalUserState, ClearMsg_1.ClearMsg],
};
