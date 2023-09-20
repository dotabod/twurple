"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixExtensionConfigurationSegment = void 0;
const common_1 = require("@twurple/common");
class HelixExtensionConfigurationSegment extends common_1.DataObject {
    get segmentName() {
        return this[common_1.rawDataSymbol].segment;
    }
    get content() {
        return this[common_1.rawDataSymbol].content;
    }
    get version() {
        return this[common_1.rawDataSymbol].version;
    }
}
exports.HelixExtensionConfigurationSegment = HelixExtensionConfigurationSegment;
