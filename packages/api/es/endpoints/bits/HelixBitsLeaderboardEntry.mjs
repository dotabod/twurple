import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A Bits leaderboard entry.
 */
let HelixBitsLeaderboardEntry = class HelixBitsLeaderboardEntry extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user on the leaderboard.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The name of the user on the leaderboard.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The display name of the user on the leaderboard.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * The position of the user on the leaderboard.
     */
    get rank() {
        return this[rawDataSymbol].rank;
    }
    /**
     * The amount of bits used in the given period of time.
     */
    get amount() {
        return this[rawDataSymbol].score;
    }
    /**
     * Gets the user of entry on the leaderboard.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
};
__decorate([
    Enumerable(false)
], HelixBitsLeaderboardEntry.prototype, "_client", void 0);
HelixBitsLeaderboardEntry = __decorate([
    rtfm('api', 'HelixBitsLeaderboardEntry', 'userId')
], HelixBitsLeaderboardEntry);
export { HelixBitsLeaderboardEntry };
