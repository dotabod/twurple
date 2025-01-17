import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A relation of a user following a broadcaster.
 */
let HelixFollow = class HelixFollow extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The user ID of the following user.
     */
    get userId() {
        return this[rawDataSymbol].from_id;
    }
    /**
     * The name of the following user.
     */
    get userName() {
        return this[rawDataSymbol].from_login;
    }
    /**
     * The display name of the following user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].from_name;
    }
    /**
     * Gets the data of the following user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].from_id));
    }
    /**
     * The user ID of the followed broadcaster.
     */
    get followedUserId() {
        return this[rawDataSymbol].to_id;
    }
    /**
     * The name of the followed user.
     */
    get followedUserName() {
        return this[rawDataSymbol].to_login;
    }
    /**
     * The display name of the followed user.
     */
    get followedUserDisplayName() {
        return this[rawDataSymbol].to_name;
    }
    /**
     * Gets the data of the followed broadcaster.
     */
    async getFollowedUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].to_id));
    }
    /**
     * The date when the user followed the broadcaster.
     */
    get followDate() {
        return new Date(this[rawDataSymbol].followed_at);
    }
};
__decorate([
    Enumerable(false)
], HelixFollow.prototype, "_client", void 0);
HelixFollow = __decorate([
    rtfm('api', 'HelixFollow')
], HelixFollow);
export { HelixFollow };
