"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixAdSchedule = void 0;
const tslib_1 = require("tslib");
// import { Enumerable } from '@d-fischer/shared-utils';
const common_1 = require("@twurple/common");
// import type { HelixUser } from '../user/HelixUser';
/**
 * Represents a broadcaster's ad schedule.
 */
let HelixAdSchedule = class HelixAdSchedule extends common_1.DataObject {
    /**
     * The number of snoozes available for the broadcaster.
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
    /**
     * The length in seconds of the scheduled upcoming ad break.
     */
    get duration() {
        return this[common_1.rawDataSymbol].duration;
    }
    /**
     * The date and time of the broadcaster's last ad-break.
     */
    get lastAdDate() {
        return new Date(this[common_1.rawDataSymbol].last_ad_at * 1000);
    }
    /**
     * The amount of pre-roll free time remaining for the channel in seconds.
     */
    get prerollFreeTime() {
        return this[common_1.rawDataSymbol].preroll_free_time;
    }
};
HelixAdSchedule = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixAdSchedule')
], HelixAdSchedule);
exports.HelixAdSchedule = HelixAdSchedule;
