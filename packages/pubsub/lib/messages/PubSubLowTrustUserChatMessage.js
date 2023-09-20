"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubLowTrustUserChatMessage = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A message that informs about a new chat message from a low-trust user.
 */
let PubSubLowTrustUserChatMessage = class PubSubLowTrustUserChatMessage extends common_1.DataObject {
    /**
     * The ID of the channel where the suspicious user was present.
     */
    get channelId() {
        return this[common_1.rawDataSymbol].data.low_trust_user.channel_id;
    }
    /**
     * The unique ID of this low-trust event.
     */
    get lowTrustId() {
        return this[common_1.rawDataSymbol].data.low_trust_user.low_trust_id;
    }
    /**
     * The user ID of the moderator.
     */
    get moderatorId() {
        return this[common_1.rawDataSymbol].data.low_trust_user.updated_by.id;
    }
    /**
     * The name of the moderator.
     */
    get moderatorName() {
        return this[common_1.rawDataSymbol].data.low_trust_user.updated_by.login;
    }
    /**
     * The display name of the moderator.
     */
    get moderatorDisplayName() {
        return this[common_1.rawDataSymbol].data.low_trust_user.updated_by.display_name;
    }
    /**
     * The date of when the treatment was updated for the suspicious user.
     */
    get updateDate() {
        return new Date(this[common_1.rawDataSymbol].data.low_trust_user.updated_at);
    }
    /**
     * The user ID of the suspicious user.
     */
    get userId() {
        return this[common_1.rawDataSymbol].data.low_trust_user.sender.user_id;
    }
    /**
     * The name of the suspicious user.
     */
    get userName() {
        return this[common_1.rawDataSymbol].data.low_trust_user.sender.login;
    }
    /**
     * The display name of the suspicious user.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].data.low_trust_user.sender.display_name;
    }
    /**
     * The treatment set for the suspicious user.
     */
    get treatment() {
        return this[common_1.rawDataSymbol].data.low_trust_user.treatment;
    }
    /**
     * User types (if any) that apply to the suspicious user.
     */
    get types() {
        return this[common_1.rawDataSymbol].data.low_trust_user.types;
    }
    /**
     * The ban evasion likelihood value that as been applied to the user automatically by Twitch.
     *
     * Can be an empty string if Twitch did not apply any evasion value.
     */
    get banEvasionEvaluation() {
        return this[common_1.rawDataSymbol].data.low_trust_user.ban_evasion_evaluation;
    }
    /**
     * The date for the first time the suspicious user was automatically evaluated by Twitch.
     *
     * Will be `null` if {@link PubSubLowTrustUserChatMessage#banEvasionEvaluation} is empty.
     */
    get evaluationDate() {
        // PubSub sends `0001-01-01T00:00:00.000Z` string if the field is not applicable
        const date = this[common_1.rawDataSymbol].data.low_trust_user.evaluated_at
            ? new Date(this[common_1.rawDataSymbol].data.low_trust_user.evaluated_at)
            : undefined;
        return date && date.getTime() > 0 ? date : null;
    }
    /**
     * A list of channel IDs where the suspicious user is also banned.
     */
    get sharedBanChannelIds() {
        var _a;
        return (_a = this[common_1.rawDataSymbol].data.low_trust_user.shared_ban_channel_ids) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * The ID of the chat message.
     */
    get messageId() {
        return this[common_1.rawDataSymbol].data.message_id;
    }
    /**
     * Plain text of the message sent.
     */
    get content() {
        return this[common_1.rawDataSymbol].data.message_content.text;
    }
    /**
     * Fragments contained in the message, including emotes.
     */
    get fragments() {
        return this[common_1.rawDataSymbol].data.message_content.fragments;
    }
    /**
     * Date when the chat message was sent.
     */
    get sendDate() {
        return new Date(this[common_1.rawDataSymbol].data.sent_at);
    }
};
PubSubLowTrustUserChatMessage = tslib_1.__decorate([
    (0, common_1.rtfm)('pubsub', 'PubSubLowTrustUserChatMessage', 'lowTrustId')
], PubSubLowTrustUserChatMessage);
exports.PubSubLowTrustUserChatMessage = PubSubLowTrustUserChatMessage;
