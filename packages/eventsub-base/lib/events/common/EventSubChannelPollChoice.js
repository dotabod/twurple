"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPollChoice = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const EventSubChannelPollBeginChoice_1 = require("./EventSubChannelPollBeginChoice");
/**
 * A choice in a poll.
 *
 * @inheritDoc
 */
let EventSubChannelPollChoice = class EventSubChannelPollChoice extends EventSubChannelPollBeginChoice_1.EventSubChannelPollBeginChoice {
    /**
     * The number of votes for the choice added by using channel points.
     */
    get channelPointsVotes() {
        return this[common_1.rawDataSymbol].channel_points_votes;
    }
    /**
     * The total number of votes for the choice, including bits and channel points.
     */
    get totalVotes() {
        return this[common_1.rawDataSymbol].votes;
    }
};
EventSubChannelPollChoice = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPollChoice', 'id')
], EventSubChannelPollChoice);
exports.EventSubChannelPollChoice = EventSubChannelPollChoice;
