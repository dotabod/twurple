"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPaginatedRequestWithTotal = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixPaginatedRequest_1 = require("./HelixPaginatedRequest");
/**
 * A special case of {@link HelixPaginatedRequest} with support for fetching the total number of entities, whenever an endpoint supports it.
 *
 * @inheritDoc
 */
let HelixPaginatedRequestWithTotal = class HelixPaginatedRequestWithTotal extends HelixPaginatedRequest_1.HelixPaginatedRequest {
    /**
     * Gets the total number of entities existing in the queried result set.
     */
    async getTotalCount() {
        var _a;
        const data = (_a = this._currentData) !== null && _a !== void 0 ? _a : (await this._fetchData({ query: { after: undefined } }));
        return data.total;
    }
};
HelixPaginatedRequestWithTotal = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPaginatedRequestWithTotal')
], HelixPaginatedRequestWithTotal);
exports.HelixPaginatedRequestWithTotal = HelixPaginatedRequestWithTotal;
