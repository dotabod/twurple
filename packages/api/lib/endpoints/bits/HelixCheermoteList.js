"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixCheermoteList = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A list of cheermotes you can use globally or in a specific channel, depending on how you fetched the list.
 *
 * @inheritDoc
 */
let HelixCheermoteList = class HelixCheermoteList extends common_1.DataObject {
    /** @internal */
    constructor(data) {
        super((0, shared_utils_1.indexBy)(data, action => action.prefix.toLowerCase()));
    }
    /**
     * Gets the URL and color needed to properly represent a cheer of the given amount of bits with the given prefix.
     *
     * @param name The name/prefix of the cheermote.
     * @param bits The amount of bits cheered.
     * @param format The format of the cheermote you want to request.
     */
    getCheermoteDisplayInfo(name, bits, format) {
        name = name.toLowerCase();
        const { background, state, scale } = format;
        const { tiers } = this[common_1.rawDataSymbol][name];
        const correctTier = tiers.sort((a, b) => b.min_bits - a.min_bits).find(tier => tier.min_bits <= bits);
        if (!correctTier) {
            throw new common_1.HellFreezesOverError(`Cheermote "${name}" does not have an applicable tier for ${bits} bits`);
        }
        return {
            url: correctTier.images[background][state][scale],
            color: correctTier.color,
        };
    }
    /**
     * Gets all possible cheermote names.
     */
    getPossibleNames() {
        return Object.keys(this[common_1.rawDataSymbol]);
    }
};
HelixCheermoteList = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixCheermoteList')
], HelixCheermoteList);
exports.HelixCheermoteList = HelixCheermoteList;
