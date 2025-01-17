import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createRaidStartQuery } from "../../interfaces/endpoints/raid.external.mjs";
import { BaseApi } from "../BaseApi.mjs";
import { HelixRaid } from "./HelixRaid.mjs";
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
let HelixRaidApi = class HelixRaidApi extends BaseApi {
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
            userId: extractUserId(from),
            scopes: ['channel:manage:raids'],
            query: createRaidStartQuery(from, to),
        });
        return new HelixRaid(result.data[0]);
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
            userId: extractUserId(from),
            scopes: ['channel:manage:raids'],
            query: createBroadcasterQuery(from),
        });
    }
};
HelixRaidApi = __decorate([
    rtfm('api', 'HelixRaidApi')
], HelixRaidApi);
export { HelixRaidApi };
