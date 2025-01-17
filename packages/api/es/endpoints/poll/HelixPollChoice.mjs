import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A choice in a channel poll.
 */
let HelixPollChoice = class HelixPollChoice extends DataObject {
    /**
     * The ID of the choice.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The title of the choice.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The total votes the choice received.
     */
    get totalVotes() {
        return this[rawDataSymbol].votes;
    }
    /**
     * The votes the choice received by spending channel points.
     */
    get channelPointsVotes() {
        return this[rawDataSymbol].channel_points_votes;
    }
};
HelixPollChoice = __decorate([
    rtfm('api', 'HelixPollChoice', 'id')
], HelixPollChoice);
export { HelixPollChoice };
