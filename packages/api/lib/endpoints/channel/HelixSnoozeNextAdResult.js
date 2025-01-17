"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixSnoozeNextAdResult = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * Represents the result after a call to snooze the broadcaster's ad schedule.
 */
let HelixSnoozeNextAdResult = class HelixSnoozeNextAdResult extends common_1.DataObject {
    /**
     * The number of snoozes remaining for the broadcaster.
     */
    get snoozeCount() {
        return this[common_1.rawDataSymbol].snooze_count;
    }
    /**
     * The date and time when the broadcaster will gain an additional snooze.
     */
    get snoozeRefreshDate() {
        return new Date(this[common_1.rawDataSymbol].snooze_refresh_at * 1000);
    }
    /**
     * The date and time of the broadcaster's next scheduled ad.
     */
    get nextAdDate() {
        return new Date(this[common_1.rawDataSymbol].next_ad_at * 1000);
    }
};
HelixSnoozeNextAdResult = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixSnoozeNextAdResult')
], HelixSnoozeNextAdResult);
exports.HelixSnoozeNextAdResult = HelixSnoozeNextAdResult;
