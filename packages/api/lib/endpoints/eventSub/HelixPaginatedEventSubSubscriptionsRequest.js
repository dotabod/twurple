"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPaginatedEventSubSubscriptionsRequest = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixPaginatedRequestWithTotal_1 = require("../../utils/pagination/HelixPaginatedRequestWithTotal");
const HelixEventSubSubscription_1 = require("./HelixEventSubSubscription");
/**
 * A special case of {@link HelixPaginatedRequestWithTotal} with support for fetching the total cost and cost limit
 * of EventSub subscriptions.
 *
 * @inheritDoc
 */
let HelixPaginatedEventSubSubscriptionsRequest = class HelixPaginatedEventSubSubscriptionsRequest extends HelixPaginatedRequestWithTotal_1.HelixPaginatedRequestWithTotal {
    /** @internal */
    constructor(query, userId, client) {
        super({
            url: 'eventsub/subscriptions',
            userId,
            query,
        }, client, data => new HelixEventSubSubscription_1.HelixEventSubSubscription(data, client));
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
HelixPaginatedEventSubSubscriptionsRequest = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPaginatedEventSubSubscriptionsRequest')
], HelixPaginatedEventSubSubscriptionsRequest);
exports.HelixPaginatedEventSubSubscriptionsRequest = HelixPaginatedEventSubSubscriptionsRequest;
