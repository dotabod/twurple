import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { checkHostName } from "../checks.mjs";
import { ConnectionAdapter } from "./ConnectionAdapter.mjs";
/**
 * A WebHook connection adapter that supports a reverse proxy in front of the listener.
 *
 * @hideProtected
 *
 * @meta category adapters
 */
let ReverseProxyAdapter = class ReverseProxyAdapter extends ConnectionAdapter {
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
        checkHostName(options.hostName);
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
ReverseProxyAdapter = __decorate([
    rtfm('eventsub-http', 'ReverseProxyAdapter')
], ReverseProxyAdapter);
export { ReverseProxyAdapter };
