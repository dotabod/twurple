"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPollApi = void 0;
const tslib_1 = require("tslib");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const generic_external_1 = require("../../interfaces/endpoints/generic.external");
const poll_external_1 = require("../../interfaces/endpoints/poll.external");
const HelixPaginatedRequest_1 = require("../../utils/pagination/HelixPaginatedRequest");
const HelixPaginatedResult_1 = require("../../utils/pagination/HelixPaginatedResult");
const HelixPagination_1 = require("../../utils/pagination/HelixPagination");
const BaseApi_1 = require("../BaseApi");
const HelixPoll_1 = require("./HelixPoll");
/**
 * The Helix API methods that deal with polls.
 *
 * Can be accessed using `client.polls` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: polls } = await api.helix.polls.getPolls('61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Polls
 */
let HelixPollApi = class HelixPollApi extends BaseApi_1.BaseApi {
    /**
     * Gets a list of polls for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get polls for.
     * @param pagination
     *
     * @expandParams
     */
    async getPolls(broadcaster, pagination) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'polls',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:polls'],
            query: {
                ...(0, api_call_1.createBroadcasterQuery)(broadcaster),
                ...(0, HelixPagination_1.createPaginationQuery)(pagination),
            },
        });
        return (0, HelixPaginatedResult_1.createPaginatedResult)(result, HelixPoll_1.HelixPoll, this._client);
    }
    /**
     * Creates a paginator for polls for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get polls for.
     */
    getPollsPaginated(broadcaster) {
        return new HelixPaginatedRequest_1.HelixPaginatedRequest({
            url: 'polls',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:polls'],
            query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        }, this._client, data => new HelixPoll_1.HelixPoll(data, this._client), 20);
    }
    /**
     * Gets polls by IDs.
     *
     * @param broadcaster The broadcaster to get the polls for.
     * @param ids The IDs of the polls.
     */
    async getPollsByIds(broadcaster, ids) {
        if (!ids.length) {
            return [];
        }
        const result = await this._client.callApi({
            type: 'helix',
            url: 'polls',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:read:polls'],
            query: (0, generic_external_1.createGetByIdsQuery)(broadcaster, ids),
        });
        return result.data.map(data => new HelixPoll_1.HelixPoll(data, this._client));
    }
    /**
     * Gets a poll by ID.
     *
     * @param broadcaster The broadcaster to get the poll for.
     * @param id The ID of the poll.
     */
    async getPollById(broadcaster, id) {
        const polls = await this.getPollsByIds(broadcaster, [id]);
        return polls.length ? polls[0] : null;
    }
    /**
     * Creates a new poll.
     *
     * @param broadcaster The broadcaster to create the poll for.
     * @param data
     *
     * @expandParams
     */
    async createPoll(broadcaster, data) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'polls',
            method: 'POST',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:manage:polls'],
            jsonBody: (0, poll_external_1.createPollBody)(broadcaster, data),
        });
        return new HelixPoll_1.HelixPoll(result.data[0], this._client);
    }
    /**
     * Ends a poll.
     *
     * @param broadcaster The broadcaster to end the poll for.
     * @param id The ID of the poll to end.
     * @param showResult Whether to allow the result to be viewed publicly.
     */
    async endPoll(broadcaster, id, showResult = true) {
        const result = await this._client.callApi({
            type: 'helix',
            url: 'polls',
            method: 'PATCH',
            userId: (0, common_1.extractUserId)(broadcaster),
            scopes: ['channel:manage:polls'],
            jsonBody: (0, poll_external_1.createPollEndBody)(broadcaster, id, showResult),
        });
        return new HelixPoll_1.HelixPoll(result.data[0], this._client);
    }
};
HelixPollApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPollApi')
], HelixPollApi);
exports.HelixPollApi = HelixPollApi;
