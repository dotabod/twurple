"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixVideo = void 0;
const tslib_1 = require("tslib");
const cache_decorators_1 = require("@d-fischer/cache-decorators");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A video on Twitch.
 */
let HelixVideo = class HelixVideo extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the video.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The ID of the user who created the video.
     */
    get userId() {
        return this[common_1.rawDataSymbol].user_id;
    }
    /**
     * The name of the user who created the video.
     */
    get userName() {
        return this[common_1.rawDataSymbol].user_login;
    }
    /**
     * The display name of the user who created the video.
     */
    get userDisplayName() {
        return this[common_1.rawDataSymbol].user_name;
    }
    /**
     * Gets information about the user who created the video.
     */
    async getUser() {
        return (0, common_1.checkRelationAssertion)(await this._client.users.getUserById(this[common_1.rawDataSymbol].user_id));
    }
    /**
     * The title of the video.
     */
    get title() {
        return this[common_1.rawDataSymbol].title;
    }
    /**
     * The description of the video.
     */
    get description() {
        return this[common_1.rawDataSymbol].description;
    }
    /**
     * The date when the video was created.
     */
    get creationDate() {
        return new Date(this[common_1.rawDataSymbol].created_at);
    }
    /**
     * The date when the video was published.
     */
    get publishDate() {
        return new Date(this[common_1.rawDataSymbol].published_at);
    }
    /**
     * The URL of the video.
     */
    get url() {
        return this[common_1.rawDataSymbol].url;
    }
    /**
     * The URL of the thumbnail of the video.
     */
    get thumbnailUrl() {
        return this[common_1.rawDataSymbol].thumbnail_url;
    }
    /**
     * Builds the thumbnail URL of the video using the given dimensions.
     *
     * @param width The width of the thumbnail.
     * @param height The height of the thumbnail.
     */
    getThumbnailUrl(width, height) {
        return this[common_1.rawDataSymbol].thumbnail_url
            .replace('%{width}', width.toString())
            .replace('%{height}', height.toString());
    }
    /**
     * Whether the video is public or not.
     */
    get isPublic() {
        return this[common_1.rawDataSymbol].viewable === 'public';
    }
    /**
     * The number of views of the video.
     */
    get views() {
        return this[common_1.rawDataSymbol].view_count;
    }
    /**
     * The language of the video.
     */
    get language() {
        return this[common_1.rawDataSymbol].language;
    }
    /**
     * The type of the video.
     */
    get type() {
        return this[common_1.rawDataSymbol].type;
    }
    /**
     * The duration of the video, as formatted by Twitch.
     */
    get duration() {
        return this[common_1.rawDataSymbol].duration;
    }
    /**
     * The duration of the video, in seconds.
     */
    get durationInSeconds() {
        const parts = this[common_1.rawDataSymbol].duration.match(/\d+[hms]/g);
        if (!parts) {
            throw new common_1.HellFreezesOverError(`Could not parse duration string: ${this[common_1.rawDataSymbol].duration}`);
        }
        return parts
            .map(part => {
            const partialMatch = /(\d+)([hms])/.exec(part);
            if (!partialMatch) {
                throw new common_1.HellFreezesOverError(`Could not parse partial duration string: ${part}`);
            }
            const [, num, unit] = partialMatch;
            return parseInt(num, 10) * { h: 3600, m: 60, s: 1 }[unit];
        })
            .reduce((a, b) => a + b);
    }
    /**
     * The ID of the stream this video belongs to.
     *
     * Returns null if the video is not an archived stream.
     */
    get streamId() {
        return this[common_1.rawDataSymbol].stream_id;
    }
    /**
     * The raw data of muted segments of the video.
     */
    get mutedSegmentData() {
        var _a, _b;
        return (_b = (_a = this[common_1.rawDataSymbol].muted_segments) === null || _a === void 0 ? void 0 : _a.slice()) !== null && _b !== void 0 ? _b : [];
    }
    /**
     * Checks whether the video is muted at a given offset or range.
     *
     * @param offset The start of your range, in seconds from the start of the video,
     * or if no duration is given, the exact offset that is checked.
     * @param duration The duration of your range, in seconds.
     * @param partial Whether the range check is only partial.
     *
     * By default, this function returns true only if the passed range is entirely contained in a muted segment.
     */
    isMutedAt(offset, duration, partial = false) {
        if (this[common_1.rawDataSymbol].muted_segments === null) {
            return false;
        }
        if (duration == null) {
            return this[common_1.rawDataSymbol].muted_segments.some(seg => seg.offset <= offset && offset <= seg.offset + seg.duration);
        }
        const end = offset + duration;
        if (partial) {
            return this[common_1.rawDataSymbol].muted_segments.some(seg => {
                const segEnd = seg.offset + seg.duration;
                return offset < segEnd && seg.offset < end;
            });
        }
        return this[common_1.rawDataSymbol].muted_segments.some(seg => {
            const segEnd = seg.offset + seg.duration;
            return seg.offset <= offset && end <= segEnd;
        });
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixVideo.prototype, "_client", void 0);
tslib_1.__decorate([
    (0, cache_decorators_1.CachedGetter)()
], HelixVideo.prototype, "durationInSeconds", null);
HelixVideo = tslib_1.__decorate([
    cache_decorators_1.Cacheable,
    (0, common_1.rtfm)('api', 'HelixVideo', 'id')
], HelixVideo);
exports.HelixVideo = HelixVideo;
