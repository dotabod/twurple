import { __decorate } from "tslib";
import { Cacheable, CachedGetter } from '@d-fischer/cache-decorators';
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixBitsLeaderboardEntry } from "./HelixBitsLeaderboardEntry.mjs";
/**
 * A leaderboard where the users who used the most bits to a broadcaster are listed.
 */
let HelixBitsLeaderboard = class HelixBitsLeaderboard extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The entries of the leaderboard.
     */
    get entries() {
        return this[rawDataSymbol].data.map(entry => new HelixBitsLeaderboardEntry(entry, this._client));
    }
    /**
     * The total amount of people on the requested leaderboard.
     */
    get totalCount() {
        return this[rawDataSymbol].total;
    }
};
__decorate([
    Enumerable(false)
], HelixBitsLeaderboard.prototype, "_client", void 0);
__decorate([
    CachedGetter()
], HelixBitsLeaderboard.prototype, "entries", null);
HelixBitsLeaderboard = __decorate([
    Cacheable,
    rtfm('api', 'HelixBitsLeaderboard')
], HelixBitsLeaderboard);
export { HelixBitsLeaderboard };
