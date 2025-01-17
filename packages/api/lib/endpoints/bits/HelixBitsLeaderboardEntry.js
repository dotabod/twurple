"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixBitsLeaderboardEntry = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A Bits leaderboard entry.
 */
let HelixBitsLeaderboardEntry = class HelixBitsLeaderboardEntry extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user on the leaderboard.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user on the leaderboard.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user on the leaderboard.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * The position of the user on the leaderboard.
     */
    get rank() {
        return this[common_1.rawDataSymbol].rank;
    }
    /**
     * The amount of bits used in the given period of time.
     */
    get amount() {
        return this[common_1.rawDataSymbol].score;
    }
    /**
     * Gets the user of entry on the leaderboard.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixBitsLeaderboardEntry.prototype, "_client", void 0);
HelixBitsLeaderboardEntry = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixBitsLeaderboardEntry', 'userId')
], HelixBitsLeaderboardEntry);
exports.HelixBitsLeaderboardEntry = HelixBitsLeaderboardEntry;
