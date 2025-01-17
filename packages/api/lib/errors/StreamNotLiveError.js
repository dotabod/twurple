"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamNotLiveError = void 0;
const common_1 = require("@twurple/common");
/**
 * Thrown whenever you try something that requires your own stream to be live.
 */
class StreamNotLiveError extends common_1.CustomError {
    /** @private */
    constructor(options) {
        super('Your stream needs to be live to do this', options);
    }
}
exports.StreamNotLiveError = StreamNotLiveError;
