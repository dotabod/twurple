"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPaginatedSubscriptionsRequest = void 0;
const tslib_1 = require("tslib");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const HelixPaginatedRequestWithTotal_1 = require("../../utils/pagination/HelixPaginatedRequestWithTotal");
const HelixSubscription_1 = require("./HelixSubscription");
/**
 * A special case of {@link HelixPaginatedRequestWithTotal}
 * with support for fetching the total sub points of a broadcaster.
 *
 * @inheritDoc
 */
let HelixPaginatedSubscriptionsRequest = class HelixPaginatedSubscriptionsRequest extends HelixPaginatedRequestWithTotal_1.HelixPaginatedRequestWithTotal {
    /** @internal */
    constructor(broadcaster, client) {
        super({
            url: 'subscriptions',
            scopes: ['channel:read:subscriptions'],
            userId: (0, common_1.extractUserId)(broadcaster),
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        }, client, data => new HelixSubscription_1.HelixSubscription(data, client));
    }
    /**
     * Gets the total sub points of the broadcaster.
     */
    async getPoints() {
        var _a;
        const data = (_a = this._currentData) !== null && _a !== void 0 ? _a : (await this._fetchData({ query: { after: undefined } }));
        return data.points;
    }
};
HelixPaginatedSubscriptionsRequest = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPaginatedSubscriptionsRequest')
], HelixPaginatedSubscriptionsRequest);
exports.HelixPaginatedSubscriptionsRequest = HelixPaginatedSubscriptionsRequest;
