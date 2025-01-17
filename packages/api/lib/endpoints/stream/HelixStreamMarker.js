"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixStreamMarker = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A stream marker.
 */
let HelixStreamMarker = class HelixStreamMarker extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the marker.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The date and time when the marker was created.
     */
    get creationDate() {
        return new Date(this[common_1.rawDataSymbol].created_at);
    }
    /**
     * The description of the marker.
     */
    get description() {
        return this[common_1.rawDataSymbol].description;
    }
    /**
     * The position in the stream when the marker was created, in seconds.
     */
    get positionInSeconds() {
        return this[common_1.rawDataSymbol].position_seconds;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixStreamMarker.prototype, "_client", void 0);
HelixStreamMarker = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixStreamMarker', 'id')
], HelixStreamMarker);
exports.HelixStreamMarker = HelixStreamMarker;
