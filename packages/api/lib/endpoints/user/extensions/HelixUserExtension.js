"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixUserExtension = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixBaseExtension_1 = require("./HelixBaseExtension");
/**
 * A Twitch Extension that was installed by a user.
 *
 * @inheritDoc
 */
let HelixUserExtension = class HelixUserExtension extends HelixBaseExtension_1.HelixBaseExtension {
    /**
     * Whether the user has configured the extension to be able to activate it.
     */
    get canActivate() {
        return this[common_1.rawDataSymbol].can_activate;
    }
    /**
     * The available types of the extension.
     */
    get types() {
        return this[common_1.rawDataSymbol].type;
    }
};
HelixUserExtension = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixUserExtension', 'id')
], HelixUserExtension);
exports.HelixUserExtension = HelixUserExtension;
