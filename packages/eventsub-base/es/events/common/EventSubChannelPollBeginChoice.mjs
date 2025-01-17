import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A choice in a poll, as defined when beginning that poll.
 */
let EventSubChannelPollBeginChoice = class EventSubChannelPollBeginChoice extends DataObject {
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
};
EventSubChannelPollBeginChoice = __decorate([
    rtfm('eventsub-base', 'EventSubChannelPollBeginChoice', 'id')
], EventSubChannelPollBeginChoice);
export { EventSubChannelPollBeginChoice };
