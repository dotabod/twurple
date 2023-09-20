"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClipQuery = exports.createClipCreateQuery = void 0;
const common_1 = require("@twurple/common");
/** @internal */
function createClipCreateQuery(channel, createAfterDelay) {
    return {
        broadcaster_id: (0, common_1.extractUserId)(channel),
        has_delay: createAfterDelay.toString()
    };
}
exports.createClipCreateQuery = createClipCreateQuery;
/** @internal */
function createClipQuery(params) {
    const { filterType, ids, startDate, endDate } = params;
    return {
        [filterType]: ids,
        started_at: startDate,
        ended_at: endDate
    };
}
exports.createClipQuery = createClipQuery;