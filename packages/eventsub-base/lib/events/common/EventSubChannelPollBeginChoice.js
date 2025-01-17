"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPollBeginChoice = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
/**
 * A choice in a poll, as defined when beginning that poll.
 */
let EventSubChannelPollBeginChoice = class EventSubChannelPollBeginChoice extends common_1.DataObject {
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
};
EventSubChannelPollBeginChoice = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-base', 'EventSubChannelPollBeginChoice', 'id')
], EventSubChannelPollBeginChoice);
exports.EventSubChannelPollBeginChoice = EventSubChannelPollBeginChoice;
