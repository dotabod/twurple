"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvPortAdapter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const ReverseProxyAdapter_1 = require("./ReverseProxyAdapter");
/**
 * A connection adapter that reads the port to listen on from the environment.
 *
 * @hideProtected
 *
 * @meta category adapters
 */
let EnvPortAdapter = class EnvPortAdapter extends ReverseProxyAdapter_1.ReverseProxyAdapter {
    /**
     * Creates a new environment port connection adapter.
     *
     * @expandParams
     *
     * @param options
     */
    constructor(options) {
        const { variableName = 'PORT', ...otherOptions } = options;
        const port = Number(process.env[variableName]);
        if (Number.isNaN(port)) {
            throw new Error(`The environment variable "${variableName}" does not contain a number`);
        }
        super({ port, ...otherOptions });
    }
};
EnvPortAdapter = tslib_1.__decorate([
    (0, common_1.rtfm)('eventsub-http', 'EnvPortAdapter')
], EnvPortAdapter);
exports.EnvPortAdapter = EnvPortAdapter;
