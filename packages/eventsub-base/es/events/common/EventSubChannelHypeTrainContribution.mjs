import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol } from '@twurple/common';
export class EventSubChannelHypeTrainContribution extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The contributor's ID.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The contributor's user name.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The contributor's display name.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets more information about the contributor.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The type of the contribution.
     */
    get type() {
        return this[rawDataSymbol].type;
    }
    /**
     * The contributor's total contribution.
     */
    get total() {
        return this[rawDataSymbol].total;
    }
}
__decorate([
    Enumerable(false)
], EventSubChannelHypeTrainContribution.prototype, "_client", void 0);
