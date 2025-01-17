import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A stream marker.
 */
let HelixStreamMarker = class HelixStreamMarker extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the marker.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The date and time when the marker was created.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The description of the marker.
     */
    get description() {
        return this[rawDataSymbol].description;
    }
    /**
     * The position in the stream when the marker was created, in seconds.
     */
    get positionInSeconds() {
        return this[rawDataSymbol].position_seconds;
    }
};
__decorate([
    Enumerable(false)
], HelixStreamMarker.prototype, "_client", void 0);
HelixStreamMarker = __decorate([
    rtfm('api', 'HelixStreamMarker', 'id')
], HelixStreamMarker);
export { HelixStreamMarker };
