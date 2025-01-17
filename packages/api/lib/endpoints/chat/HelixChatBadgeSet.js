"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixChatBadgeSet = void 0;
const tslib_1 = require("tslib");
const cache_decorators_1 = require("@d-fischer/cache-decorators");
const common_1 = require("@twurple/common");
const HelixChatBadgeVersion_1 = require("./HelixChatBadgeVersion");
/**
 * A version of a chat badge.
 */
let HelixChatBadgeSet = class HelixChatBadgeSet extends common_1.DataObject {
    /**
     * The badge set ID.
     */
    get id() {
        return this[common_1.rawDataSymbol].set_id;
    }
    /**
     * All versions of the badge.
     */
    get versions() {
        return this[common_1.rawDataSymbol].versions.map(data => new HelixChatBadgeVersion_1.HelixChatBadgeVersion(data));
    }
    /**
     * Gets a specific version of the badge.
     *
     * @param versionId The ID of the version.
     */
    getVersion(versionId) {
        var _a;
        return (_a = this.versions.find(v => v.id === versionId)) !== null && _a !== void 0 ? _a : null;
    }
};
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], HelixChatBadgeSet.prototype, "versions", null);
HelixChatBadgeSet = tslib_1.__decorate([
    cache_decorators_1.Cacheable,
    (0, common_1.rtfm)('api', 'HelixChatBadgeSet', 'id')
], HelixChatBadgeSet);
exports.HelixChatBadgeSet = HelixChatBadgeSet;
