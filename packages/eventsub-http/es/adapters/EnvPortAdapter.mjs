import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
import { ReverseProxyAdapter } from "./ReverseProxyAdapter.mjs";
/**
 * A connection adapter that reads the port to listen on from the environment.
 *
 * @hideProtected
 *
 * @meta category adapters
 */
let EnvPortAdapter = class EnvPortAdapter extends ReverseProxyAdapter {
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
EnvPortAdapter = __decorate([
    rtfm('eventsub-http', 'EnvPortAdapter')
], EnvPortAdapter);
export { EnvPortAdapter };
