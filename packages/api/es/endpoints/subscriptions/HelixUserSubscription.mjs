import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * The user info about a (paid) subscription to a broadcaster.
 */
let HelixUserSubscription = class HelixUserSubscription extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The user ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id);
    }
    /**
     * Whether the subscription has been gifted by another user.
     */
    get isGift() {
        return this[rawDataSymbol].is_gift;
    }
    /**
     * The tier of the subscription.
     */
    get tier() {
        return this[rawDataSymbol].tier;
    }
};
__decorate([
    Enumerable(false)
], HelixUserSubscription.prototype, "_client", void 0);
HelixUserSubscription = __decorate([
    rtfm('api', 'HelixUserSubscription', 'broadcasterId')
], HelixUserSubscription);
export { HelixUserSubscription };
