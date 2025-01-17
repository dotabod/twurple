"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionAdapter = void 0;
const http = require("http");
/**
 * An abstraction of a WebHook connection adapter.
 */
class ConnectionAdapter {
    /**
     * Creates the HTTP server to use for listening to events.
     *
     * @protected
     */
    createHttpServer() {
        return http.createServer();
    }
    /**
     * Whether the connection adapter listens using SSL.
     *
     * @protected
     */
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get listenUsingSsl() {
        return false;
    }
    /**
     * The port the HTTP server should listen on.
     *
     * If not given, the listener will default to use port 443.
     *
     * @protected
     */
    get listenerPort() {
        return undefined;
    }
    /**
     * The path prefix an external connection needs to reach this server.
     *
     * @protected
     */
    get pathPrefix() {
        return undefined;
    }
    /**
     * Whether the path prefix is passed to the handler.
     *
     * Defaults to `false` which means that the layer redirecting to this server needs to strip the path prefix in order for it to work.
     *
     * For example, if the path prefix is set to /hooks, an external connection to /hooks/abc should pass /abc as the path to this server.
     *
     * Conversely, if this is set to `true`, the path should be passed as is (i.e. /hooks/abc).
     *
     * @protected
     */
    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get usePathPrefixInHandlers() {
        return false;
    }
}
exports.ConnectionAdapter = ConnectionAdapter;
