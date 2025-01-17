import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixScheduleSegment } from "./HelixScheduleSegment.mjs";
/**
 * A schedule of a channel.
 */
let HelixSchedule = class HelixSchedule extends DataObject {
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
        return (_b = (_a = this[rawDataSymbol].segments) === null || _a === void 0 ? void 0 : _a.map(data => new HelixScheduleSegment(data, this._client))) !== null && _b !== void 0 ? _b : [];
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The date when the current vacation started, or null if the schedule is not in vacation mode.
     */
    get vacationStartDate() {
        var _a;
        const timestamp = (_a = this[rawDataSymbol].vacation) === null || _a === void 0 ? void 0 : _a.start_time;
        return timestamp ? new Date(timestamp) : null;
    }
    /**
     * The date when the current vacation ends, or null if the schedule is not in vacation mode.
     */
    get vacationEndDate() {
        var _a;
        const timestamp = (_a = this[rawDataSymbol].vacation) === null || _a === void 0 ? void 0 : _a.end_time;
        return timestamp ? new Date(timestamp) : null;
    }
};
__decorate([
    Enumerable(false)
], HelixSchedule.prototype, "_client", void 0);
HelixSchedule = __decorate([
    rtfm('api', 'HelixSchedule', 'broadcasterId')
], HelixSchedule);
export { HelixSchedule };
