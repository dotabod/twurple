"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPollBeginEvent = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const EventSubChannelPollBeginChoice_1 = require("./common/EventSubChannelPollBeginChoice");
/**
 * An EventSub event representing a poll starting in a channel.
 */
let EventSubChannelPollBeginEvent = class EventSubChannelPollBeginEvent extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the poll.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[common_1.rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[common_1.rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
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
     * The title of the poll.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The choices of the poll.
     */
    get choices() {
        return this[common_1.rawDataSymbol].choices.map(data => new EventSubChannelPollBeginChoice_1.EventSubChannelPollBeginChoice(data));
    }
    /**
     * Whether voting with bits is enabled.
     */
    get isBitsVotingEnabled() {
        return this[common_1.rawDataSymbol].bits_voting.is_enabled;
    }
    /**
     * The amount of bits a vote costs.
     */
    get bitsPerVote() {
        return this[common_1.rawDataSymbol].bits_voting.amount_per_vote;
    }
    /**
     * Whether voting with channel points is enabled.
     */
    get isChannelPointsVotingEnabled() {
        return this[common_1.rawDataSymbol].channel_points_voting.is_enabled;
    }
    /**
     * The amount of channel points a vote costs.
     */
    get channelPointsPerVote() {
        return this[common_1.rawDataSymbol].channel_points_voting.amount_per_vote;
    }
    /**
     * The time when the poll started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The time when the poll ends.
     */
    get endDate() {
        return new Date(this[common_1.rawDataSymbol].ends_at);
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubChannelPollBeginEvent.prototype, "_client", void 0);
EventSubChannelPollBeginEvent = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPollBeginEvent', 'broadcasterId')
], EventSubChannelPollBeginEvent);
exports.EventSubChannelPollBeginEvent = EventSubChannelPollBeginEvent;
