import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An editor of a previously given channel.
 */
let HelixChannelEditor = class HelixChannelEditor extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the user.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The display name of the user.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets additional information about the user.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The date when the user was given editor status.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
};
__decorate([
    Enumerable(false)
], HelixChannelEditor.prototype, "_client", void 0);
HelixChannelEditor = __decorate([
    rtfm('api', 'HelixChannelEditor', 'userId')
], HelixChannelEditor);
export { HelixChannelEditor };
