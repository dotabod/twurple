"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubChatModActionMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a moderation action being performed in a channel.
 */
let PubSubChatModActionMessage = class PubSubChatModActionMessage extends common_1.DataObject {
    /** @internal */
    constructor(data, _channelId) {
        super(data);
        this._channelId = _channelId;
    }
    /**
     * The ID of the channel where the action was performed.
     */
    get channelId() {
        return this._channelId;
    }
    /**
     * The type of the message.
     */
    get type() {
        return this[common_1.rawDataSymbol].data.type;
    }
    /**
     * The action that was performed.
     */
    get action() {
        return this[common_1.rawDataSymbol].data.moderation_action;
    }
    /**
     * The arguments given to the action.
     */
    get args() {
        return this[common_1.rawDataSymbol].data.args;
    }
    /**
     * The user ID of the moderator that performed the action.
     */
    get userId() {
        return this[common_1.rawDataSymbol].data.created_by_user_id;
    }
    /**
     * The name of the moderator that performed the action.
     */
    get userName() {
        return this[common_1.rawDataSymbol].data.created_by;
    }
};
PubSubChatModActionMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubChatModActionMessage', 'userId')
], PubSubChatModActionMessage);
exports.PubSubChatModActionMessage = PubSubChatModActionMessage;
