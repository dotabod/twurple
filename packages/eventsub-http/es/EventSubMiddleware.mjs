import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { checkHostName } from "./checks.mjs";
import { EventSubHttpBase } from "./EventSubHttpBase.mjs";
/**
 * An Express middleware for the Twitch EventSub event distribution mechanism.
 *
 * You can find an extensive example on how to use this class in the [documentation](/docs/getting-data/eventsub/express).
 *
 * @hideProtected
 * @inheritDoc
 *
 * @meta category main
 */
let EventSubMiddleware = class EventSubMiddleware extends EventSubHttpBase {
    /**
     * Creates a new EventSub middleware wrapper.
     *
     * @param config
     *
     * @expandParams
     */
    constructor(config) {
        var _a;
        super(config);
        checkHostName(config.hostName);
        this._hostName = config.hostName;
        this._pathPrefix = config.pathPrefix;
        this._usePathPrefixInHandlers = (_a = config.usePathPrefixInHandlers) !== null && _a !== void 0 ? _a : true;
    }
    /**
     * Applies middleware that handles EventSub notifications to an Express app/router.
     *
     * @param router The app or router the middleware should be applied to.
     */
    apply(router) {
        let requestPathPrefix = undefined;
        if (this._usePathPrefixInHandlers) {
            requestPathPrefix = this._pathPrefix;
            requestPathPrefix && (requestPathPrefix = `/${requestPathPrefix.replace(/^\/|\/$/g, '')}`);
        }
        const requestHandler = this._createHandleRequest();
        const dropLegacyHandler = this._createDropLegacyRequest();
        const healthHandler = this._createHandleHealthRequest();
        if (requestPathPrefix) {
            router.post(`${requestPathPrefix}/event/:id`, requestHandler);
            router.post(`${requestPathPrefix}/:id`, dropLegacyHandler);
            if (this._helperRoutes) {
                router.get(`${requestPathPrefix}`, healthHandler);
            }
        }
        else {
            router.post('event/:id', requestHandler);
            router.post(':id', dropLegacyHandler);
            if (this._helperRoutes) {
                router.get('/', healthHandler);
            }
        }
    }
    /**
     * Marks the middleware as ready to receive events.
     *
     * The express app should be started before this.
     */
    async markAsReady() {
        await this._resumeExistingSubscriptions();
        this._readyToSubscribe = true;
    }
    async getHostName() {
        return this._hostName;
    }
    async getPathPrefix() {
        return this._pathPrefix;
    }
};
EventSubMiddleware = __decorate([
    rtfm('eventsub-http', 'EventSubMiddleware')
], EventSubMiddleware);
export { EventSubMiddleware };
