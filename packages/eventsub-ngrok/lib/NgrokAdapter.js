"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgrokAdapter = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const ngrok_1 = require("@ngrok/ngrok");
const eventsub_http_1 = require("@twurple/eventsub-http");
/**
 * A connection adapter that uses ngrok to make local testing easy.
 */
class NgrokAdapter extends eventsub_http_1.ConnectionAdapter {
    /**
     * Creates a new instance of the `NgrokAdapter`.
     *
     * @expandParams
     *
     * @param config
     */
    constructor(config = {}) {
        var _a;
        super();
        this._listenerPort = (_a = config.port) !== null && _a !== void 0 ? _a : 8000;
    }
    /** @protected */
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get connectUsingSsl() {
        return true;
    }
    /** @protected */
    get listenerPort() {
        return this._listenerPort;
    }
    /** @protected */
    async getHostName() {
        var _a;
        (_a = this._hostNamePromise) !== null && _a !== void 0 ? _a : (this._hostNamePromise = (0, ngrok_1.connect)({ addr: this._listenerPort }).then(url => url.replace(/^https?:\/\/|\/$/g, '')));
        return await this._hostNamePromise;
    }
}
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], NgrokAdapter.prototype, "_listenerPort", void 0);
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], NgrokAdapter.prototype, "_hostNamePromise", void 0);
exports.NgrokAdapter = NgrokAdapter;
