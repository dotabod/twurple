import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { HelixPaginatedRequestWithTotal } from "../../utils/pagination/HelixPaginatedRequestWithTotal.mjs";
import { HelixEventSubSubscription } from "./HelixEventSubSubscription.mjs";
/**
 * A special case of {@link HelixPaginatedRequestWithTotal} with support for fetching the total cost and cost limit
 * of EventSub subscriptions.
 *
 * @inheritDoc
 */
let HelixPaginatedEventSubSubscriptionsRequest = class HelixPaginatedEventSubSubscriptionsRequest extends HelixPaginatedRequestWithTotal {
    /** @internal */
    constructor(query, userId, client) {
        super({
            url: 'eventsub/subscriptions',
            userId,
            query,
        }, client, data => new HelixEventSubSubscription(data, client));
    }
    /**
     * Gets the total cost of EventSub subscriptions.
     */
    async getTotalCost() {
        var _a;
        const data = (_a = this._currentData) !== null && _a !== void 0 ? _a : (await this._fetchData({ query: { after: undefined } }));
        return data.total_cost;
    }
    /**
     * Gets the cost limit of EventSub subscriptions.
     */
    async getMaxTotalCost() {
        var _a;
        const data = (_a = this._currentData) !== null && _a !== void 0 ? _a : (await this._fetchData({ query: { after: undefined } }));
        return data.max_total_cost;
    }
};
HelixPaginatedEventSubSubscriptionsRequest = __decorate([
    rtfm('api', 'HelixPaginatedEventSubSubscriptionsRequest')
], HelixPaginatedEventSubSubscriptionsRequest);
export { HelixPaginatedEventSubSubscriptionsRequest };
