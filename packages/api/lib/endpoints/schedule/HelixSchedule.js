"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixSchedule = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixScheduleSegment_1 = require("./HelixScheduleSegment");
/**
 * A schedule of a channel.
 */
let HelixSchedule = class HelixSchedule extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The segments of the schedule.
     */
    get segments() {
        var _a, _b;
        return (_b = (_a = this[common_1.rawDataSymbol].segments) === null || _a === void 0 ? void 0 : _a.map(data => new HelixScheduleSegment_1.HelixScheduleSegment(data, this._client))) !== null && _b !== void 0 ? _b : [];
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id));
    }
    /**
     * The date when the current vacation started, or null if the schedule is not in vacation mode.
     */
    get vacationStartDate() {
        var _a;
        const timestamp = (_a = this[common_1.rawDataSymbol].vacation) === null || _a === void 0 ? void 0 : _a.start_time;
        return timestamp ? new Date(timestamp) : null;
    }
    /**
     * The date when the current vacation ends, or null if the schedule is not in vacation mode.
     */
    get vacationEndDate() {
        var _a;
        const timestamp = (_a = this[common_1.rawDataSymbol].vacation) === null || _a === void 0 ? void 0 : _a.end_time;
        return timestamp ? new Date(timestamp) : null;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixSchedule.prototype, "_client", void 0);
HelixSchedule = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixSchedule', 'broadcasterId')
], HelixSchedule);
exports.HelixSchedule = HelixSchedule;
