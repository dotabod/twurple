import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixPollChoice } from "./HelixPollChoice.mjs";
/**
 * A channel poll.
 */
let HelixPoll = class HelixPoll extends DataObject {
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
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The title of the poll.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * Whether voting with channel points is enabled for the poll.
     */
    get isChannelPointsVotingEnabled() {
        return this[rawDataSymbol].channel_points_voting_enabled;
    }
    /**
     * The amount of channel points that a vote costs.
     */
    get channelPointsPerVote() {
        return this[rawDataSymbol].channel_points_per_vote;
    }
    /**
     * The status of the poll.
     */
    get status() {
        return this[rawDataSymbol].status;
    }
    /**
     * The duration of the poll, in seconds.
     */
    get durationInSeconds() {
        return this[rawDataSymbol].duration;
    }
    /**
     * The date when the poll started.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].started_at);
    }
    /**
     * The date when the poll ended or will end.
     */
    get endDate() {
        return new Date(this.startDate.getTime() + this[rawDataSymbol].duration * 1000);
    }
    /**
     * The choices of the poll.
     */
    get choices() {
        return this[rawDataSymbol].choices.map(data => new HelixPollChoice(data));
    }
};
__decorate([
    Enumerable(false)
], HelixPoll.prototype, "_client", void 0);
HelixPoll = __decorate([
    rtfm('api', 'HelixPoll', 'id')
], HelixPoll);
export { HelixPoll };
