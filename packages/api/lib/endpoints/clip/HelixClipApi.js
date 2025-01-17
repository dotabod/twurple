"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixClipApi = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const clip_external_1 = require("../../interfaces/endpoints/clip.external");
const HelixRequestBatcher_1 = require("../../utils/HelixRequestBatcher");
const HelixPaginatedRequest_1 = require("../../utils/pagination/HelixPaginatedRequest");
const HelixPaginatedResult_1 = require("../../utils/pagination/HelixPaginatedResult");
const HelixPagination_1 = require("../../utils/pagination/HelixPagination");
const BaseApi_1 = require("../BaseApi");
const HelixClip_1 = require("./HelixClip");
/**
 * The Helix API methods that deal with clips.
 *
 * Can be accessed using `client.clips` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const clipId = await api.clips.createClip({ channel: '125328655' });
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Clips
 */
let HelixClipApi = class HelixClipApi extends BaseApi_1.BaseApi {
    constructor() {
        super(...arguments);
        /** @internal */
        this._getClipByIdBatcher = new HelixRequestBatcher_1.HelixRequestBatcher({
            url: 'clips',
        }, 'id', 'id', this._client, (data) => new HelixClip_1.HelixClip(data, this._client));
    }
    /**
     * Gets clips for the specified broadcaster in descending order of views.
     *
     * @param broadcaster The broadcaster to fetch clips for.
     * @param filter
     *
     * @expandParams
     */
    async getClipsForBroadcaster(broadcaster, filter = {}) {
        return await this._getClips({
            ...filter,
            filterType: 'broadcaster_id',
            ids: (0, common_1.extractUserId)(broadcaster),
            userId: (0, common_1.extractUserId)(broadcaster),
        });
    }
    /**
     * Creates a paginator for clips for the specified broadcaster.
     *
     * @param broadcaster The broadcaster to fetch clips for.
     * @param filter
     *
     * @expandParams
     */
    getClipsForBroadcasterPaginated(broadcaster, filter = {}) {
        return this._getClipsPaginated({
            ...filter,
            filterType: 'broadcaster_id',
            ids: (0, common_1.extractUserId)(broadcaster),
            userId: (0, common_1.extractUserId)(broadcaster),
        });
    }
    /**
     * Gets clips for the specified game in descending order of views.
     *
     * @param gameId The game ID.
     * @param filter
     *
     * @expandParams
     */
    async getClipsForGame(gameId, filter = {}) {
        return await this._getClips({
            ...filter,
            filterType: 'game_id',
            ids: gameId,
        });
    }
    /**
     * Creates a paginator for clips for the specified game.
     *
     * @param gameId The game ID.
     * @param filter
     *
     * @expandParams
     */
    getClipsForGamePaginated(gameId, filter = {}) {
        return this._getClipsPaginated({
            ...filter,
            filterType: 'game_id',
            ids: gameId,
        });
    }
    /**
     * Gets the clips identified by the given IDs.
     *
     * @param ids The clip IDs.
     */
    async getClipsByIds(ids) {
        const result = await this._getClips({
            filterType: 'id',
            ids,
        });
        return result.data;
    }
    /**
     * Gets the clip identified by the given ID.
     *
     * @param id The clip ID.
     */
    async getClipById(id) {
        const clips = await this.getClipsByIds([id]);
        return clips.length ? clips[0] : null;
    }
    /**
     * Gets the clip identified by the given ID, batching multiple calls into fewer requests as the API allows.
     *
     * @param id The clip ID.
     */
    async getClipByIdBatched(id) {
        return await this._getClipByIdBatcher.request(id);
    }
    /**
     * Creates a clip of a running stream.
     *
     * Returns the ID of the clip.
     *
     * @param params
     * @expandParams
     */
    async createClip(params) {
        const { channel, createAfterDelay = false } = params;
        const result = await this._client.callApi({
            type: 'helix',
            url: 'clips',
            method: 'POST',
            userId: (0, common_1.extractUserId)(channel),
            scopes: ['clips:edit'],
            canOverrideScopedUserContext: true,
            query: (0, clip_external_1.createClipCreateQuery)(channel, createAfterDelay),
        });
        return result.data[0].id;
    }
    async _getClips(params) {
        if (!params.ids.length) {
            return { data: [] };
        }
        const result = await this._client.callApi({
            type: 'helix',
            url: 'clips',
            userId: params.userId,
            query: {
                ...(0, clip_external_1.createClipQuery)(params),
                ...(0, HelixPagination_1.createPaginationQuery)(params),
            },
        });
        return (0, HelixPaginatedResult_1.createPaginatedResult)(result, HelixClip_1.HelixClip, this._client);
    }
    _getClipsPaginated(params) {
        return new HelixPaginatedRequest_1.HelixPaginatedRequest({
            url: 'clips',
            userId: params.userId,
            query: (0, clip_external_1.createClipQuery)(params),
        }, this._client, data => new HelixClip_1.HelixClip(data, this._client));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixClipApi.prototype, "_getClipByIdBatcher", void 0);
HelixClipApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixClipApi')
], HelixClipApi);
exports.HelixClipApi = HelixClipApi;
