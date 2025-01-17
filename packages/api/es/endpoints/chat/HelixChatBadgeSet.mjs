import { __decorate } from "tslib";
import { Cacheable, CachedGetter } from '@d-fischer/cache-decorators';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixChatBadgeVersion } from "./HelixChatBadgeVersion.mjs";
/**
 * A version of a chat badge.
 */
let HelixChatBadgeSet = class HelixChatBadgeSet extends DataObject {
    /**
     * The badge set ID.
     */
    get id() {
        return this[rawDataSymbol].set_id;
    }
    /**
     * All versions of the badge.
     */
    get versions() {
        return this[rawDataSymbol].versions.map(data => new HelixChatBadgeVersion(data));
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
__decorate([
    CachedGetter()
], HelixChatBadgeSet.prototype, "versions", null);
HelixChatBadgeSet = __decorate([
    Cacheable,
    rtfm('api', 'HelixChatBadgeSet', 'id')
], HelixChatBadgeSet);
export { HelixChatBadgeSet };
