"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubHttpListener = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
const httpanda_1 = require("httpanda");
const EventSubHttpBase_1 = require("./EventSubHttpBase");
/**
 * An HTTP listener for the Twitch EventSub event distribution mechanism.
 *
 * @hideProtected
 * @inheritDoc
 *
 * @meta category main
 */
let EventSubHttpListener = class EventSubHttpListener extends EventSubHttpBase_1.EventSubHttpBase {
    /**
     * Creates a new EventSub HTTP listener.
     *
     * @param config
     *
     * @expandParams
     */
    constructor(config) {
        super(config);
        this._adapter = config.adapter;
    }
    /**
     * Starts the HTTP listener.
     */
    start() {
        if (this._server) {
            throw new Error('Trying to start while already running');
        }
        const server = this._adapter.createHttpServer();
        this._server = new httpanda_1.Server({
            server,
            onError: async (e, req, res, next) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (e.code === 404 && !(await this._isHostDenied(req))) {
                    this._logger.warn(`Access to unknown URL/method attempted: ${req.method} ${req.url}`);
                }
                (0, httpanda_1.defaultOnError)(e, req, res, next);
            },
        });
        // needs to be first in chain but run last, for proper logging of status
        this._server.use((req, res, next) => {
            setImmediate(() => {
                this._logger.debug(`${req.method} ${req.path} - ${res.statusCode}`);
            });
            next();
        });
        let requestPathPrefix = undefined;
        if (this._adapter.usePathPrefixInHandlers) {
            requestPathPrefix = this._adapter.pathPrefix;
            requestPathPrefix && (requestPathPrefix = `/${requestPathPrefix.replace(/^\/|\/$/g, '')}`);
        }
        const healthHandler = this._createHandleHealthRequest();
        const dropLegacyHandler = this._createDropLegacyRequest();
        const requestHandler = this._createHandleRequest();
        if (requestPathPrefix) {
            this._server.post(`${requestPathPrefix}/event/:id`, requestHandler);
            this._server.post(`${requestPathPrefix}/:id`, dropLegacyHandler);
            if (this._helperRoutes) {
                this._server.get(`${requestPathPrefix}`, healthHandler);
            }
        }
        else {
            this._server.post('/event/:id', requestHandler);
            this._server.post('/:id', dropLegacyHandler);
            if (this._helperRoutes) {
                this._server.get('/', healthHandler);
            }
        }
        const adapterListenerPort = this._adapter.listenerPort;
        const listenerPort = adapterListenerPort !== null && adapterListenerPort !== void 0 ? adapterListenerPort : 443;
        this._server
            .listen(listenerPort)
            .then(async () => {
            this._logger.info(`Listening on port ${listenerPort}`);
            await this._resumeExistingSubscriptions();
            this._readyToSubscribe = true;
        })
            .catch(e => {
            this._logger.crit(`Could not listen on port ${listenerPort}: ${e.message}`);
        });
    }
    /**
     * Stops the HTTP listener.
     */
    stop() {
        if (!this._server) {
            throw new Error('Trying to stop while not running');
        }
        for (const sub of this._subscriptions.values()) {
            sub.suspend();
        }
        this._server.close().then(() => {
            this._server = undefined;
            this._readyToSubscribe = false;
        }, e => this._logger.crit(`Could not stop listener: ${e.message}`));
    }
    async getHostName() {
        return await this._adapter.getHostName();
    }
    async getPathPrefix() {
        return this._adapter.pathPrefix;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], EventSubHttpListener.prototype, "_server", void 0);
EventSubHttpListener = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-http', 'EventSubHttpListener')
], EventSubHttpListener);
exports.EventSubHttpListener = EventSubHttpListener;
