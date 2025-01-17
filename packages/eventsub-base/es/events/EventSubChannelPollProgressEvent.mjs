import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { EventSubChannelPollChoice } from "./common/EventSubChannelPollChoice.mjs";
/**
 * An EventSub event representing a poll starting in a channel.
 */
let EventSubChannelPollProgressEvent = class EventSubChannelPollProgressEvent extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the poll.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The ID of the broadcaster.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_user_id;
    }
    /**
     * The name of the broadcaster.
     */
    get broadcasterName() {
        return this[rawDataSymbol].broadcaster_user_login;
    }
    /**
     * The display name of the broadcaster.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_user_name;
    }
    /**
     * Gets more information about the broadcaster.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_user_id));
    }
    /**
     * The title of the poll.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The choices of the poll.
     */
    get choices() {
        return this[rawDataSymbol].choices.map(data => new EventSubChannelPollChoice(data));
    }
    /**
     * Whether voting with bits is enabled.
     */
    get isBitsVotingEnabled() {
        return this[rawDataSymbol].bits_voting.is_enabled;
    }
    /**
     * The amount of bits a vote costs.
     */
    get bitsPerVote() {
        return this[rawDataSymbol].bits_voting.amount_per_vote;
    }
    /**
     * Whether voting with channel points is enabled.
     */
    get isChannelPointsVotingEnabled() {
        return this[rawDataSymbol].channel_points_voting.is_enabled;
    }
    /**
     * The amount of channel points a vote costs.
     */
    get channelPointsPerVote() {
        return this[rawDataSymbol].channel_points_voting.amount_per_vote;
    }
    /**
     * The time when the poll started.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].started_at);
    }
    /**
     * The time when the poll ended.
     */
    get endDate() {
        return new Date(this[rawDataSymbol].ends_at);
    }
};
__decorate([
    Enumerable(false)
], EventSubChannelPollProgressEvent.prototype, "_client", void 0);
EventSubChannelPollProgressEvent = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPollProgressEvent', 'broadcasterId')
], EventSubChannelPollProgressEvent);
export { EventSubChannelPollProgressEvent };
