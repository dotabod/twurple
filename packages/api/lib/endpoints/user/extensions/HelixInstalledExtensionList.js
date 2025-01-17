"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixInstalledExtensionList = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixInstalledExtension_1 = require("./HelixInstalledExtension");
/**
 * A list of extensions installed in a channel.
 */
let HelixInstalledExtensionList = class HelixInstalledExtensionList extends common_1.DataObject {
    getExtensionAtSlot(type, slotId) {
        const data = this[common_1.rawDataSymbol][type][slotId];
        return data.active ? new HelixInstalledExtension_1.HelixInstalledExtension(type, slotId, data) : null;
    }
    getExtensionsForSlotType(type) {
        return [...Object.entries(this[common_1.rawDataSymbol][type])]
            .filter((entry) => entry[1].active)
            .map(([slotId, slotData]) => new HelixInstalledExtension_1.HelixInstalledExtension(type, slotId, slotData));
    }
    getAllExtensions() {
        return [...Object.entries(this[common_1.rawDataSymbol])].flatMap(([type, typeEntries]) => [...Object.entries(typeEntries)]
            .filter((entry) => entry[1].active)
            .map(([slotId, slotData]) => new HelixInstalledExtension_1.HelixInstalledExtension(type, slotId, slotData)));
    }
};
HelixInstalledExtensionList = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixInstalledExtensionList')
], HelixInstalledExtensionList);
exports.HelixInstalledExtensionList = HelixInstalledExtensionList;
