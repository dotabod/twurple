"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelShieldModeEndEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * An EventSub event representing Shield Mode being deactivated on a broadcaster's channel.
 */
let EventSubChannelShieldModeEndEvent = class EventSubChannelShieldModeEndEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the broadcaster on whose channel Shield Mode was deactivated.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster on whose channel Shield Mode was deactivated.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster on whose channel Shield Mode was deactivated.
     */
    get broadcasterDisplayName() {
        return this[common_1.rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The ID of the moderator who deactivated Shield Mode.
     */
    get moderatorId() {
        return this[common_1.rawDataSymbol].moderator_user_id;
    }
    /**
     * The name of the moderator who deactivated Shield Mode.
     */
    get moderatorName() {
        return this[common_1.rawDataSymbol].moderator_user_login;
    }
    /**
     * The display name of the moderator who deactivated Shield Mode
     */
    get moderatorDisplayName() {
        return this[common_1.rawDataSymbol].moderator_user_name;
    }
    /**
     * Gets more information about the moderator.
     */
    async getModerator() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].moderator_user_id));
    }
    /**
     * The date when Shield Mode was deactivated.
     */
    get endDate() {
        return new Date(this[common_1.rawDataSymbol].ended_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelShieldModeEndEvent.prototype, "_client", void 0);
EventSubChannelShieldModeEndEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelShieldModeEndEvent')
], EventSubChannelShieldModeEndEvent);
exports.EventSubChannelShieldModeEndEvent = EventSubChannelShieldModeEndEvent;
