"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChatMessage = exports.fillTextPositions = exports.findCheermotePositions = exports.parseEmotePositions = void 0;
const shared_utils_1 = require("@d-fischer/shared-utils");
/**
 * Transforms the parts of the given text that are marked as emotes.
 *
 * @param text The message text.
 * @param emoteOffsets The emote offsets. An emote name maps to a list of text ranges.
 */
function parseEmotePositions(text, emoteOffsets) {
    return [...emoteOffsets.entries()]
        .flatMap(([emote, placements]) => placements.map((placement) => {
        const [startStr, endStr] = placement.split('-');
        const start = +startStr;
        const end = +endStr;
        const name = (0, shared_utils_1.utf8Substring)(text, start, end + 1);
        return {
            type: 'emote',
            position: start,
            length: end - start + 1,
            id: emote,
            name,
        };
    }))
        .sort((a, b) => a.position - b.position);
}
exports.parseEmotePositions = parseEmotePositions;
/**
 * Finds the positions of all cheermotes in the given message.
 *
 * @param text The message text.
 * @param names The names of the cheermotes to find.
 */
function findCheermotePositions(text, names) {
    const result = [];
    const re = new RegExp('(?<=^|\\s)([a-z]+(?:\\d+[a-z]+)*)(\\d+)(?=\\s|$)', 'gi');
    let match = null;
    while ((match = re.exec(text))) {
        const name = match[1].toLowerCase();
        if (names.includes(name)) {
            const amount = Number(match[2]);
            result.push({
                type: 'cheer',
                name,
                amount,
                position: (0, shared_utils_1.utf8Length)(text.slice(0, match.index)),
                length: match[0].length,
            });
        }
    }
    return result;
}
exports.findCheermotePositions = findCheermotePositions;
/**
 * Add text parts to the given list of message parts for all the text that's unaccounted for.
 *
 * @param text The message text.
 * @param otherPositions The parsed non-text parts of the message.
 */
function fillTextPositions(text, otherPositions) {
    const messageLength = (0, shared_utils_1.utf8Length)(text);
    if (!otherPositions.length) {
        return [
            {
                type: 'text',
                position: 0,
                length: messageLength,
                text,
            },
        ];
    }
    const result = [];
    let currentPosition = 0;
    for (const token of otherPositions) {
        if (token.position > currentPosition) {
            result.push({
                type: 'text',
                position: currentPosition,
                length: token.position - currentPosition,
                text: (0, shared_utils_1.utf8Substring)(text, currentPosition, token.position),
            });
        }
        result.push(token);
        currentPosition = token.position + token.length;
    }
    if (currentPosition < messageLength) {
        result.push({
            type: 'text',
            position: currentPosition,
            length: messageLength - currentPosition,
            text: (0, shared_utils_1.utf8Substring)(text, currentPosition),
        });
    }
    return result;
}
exports.fillTextPositions = fillTextPositions;
/**
 * Parse a chat message with emotes and optionally cheermotes.
 *
 * @param text The message text.
 * @param emoteOffsets The emote offsets. An emote name maps to a list of text ranges.
 * @param cheermoteNames The names of the cheermotes to find. Will not do cheermote parsing if not given.
 */
function parseChatMessage(text, emoteOffsets, cheermoteNames) {
    if (!text) {
        return [];
    }
    const foundParts = parseEmotePositions(text, emoteOffsets);
    if (cheermoteNames) {
        foundParts.push(...findCheermotePositions(text, cheermoteNames));
        foundParts.sort((a, b) => a.position - b.position);
    }
    return fillTextPositions(text, foundParts);
}
exports.parseChatMessage = parseChatMessage;
