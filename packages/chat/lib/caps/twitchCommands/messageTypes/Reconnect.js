"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reconnect = void 0;
const ircv3_1 = require("ircv3");
/** @private */
class Reconnect extends ircv3_1.Message {
}
Reconnect.COMMAND = 'RECONNECT';
exports.Reconnect = Reconnect;
