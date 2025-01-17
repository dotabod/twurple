"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReverseProxyAdapter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const checks_1 = require("../checks");
const ConnectionAdapter_1 = require("./ConnectionAdapter");
/**
 * A WebHook connection adapter that supports a reverse proxy in front of the listener.
 *
 * @hideProtected
 *
 * @meta category adapters
 */
let ReverseProxyAdapter = class ReverseProxyAdapter extends ConnectionAdapter_1.ConnectionAdapter {
    /**
     * Creates a reverse proxy connection adapter.
     *
     * @expandParams
     *
     * @param options
     */
    constructor(options) {
        var _a, _b;
        super();
        (0, checks_1.checkHostName)(options.hostName);
        this._hostName = options.hostName;
        this._port = (_a = options.port) !== null && _a !== void 0 ? _a : 8080;
        this._pathPrefix = options.pathPrefix;
        this._usePathPrefixInHandlers = (_b = options.usePathPrefixInHandlers) !== null && _b !== void 0 ? _b : false;
    }
    /** @protected */
    get listenerPort() {
        return this._port;
    }
    /** @protected */
    async getHostName() {
        return this._hostName;
    }
    /** @protected */
    get pathPrefix() {
        return this._pathPrefix;
    }
    /** @protected */
    get usePathPrefixInHandlers() {
        return this._usePathPrefixInHandlers;
    }
};
ReverseProxyAdapter = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-http', 'ReverseProxyAdapter')
], ReverseProxyAdapter);
exports.ReverseProxyAdapter = ReverseProxyAdapter;
