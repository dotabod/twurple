"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixUserSubscription = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * The user info about a (paid) subscription to a broadcaster.
 */
let HelixUserSubscription = class HelixUserSubscription extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The user ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id);
    }
    /**
     * Whether the subscription has been gifted by another user.
     */
    get isGift() {
        return this[common_1.rawDataSymbol].is_gift;
    }
    /**
     * The tier of the subscription.
     */
    get tier() {
        return this[common_1.rawDataSymbol].tier;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixUserSubscription.prototype, "_client", void 0);
HelixUserSubscription = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixUserSubscription', 'broadcasterId')
], HelixUserSubscription);
exports.HelixUserSubscription = HelixUserSubscription;
