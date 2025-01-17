"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixCharityApi = void 0;
const tslib_1 = require("tslib");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const HelixPaginatedResult_1 = require("../../utils/pagination/HelixPaginatedResult");
const HelixPagination_1 = require("../../utils/pagination/HelixPagination");
const BaseApi_1 = require("../BaseApi");
const HelixCharityCampaign_1 = require("./HelixCharityCampaign");
const HelixCharityCampaignDonation_1 = require("./HelixCharityCampaignDonation");
/**
 * The Helix API methods that deal with charity campaigns.
 *
 * Can be accessed using `client.charity` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const charityCampaign = await api.charity.getCharityCampaign('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Charity Campaigns
 */
let HelixCharityApi = class HelixCharityApi extends BaseApi_1.BaseApi {
    /**
     * Gets information about the charity campaign that a broadcaster is running.
     * Returns null if the specified broadcaster has no active charity campaign.
     *
     * @param broadcaster The broadcaster to get charity campaign information about.
     */
    async getCharityCampaign(broadcaster) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'charity/campaigns',
            method: 'GET',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:charity'],
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        });
        return new HelixCharityCampaign_1.HelixCharityCampaign(response.data[0], this._client);
    }
    /**
     * Gets the list of donations that users have made to the broadcaster’s active charity campaign.
     *
     * @param broadcaster The broadcaster to get charity campaign donation information about.
     * @param pagination
     *
     * @expandParams
     */
    async getCharityCampaignDonations(broadcaster, pagination) {
        const response = await this._client.callApi({
            type: 'helix',
            url: 'charity/donations',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:charity'],
            query: {
                ...(0, api_call_1.createBroadcasterQuery)(broadcaster),
                ...(0, HelixPagination_1.createPaginationQuery)(pagination),
            },
        });
        return (0, HelixPaginatedResult_1.createPaginatedResult)(response, HelixCharityCampaignDonation_1.HelixCharityCampaignDonation, this._client);
    }
};
HelixCharityApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixCharityApi')
], HelixCharityApi);
exports.HelixCharityApi = HelixCharityApi;
