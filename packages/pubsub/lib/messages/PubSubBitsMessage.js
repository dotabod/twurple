"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubBitsMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about bits being used in a channel.
 */
let PubSubBitsMessage = class PubSubBitsMessage extends common_1.DataObject {
    /**
     * The ID of the user that sent the bits.
     */
    get userId() {
        return this[common_1.rawDataSymbol].data.user_id;
    }
    /**
     * The name of the user that sent the bits.
     */
    get userName() {
        return this[common_1.rawDataSymbol].data.user_name;
    }
    /**
     * The full message that was sent with the bits.
     */
    get message() {
        return this[common_1.rawDataSymbol].data.chat_message;
    }
    /**
     * The number of bits that were sent.
     */
    get bits() {
        return this[common_1.rawDataSymbol].data.bits_used;
    }
    /**
     * The total number of bits that were ever sent by the user in the channel.
     */
    get totalBits() {
        return this[common_1.rawDataSymbol].data.total_bits_used;
    }
    /**
     * Whether the cheer was anonymous.
     */
    get isAnonymous() {
        return this[common_1.rawDataSymbol].data.is_anonymous;
    }
};
PubSubBitsMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubBitsMessage', 'userId')
], PubSubBitsMessage);
exports.PubSubBitsMessage = PubSubBitsMessage;
