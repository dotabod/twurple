import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { connect } from '@ngrok/ngrok';
import { ConnectionAdapter } from '@twurple/eventsub-http';
/**
 * A connection adapter that uses ngrok to make local testing easy.
 */
export class NgrokAdapter extends ConnectionAdapter {
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
        if (!this._hostNamePromise) {
            this._hostNamePromise = connect({ addr: this._listenerPort }).then(url => url.replace(/^https?:\/\/|\/$/g, ''));
        }
        return await this._hostNamePromise;
    }
}
__decorate([
    Enumerable(false)
], NgrokAdapter.prototype, "_listenerPort", void 0);
__decorate([
    Enumerable(false)
], NgrokAdapter.prototype, "_hostNamePromise", void 0);
