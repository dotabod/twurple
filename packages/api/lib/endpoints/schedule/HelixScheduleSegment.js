"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixScheduleSegment = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A segment of a schedule.
 */
let HelixScheduleSegment = class HelixScheduleSegment extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the segment.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The date when the segment starts.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].start_time);
    }
    /**
     * The date when the segment ends.
     */
    get endDate() {
        return new Date(this[common_1.rawDataSymbol].end_time);
    }
    /**
     * The title of the segment.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The date up to which the segment is canceled.
     */
    get cancelEndDate() {
        return (0, shared_utils_1.mapNullable)(this[common_1.rawDataSymbol].canceled_until, v => new Date(v));
    }
    /**
     * The ID of the category the segment is scheduled for, or null if no category is specified.
     */
    get categoryId() {
        var _a, _b;
        return (_b = (_a = this[common_1.rawDataSymbol].category) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The name of the category the segment is scheduled for, or null if no category is specified.
     */
    get categoryName() {
        var _a, _b;
        return (_b = (_a = this[common_1.rawDataSymbol].category) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Gets more information about the category the segment is scheduled for, or null if no category is specified.
     */
    async getCategory() {
        var _a;
        const categoryId = (_a = this[common_1.rawDataSymbol].category) === null || _a === void 0 ? void 0 : _a.id;
        return categoryId ? await this._client.games.getGameById(categoryId) : null;
    }
    /**
     * Whether the segment is recurring every week.
     */
    get isRecurring() {
        return this[common_1.rawDataSymbol].is_recurring;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixScheduleSegment.prototype, "_client", void 0);
HelixScheduleSegment = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixScheduleSegment', 'id')
], HelixScheduleSegment);
exports.HelixScheduleSegment = HelixScheduleSegment;
