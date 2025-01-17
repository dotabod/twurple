"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPollChoice = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A choice in a channel poll.
 */
let HelixPollChoice = class HelixPollChoice extends common_1.DataObject {
    /**
     * The ID of the choice.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The title of the choice.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The total votes the choice received.
     */
    get totalVotes() {
        return this[common_1.rawDataSymbol].votes;
    }
    /**
     * The votes the choice received by spending channel points.
     */
    get channelPointsVotes() {
        return this[common_1.rawDataSymbol].channel_points_votes;
    }
};
HelixPollChoice = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPollChoice', 'id')
], HelixPollChoice);
exports.HelixPollChoice = HelixPollChoice;
