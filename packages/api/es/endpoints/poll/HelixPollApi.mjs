import { __decorate } from "tslib";
import { createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { createGetByIdsQuery } from "../../interfaces/endpoints/generic.external.mjs";
import { createPollBody, createPollEndBody } from "../../interfaces/endpoints/poll.external.mjs";
import { HelixPaginatedRequest } from "../../utils/pagination/HelixPaginatedRequest.mjs";
import { createPaginatedResult } from "../../utils/pagination/HelixPaginatedResult.mjs";
import { createPaginationQuery } from "../../utils/pagination/HelixPagination.mjs";
import { BaseApi } from "../BaseApi.mjs";
import { HelixPoll } from "./HelixPoll.mjs";
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
let HelixPollApi = class HelixPollApi extends BaseApi {
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
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:polls'],
            query: {
                ...createBroadcasterQuery(broadcaster),
                ...createPaginationQuery(pagination),
            },
        });
        return createPaginatedResult(result, HelixPoll, this._client);
    }
    /**
     * Creates a paginator for polls for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get polls for.
     */
    getPollsPaginated(broadcaster) {
        return new HelixPaginatedRequest({
            url: 'polls',
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:polls'],
            query: createBroadcasterQuery(broadcaster),
        }, this._client, data => new HelixPoll(data, this._client), 20);
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
            userId: extractUserId(broadcaster),
            scopes: ['channel:read:polls'],
            query: createGetByIdsQuery(broadcaster, ids),
        });
        return result.data.map(data => new HelixPoll(data, this._client));
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
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:polls'],
            jsonBody: createPollBody(broadcaster, data),
        });
        return new HelixPoll(result.data[0], this._client);
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
            userId: extractUserId(broadcaster),
            scopes: ['channel:manage:polls'],
            jsonBody: createPollEndBody(broadcaster, id, showResult),
        });
        return new HelixPoll(result.data[0], this._client);
    }
};
HelixPollApi = __decorate([
    rtfm('api', 'HelixPollApi')
], HelixPollApi);
export { HelixPollApi };
