"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubWhisperMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message informing about a whisper being received from another user.
 */
let PubSubWhisperMessage = class PubSubWhisperMessage extends common_1.DataObject {
    /**
     * The message text.
     */
    get text() {
        return this[common_1.rawDataSymbol].data_object.body;
    }
    /**
     * The ID of the user who sent the whisper.
     */
    get senderId() {
        return this[common_1.rawDataSymbol].data_object.from_id.toString();
    }
    /**
     * The name of the user who sent the whisper.
     */
    get senderName() {
        return this[common_1.rawDataSymbol].data_object.tags.login;
    }
    /**
     * The display name of the user who sent the whisper.
     */
    get senderDisplayName() {
        return this[common_1.rawDataSymbol].data_object.tags.display_name;
    }
};
PubSubWhisperMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubWhisperMessage', 'senderId')
], PubSubWhisperMessage);
exports.PubSubWhisperMessage = PubSubWhisperMessage;
