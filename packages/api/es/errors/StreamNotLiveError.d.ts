import { CustomError } from '@twurple/common';
/**
 * Thrown whenever you try something that requires your own stream to be live.
 */
export declare class StreamNotLiveError extends CustomError {
    /** @private */
    constructor(options?: ErrorOptions);
}
