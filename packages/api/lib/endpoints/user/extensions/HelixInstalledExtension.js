"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixInstalledExtension = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixBaseExtension_1 = require("./HelixBaseExtension");
/**
 * A Twitch Extension that is installed in a slot of a channel.
 *
 * @inheritDoc
 */
let HelixInstalledExtension = class HelixInstalledExtension extends HelixBaseExtension_1.HelixBaseExtension {
    /** @internal */
    constructor(slotType, slotId, data) {
        super(data);
        this._slotType = slotType;
        this._slotId = slotId;
    }
    /**
     * The type of the slot the extension is in.
     */
    get slotType() {
        return this._slotType;
    }
    /**
     * The ID of the slot the extension is in.
     */
    get slotId() {
        return this._slotId;
    }
};
HelixInstalledExtension = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixInstalledExtension', 'id')
], HelixInstalledExtension);
exports.HelixInstalledExtension = HelixInstalledExtension;
