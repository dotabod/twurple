"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixBitsLeaderboard = void 0;
const tslib_1 = require("tslib");
const cache_decorators_1 = require("@d-fischer/cache-decorators");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixBitsLeaderboardEntry_1 = require("./HelixBitsLeaderboardEntry");
/**
 * A leaderboard where the users who used the most bits to a broadcaster are listed.
 */
let HelixBitsLeaderboard = class HelixBitsLeaderboard extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The entries of the leaderboard.
     */
    get entries() {
        return this[common_1.rawDataSymbol].data.map(entry => new HelixBitsLeaderboardEntry_1.HelixBitsLeaderboardEntry(entry, this._client));
    }
    /**
     * The total amount of people on the requested leaderboard.
     */
    get totalCount() {
        return this[common_1.rawDataSymbol].total;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixBitsLeaderboard.prototype, "_client", void 0);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], HelixBitsLeaderboard.prototype, "entries", null);
HelixBitsLeaderboard = tslib_1.__decorate([
    cache_decorators_1.Cacheable,
    (0, common_1.rtfm)('api', 'HelixBitsLeaderboard')
], HelixBitsLeaderboard);
exports.HelixBitsLeaderboard = HelixBitsLeaderboard;
