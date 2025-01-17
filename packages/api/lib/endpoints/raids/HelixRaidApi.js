"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixRaidApi = void 0;
const tslib_1 = require("tslib");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const raid_external_1 = require("../../interfaces/endpoints/raid.external");
const BaseApi_1 = require("../BaseApi");
const HelixRaid_1 = require("./HelixRaid");
/**
 * The Helix API methods that deal with raids.
 *
 * Can be accessed using `client.raids` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const raid = await api.raids.startRaid('125328655', '61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Raids
 */
let HelixRaidApi = class HelixRaidApi extends BaseApi_1.BaseApi {
    /**
     * Initiate a raid from a live broadcaster to another live broadcaster.
     *
     * @param from The raiding broadcaster.
     * @param to The raid target.
     */
    async startRaid(from, to) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'raids',
            method: 'POST',
            userId: (0, common_1.extractUserId)(from),
            scopes: ['channel:manage:raids'],
            query: (0, raid_external_1.createRaidStartQuery)(from, to),
        });
        return new HelixRaid_1.HelixRaid(result.data[0]);
    }
    /**
     * Cancels an initiated raid.
     *
     * @param from The raiding broadcaster.
     */
    async cancelRaid(from) {
        await this._client.callApi({
            type: 'helix',
            url: 'raids',
            method: 'DELETE',
            userId: (0, common_1.extractUserId)(from),
            scopes: ['channel:manage:raids'],
            query: (0, api_call_1.createBroadcasterQuery)(from),
        });
    }
};
HelixRaidApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixRaidApi')
], HelixRaidApi);
exports.HelixRaidApi = HelixRaidApi;
