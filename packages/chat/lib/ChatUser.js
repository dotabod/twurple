"use strict";
var ChatUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatUser = void 0;
const tslib_1 = require("tslib");
const cache_decorators_1 = require("@d-fischer/cache-decorators");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A user in chat.
 */
let ChatUser = ChatUser_1 = class ChatUser {
    /** @internal */
    constructor(userName, userData) {
        this._userName = userName.toLowerCase();
        this._userData = userData ? new Map(userData) : new Map();
    }
    static _parseBadgesLike(badgesLikeStr) {
        if (!badgesLikeStr) {
            return new Map();
        }
        return new Map(badgesLikeStr.split(',').map(badge => {
            const slashIndex = badge.indexOf('/');
            if (slashIndex === -1) {
                return [badge, ''];
            }
            return [badge.slice(0, slashIndex), badge.slice(slashIndex + 1)];
        }));
    }
    /**
     * The name of the user.
     */
    get userName() {
        return this._userName;
    }
    /**
     * The display name of the user.
     */
    get displayName() {
        var _a;
        return (_a = this._userData.get('display-name')) !== null && _a !== void 0 ? _a : this._userName;
    }
    /**
     * The color the user chose to display in chat.
     *
     * Returns undefined if the user didn't choose a color.
     * In this case, you should generate your own color for this user and stick to it at least for one runtime.
     */
    get color() {
        return this._userData.get('color');
    }
    /**
     * The badges of the user. Returned as a map that maps the badge category to the detail.
     */
    get badges() {
        const badgesStr = this._userData.get('badges');
        return ChatUser_1._parseBadgesLike(badgesStr);
    }
    /**
     * The badge info of the user. Returned as a map that maps the badge category to the detail.
     */
    get badgeInfo() {
        const badgeInfoStr = this._userData.get('badge-info');
        return ChatUser_1._parseBadgesLike(badgeInfoStr);
    }
    /**
     * The ID of the user.
     */
    get userId() {
        return this._userData.get('user-id');
    }
    /**
     * The type of the user.
     * Possible values are undefined, 'mod', 'global_mod', 'admin' and 'staff'.
     */
    get userType() {
        return this._userData.get('user-type');
    }
    /**
     * Whether the user is the broadcaster.
     */
    get isBroadcaster() {
        return this.badges.has('broadcaster');
    }
    /**
     * Whether the user is subscribed to the channel.
     */
    get isSubscriber() {
        return this.badges.has('subscriber') || this.isFounder;
    }
    /**
     * Whether the user is a Founder of the channel.
     */
    get isFounder() {
        return this.badges.has('founder');
    }
    /**
     * Whether the user is a moderator of the channel.
     */
    get isMod() {
        return this.badges.has('moderator');
    }
    /**
     * Whether the user is a VIP in the channel.
     */
    get isVip() {
        const badgeValue = this._userData.get('vip');
        return badgeValue != null && badgeValue !== '0';
    }
    /**
     * Whether the user is an artist of the channel.
     */
    get isArtist() {
        return this.badges.has('artist-badge');
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], ChatUser.prototype, "_userData", void 0);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], ChatUser.prototype, "badges", null);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], ChatUser.prototype, "badgeInfo", null);
ChatUser = ChatUser_1 = tslib_1.__decorate([
    cache_decorators_1.Cacheable,
    (0, common_1.rtfm)('chat', 'ChatUser', 'userId')
], ChatUser);
exports.ChatUser = ChatUser;
