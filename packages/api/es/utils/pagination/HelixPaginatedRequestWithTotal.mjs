import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { HelixPaginatedRequest } from "./HelixPaginatedRequest.mjs";
/**
 * A special case of {@link HelixPaginatedRequest} with support for fetching the total number of entities, whenever an endpoint supports it.
 *
 * @inheritDoc
 */
let HelixPaginatedRequestWithTotal = class HelixPaginatedRequestWithTotal extends HelixPaginatedRequest {
    /**
     * Gets the total number of entities existing in the queried result set.
     */
    async getTotalCount() {
        var _a;
        const data = (_a = this._currentData) !== null && _a !== void 0 ? _a : (await this._fetchData({ query: { after: undefined } }));
        return data.total;
    }
};
HelixPaginatedRequestWithTotal = __decorate([
    rtfm('api', 'HelixPaginatedRequestWithTotal')
], HelixPaginatedRequestWithTotal);
export { HelixPaginatedRequestWithTotal };
