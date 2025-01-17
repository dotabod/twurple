"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPoll = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const HelixPollChoice_1 = require("./HelixPollChoice");
/**
 * A channel poll.
 */
let HelixPoll = class HelixPoll extends common_1.DataObject {
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
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].broadcaster_id));
    }
    /**
     * The title of the poll.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * Whether voting with channel points is enabled for the poll.
     */
    get isChannelPointsVotingEnabled() {
        return this[common_1.rawDataSymbol].channel_points_voting_enabled;
    }
    /**
     * The amount of channel points that a vote costs.
     */
    get channelPointsPerVote() {
        return this[common_1.rawDataSymbol].channel_points_per_vote;
    }
    /**
     * The status of the poll.
     */
    get status() {
        return this[common_1.rawDataSymbol].status;
    }
    /**
     * The duration of the poll, in seconds.
     */
    get durationInSeconds() {
        return this[common_1.rawDataSymbol].duration;
    }
    /**
     * The date when the poll started.
     */
    get startDate() {
        return new Date(this[common_1.rawDataSymbol].started_at);
    }
    /**
     * The date when the poll ended or will end.
     */
    get endDate() {
        return new Date(this.startDate.getTime() + this[common_1.rawDataSymbol].duration * 1000);
    }
    /**
     * The choices of the poll.
     */
    get choices() {
        return this[common_1.rawDataSymbol].choices.map(data => new HelixPollChoice_1.HelixPollChoice(data));
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixPoll.prototype, "_client", void 0);
HelixPoll = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPoll', 'id')
], HelixPoll);
exports.HelixPoll = HelixPoll;
