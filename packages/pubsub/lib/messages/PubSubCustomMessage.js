"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubCustomMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message in response to a subscription to a custom topic.
 */
let PubSubCustomMessage = class PubSubCustomMessage extends common_1.DataObject {
    /**
     * The message data.
     */
    get data() {
        return this[common_1.rawDataSymbol];
    }
};
PubSubCustomMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubCustomMessage')
], PubSubCustomMessage);
exports.PubSubCustomMessage = PubSubCustomMessage;
