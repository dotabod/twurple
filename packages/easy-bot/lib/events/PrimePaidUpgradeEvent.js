"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimePaidUpgradeEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const chat_1 = require("@twurple/chat");
const common_1 = require("@twurple/common");
/**
 * An event representing a free subscription from Prime Gaming being replaced by a paid one.
 *
 * @meta category events
 */
let PrimePaidUpgradeEvent = class PrimePaidUpgradeEvent {
    constructor(channel, userName, info, msg, bot) {
        this._broadcasterName = (0, chat_1.toUserName)(channel);
        this._userName = userName;
        this._info = info;
        this._msg = msg;
        this._bot = bot;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this._msg.channelId;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this._broadcasterName;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._bot.api.users.getUserById(this.broadcasterId));
    }
    /**
     * The ID of the user who paid for their subscription.
     */
    get userId() {
        return this._info.userId;
    }
    /**
     * The name of the user who paid for their subscription.
     */
    get userName() {
        return this._userName;
    }
    /**
     * The display name of the user who paid for their subscription.
     */
    get userDisplayName() {
        return this._info.displayName;
    }
    /**
     * Gets more information about the user who paid for their subscription.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._bot.api.users.getUserById(this.userId));
    }
    /**
     * The plan of the subscription.
     */
    get plan() {
        return this._info.plan;
    }
    /**
     * The full object that contains all the message information.
     */
    get messageObject() {
        return this._msg;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], PrimePaidUpgradeEvent.prototype, "_broadcasterName", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], PrimePaidUpgradeEvent.prototype, "_userName", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], PrimePaidUpgradeEvent.prototype, "_info", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], PrimePaidUpgradeEvent.prototype, "_msg", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], PrimePaidUpgradeEvent.prototype, "_bot", void 0);
PrimePaidUpgradeEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('easy-bot', 'PrimePaidUpgradeEvent', 'userId')
], PrimePaidUpgradeEvent);
exports.PrimePaidUpgradeEvent = PrimePaidUpgradeEvent;