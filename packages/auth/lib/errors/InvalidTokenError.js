"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
const common_1 = require("@twurple/common");
/**
 * Thrown whenever an invalid token is supplied.
 */
class InvalidTokenError extends common_1.CustomError {
    /** @private */
    constructor(options) {
        super('Invalid token supplied', options);
    }
}
exports.InvalidTokenError = InvalidTokenError;
