"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubBitsBadgeUnlockMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a user unlocking a new bits badge.
 */
let PubSubBitsBadgeUnlockMessage = class PubSubBitsBadgeUnlockMessage extends common_1.DataObject {
    /**
     * The ID of the user that unlocked the badge.
     */
    get userId() {
        return this[common_1.rawDataSymbol].data.user_id;
    }
    /**
     * The name of the user that unlocked the badge.
     */
    get userName() {
        return this[common_1.rawDataSymbol].data.user_name;
    }
    /**
     * The full message that was sent with the notification.
     */
    get message() {
        return this[common_1.rawDataSymbol].data.chat_message;
    }
    /**
     * The new badge tier.
     */
    get badgeTier() {
        return this[common_1.rawDataSymbol].data.badge_tier;
    }
};
PubSubBitsBadgeUnlockMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubBitsBadgeUnlockMessage', 'userId')
], PubSubBitsBadgeUnlockMessage);
exports.PubSubBitsBadgeUnlockMessage = PubSubBitsBadgeUnlockMessage;
