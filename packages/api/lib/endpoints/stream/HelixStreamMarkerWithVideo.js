"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixStreamMarkerWithVideo = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixStreamMarker_1 = require("./HelixStreamMarker");
/**
 * A stream marker, also containing some video data.
 *
 * @inheritDoc
 */
let HelixStreamMarkerWithVideo = class HelixStreamMarkerWithVideo extends HelixStreamMarker_1.HelixStreamMarker {
    /** @internal */
    constructor(data, _videoId, client) {
        super(data, client);
        this._videoId = _videoId;
    }
    /**
     * The URL of the video, which will start playing at the position of the stream marker.
     */
    get url() {
        return this[common_1.rawDataSymbol].URL;
    }
    /**
     * The ID of the video.
     */
    get videoId() {
        return this._videoId;
    }
    /**
     * Gets the video data of the video the marker was set in.
     */
    async getVideo() {
        return (0, common_1.checkRelationAssertion)(await this._client.videos.getVideoById(this._videoId));
    }
};
HelixStreamMarkerWithVideo = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixStreamMarkerWithVideo', 'id')
], HelixStreamMarkerWithVideo);
exports.HelixStreamMarkerWithVideo = HelixStreamMarkerWithVideo;
