import { __decorate } from "tslib";
import { createBroadcasterQuery, HttpStatusCodeError } from '@twurple/api-call';
import { extractUserId, rtfm } from '@twurple/common';
import { BaseApi } from "../BaseApi.mjs";
import { HelixTeam } from "./HelixTeam.mjs";
import { HelixTeamWithUsers } from "./HelixTeamWithUsers.mjs";
/**
 * The Helix API methods that deal with teams.
 *
 * Can be accessed using `client.teams` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const tags = await api.teams.getChannelTeams('125328655');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Teams
 */
let HelixTeamApi = class HelixTeamApi extends BaseApi {
    /**
     * Gets a list of all teams a broadcaster is a member of.
     *
     * @param broadcaster The broadcaster to get the teams of.
     */
    async getTeamsForBroadcaster(broadcaster) {
        var _a, _b;
        const result = await this._client.callApi({
            type: 'helix',
            url: 'teams/channel',
            userId: extractUserId(broadcaster),
            query: createBroadcasterQuery(broadcaster),
        });
        return (_b = (_a = result.data) === null || _a === void 0 ? void 0 : _a.map(data => new HelixTeam(data, this._client))) !== null && _b !== void 0 ? _b : [];
    }
    /**
     * Gets a team by ID.
     *
     * Returns null if there is no team with the given ID.
     *
     * @param id The ID of the team.
     */
    async getTeamById(id) {
        try {
            const result = await this._client.callApi({
                type: 'helix',
                url: 'teams',
                query: {
                    id,
                },
            });
            return new HelixTeamWithUsers(result.data[0], this._client);
        }
        catch (e) {
            // Twitch, please...
            if (e instanceof HttpStatusCodeError && e.statusCode === 500) {
                return null;
            }
            throw e;
        }
    }
    /**
     * Gets a team by name.
     *
     * Returns null if there is no team with the given name.
     *
     * @param name The name of the team.
     */
    async getTeamByName(name) {
        try {
            const result = await this._client.callApi({
                type: 'helix',
                url: 'teams',
                query: {
                    name,
                },
            });
            return new HelixTeamWithUsers(result.data[0], this._client);
        }
        catch (e) {
            // ...but this one is fine
            if (e instanceof HttpStatusCodeError && e.statusCode === 404) {
                return null;
            }
            throw e;
        }
    }
};
HelixTeamApi = __decorate([
    rtfm('api', 'HelixTeamApi')
], HelixTeamApi);
export { HelixTeamApi };
