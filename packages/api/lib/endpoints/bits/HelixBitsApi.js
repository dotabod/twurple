"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixBitsApi = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const bits_external_1 = require("../../interfaces/endpoints/bits.external");
const BaseApi_1 = require("../BaseApi");
const HelixBitsLeaderboard_1 = require("./HelixBitsLeaderboard");
const HelixCheermoteList_1 = require("./HelixCheermoteList");
/**
 * The Helix API methods that deal with bits.
 *
 * Can be accessed using `client.bits` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const leaderboard = await api.bits.getLeaderboard({ period: 'day' });
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Bits
 */
let HelixBitsApi = class HelixBitsApi extends BaseApi_1.BaseApi {
    /**
     * Gets a bits leaderboard of your channel.
     *
     * @param broadcaster The user to get the leaderboard of.
     * @param params
     * @expandParams
     */
    async getLeaderboard(broadcaster, params = {}) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'bits/leaderboard',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['bits:read'],
            query: (0, bits_external_1.createBitsLeaderboardQuery)(params),
        });
        return new HelixBitsLeaderboard_1.HelixBitsLeaderboard(result, this._client);
    }
    /**
     * Gets all available cheermotes.
     *
     * @param broadcaster The broadcaster to include custom cheermotes of.
     *
     * If not given, only get global cheermotes.
     */
    async getCheermotes(broadcaster) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'bits/cheermotes',
            userId: (0, shared_utils_1.mapOptional)(broadcaster, common_1.extractUserId),
            query: (0, shared_utils_1.mapOptional)(broadcaster, api_call_1.createBroadcasterQuery),
        });
        return new HelixCheermoteList_1.HelixCheermoteList(result.data);
    }
};
HelixBitsApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixBitsApi')
], HelixBitsApi);
exports.HelixBitsApi = HelixBitsApi;
