import { __decorate } from "tslib";
import getRawBody from '@d-fischer/raw-body';
import { Enumerable } from '@d-fischer/shared-utils';
import { EventSubBase, } from '@twurple/eventsub-base';
import * as crypto from 'crypto';
/**
 * @private
 * @hideProtected
 * @inheritDoc
 */
export class EventSubHttpBase extends EventSubBase {
    constructor(config) {
        var _a, _b, _c;
        // catch the examples copied verbatim
        if (!config.secret || config.secret === 'thisShouldBeARandomlyGeneratedFixedString') {
            throw new Error('Please generate a secret and pass it to the constructor!');
        }
        if (config.secret.length < 10 || config.secret.length > 100) {
            throw new Error('Your secret must be between 10 and 100 characters long');
        }
        super(config);
        /** @internal */ this._seenEventIds = new Set();
        this._readyToSubscribe = false;
        /**
         * Fires when a subscription is successfully verified or fails to verify.
         *
         * @eventListener
         *
         * @param success Whether the verification succeeded.
         * @param subscription The subscription that was verified.
         */
        this.onVerify = this.registerEvent();
        this._secret = config.secret;
        this._strictHostCheck = (_a = config.strictHostCheck) !== null && _a !== void 0 ? _a : true;
        this._helperRoutes = (_b = config.helperRoutes) !== null && _b !== void 0 ? _b : true;
        if (config.legacySecrets === undefined) {
            this._logger.warn(`In version 6.0, the automatic augmentation of EventSub secrets was disabled by default.
If you have been using a lower version before, your subscriptions will fail to verify now.
A new option named \`legacySecrets\` was introduced in order to enable you to migrate your subscriptions.
You should still migrate this as soon as possible, as in the next major version this switch will go away, and then you will have to remove all your subscriptions and subscribe to them again.

To make Twurple migrate the subscriptions smoothly, please add \`legacySecrets: 'migrate'\` to your EventSub configuration.
This will treat all pre-existing subscriptions as legacy and all new subscriptions as modern.
You can then call \`.migrate()\` on your pre-existing subscriptions to make them use modern secrets.
After restarting all these subscriptions, before you restart again, set it to \`false\`.

To silence this warning (if you're done migrating or if you're a new user), please add \`legacySecrets: false\` to your EventSub configuration.
To use your legacy subscriptions without having to clean them up and resubscribing, please add \`legacySecrets: true\` to your EventSub configuration.`);
        }
        this._legacySecrets = (_c = config.legacySecrets) !== null && _c !== void 0 ? _c : false;
    }
    /** @private */
    async _getTransportOptionsForSubscription(subscription) {
        return {
            method: 'webhook',
            callback: await this._buildHookUrl(subscription.id),
            secret: this._createSecretForSubscription(subscription),
        };
    }
    /** @private */
    async _getCliTestCommandForSubscription(subscription) {
        return `twitch event trigger ${subscription._cliName} -F ${await this._buildHookUrl(subscription.id)} -s ${this._createSecretForSubscription(subscription)}`;
    }
    /** @private */
    _isReadyToSubscribe() {
        return this._readyToSubscribe;
    }
    async _resumeExistingSubscriptions() {
        const subscriptions = await this._apiClient.eventSub.getSubscriptionsPaginated().getAll();
        const urlPrefix = await this._buildHookUrl('');
        this._twitchSubscriptions = new Map(subscriptions
            .map((sub) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (sub._transport.method === 'webhook') {
                const url = sub._transport.callback;
                if (url.startsWith(urlPrefix)) {
                    const id = url.slice(urlPrefix.length);
                    return [id, sub];
                }
            }
            return undefined;
        })
            .filter((x) => !!x));
        for (const [subId, sub] of this._subscriptions) {
            sub.start(this._twitchSubscriptions.get(subId));
        }
    }
    _createHandleRequest() {
        return async (req, res) => {
            if (req.readableEnded) {
                throw new Error('The request body was already consumed by something else.\n' +
                    "Please make sure you don't globally apply middlewares that consume the request body, " +
                    'such as express.json() or body-parser.');
            }
            if (await this._isHostDenied(req)) {
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(404);
                res.end('Not OK');
                return;
            }
            // The HTTP listener intentionally does not use the built-in resolution by Twitch subscription ID
            // to be able to recognize subscriptions from the URL (for avoiding unnecessary re-subscribing)
            const { id } = req.params;
            const subscription = this._subscriptions.get(id);
            const twitchSubscription = this._twitchSubscriptions.get(id);
            const type = req.headers['twitch-eventsub-message-type'];
            if (!subscription) {
                this._logger.warn(`Action ${type} of unknown event attempted: ${id}`);
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(410);
                res.end('Not OK');
                return;
            }
            const messageId = req.headers['twitch-eventsub-message-id'];
            const timestamp = req.headers['twitch-eventsub-message-timestamp'];
            const body = await getRawBody(req, true);
            const algoAndSignature = req.headers['twitch-eventsub-message-signature'];
            if (algoAndSignature === undefined) {
                this._logger.warn(`Dropping unsigned message for action ${type} of event: ${id}`);
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(410);
                res.end('Not OK');
                return;
            }
            const verified = this._verifyData(subscription, messageId, timestamp, body, algoAndSignature);
            const data = JSON.parse(body);
            if (!verified) {
                this._logger.warn(`Could not verify action ${type} of event: ${id}`);
                if (type === 'webhook_callback_verification') {
                    this.emit(this.onVerify, false, subscription);
                }
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(410);
                res.end('Not OK');
                return;
            }
            switch (type) {
                case 'webhook_callback_verification': {
                    const verificationBody = data;
                    this.emit(this.onVerify, true, subscription);
                    subscription._verify();
                    if (twitchSubscription) {
                        twitchSubscription._status = 'enabled';
                    }
                    res.setHeader('Content-Length', verificationBody.challenge.length);
                    res.setHeader('Content-Type', 'text/plain');
                    res.writeHead(200, undefined);
                    res.end(verificationBody.challenge);
                    this._logger.debug(`Successfully subscribed to event: ${id}`);
                    break;
                }
                case 'notification': {
                    if (new Date(timestamp).getTime() < Date.now() - 10 * 60 * 1000) {
                        this._logger.debug(`Old notification(s) prevented for event: ${id}`);
                    }
                    else {
                        const payload = data;
                        if ('events' in payload) {
                            for (const event of payload.events) {
                                this._handleSingleEventPayload(subscription, event.data, event.id);
                            }
                        }
                        else {
                            this._handleSingleEventPayload(subscription, payload.event, messageId);
                        }
                    }
                    res.setHeader('Content-Type', 'text/plain');
                    res.writeHead(202);
                    res.end('OK');
                    break;
                }
                case 'revocation': {
                    this._dropSubscription(subscription.id);
                    this._dropTwitchSubscription(subscription.id);
                    this.emit(this.onRevoke, subscription);
                    this._logger.debug(`Subscription revoked by Twitch for event: ${id}`);
                    res.setHeader('Content-Type', 'text/plain');
                    res.writeHead(202);
                    res.end('OK');
                    break;
                }
                default: {
                    this._logger.warn(`Unknown action ${type} for event: ${id}`);
                    res.setHeader('Content-Type', 'text/plain');
                    res.writeHead(400);
                    res.end('Not OK');
                    break;
                }
            }
        };
    }
    _createDropLegacyRequest() {
        return async (req, res, next) => {
            if (await this._isHostDenied(req)) {
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(404);
                res.end('Not OK');
                return;
            }
            const twitchSub = this._twitchSubscriptions.get(req.params.id);
            if (twitchSub) {
                await this._apiClient.eventSub.deleteSubscription(twitchSub.id);
                this._logger.debug(`Dropped legacy subscription for event: ${req.params.id}`);
                res.setHeader('Content-Type', 'text/plain');
                res.writeHead(410);
                res.end('Not OK');
            }
            else {
                next();
            }
        };
    }
    _createHandleHealthRequest() {
        return async (req, res) => {
            res.setHeader('Content-Type', 'text/plain');
            if (await this._isHostDenied(req)) {
                res.writeHead(404);
                res.end('Not OK');
                return;
            }
            res.writeHead(200);
            res.end('@twurple/eventsub-http is listening here');
        };
    }
    async _isHostDenied(req) {
        if (this._strictHostCheck) {
            const ip = req.socket.remoteAddress;
            if (ip === undefined) {
                // client disconnected already
                return true;
            }
            if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
                // localhost is always fine
                return false;
            }
            const { host } = req.headers;
            if (host === undefined) {
                this._logger.debug(`Denied request from ${ip} because its host header is empty`);
                return true;
            }
            const expectedHost = await this.getHostName();
            if (host !== expectedHost) {
                this._logger.debug(`Denied request from ${ip} because its host header (${host}) doesn't match the expected value (${expectedHost})`);
                return true;
            }
        }
        return false;
    }
    _findTwitchSubscriptionToContinue(subscription) {
        return this._twitchSubscriptions.get(subscription.id);
    }
    /** @internal */
    async _buildHookUrl(id) {
        var _a;
        const hostName = await this.getHostName();
        // trim slashes on both ends
        const pathPrefix = (_a = (await this.getPathPrefix())) === null || _a === void 0 ? void 0 : _a.replace(/^\/|\/$/, '');
        return `https://${hostName}${pathPrefix ? '/' : ''}${pathPrefix !== null && pathPrefix !== void 0 ? pathPrefix : ''}/event/${id}`;
    }
    /** @internal */
    _handleSingleEventPayload(subscription, payload, messageId) {
        if (this._seenEventIds.has(messageId)) {
            this._logger.debug(`Duplicate notification prevented for event: ${subscription.id}`);
            return;
        }
        this._seenEventIds.add(messageId);
        setTimeout(() => this._seenEventIds.delete(messageId), 10 * 60 * 1000);
        subscription._handleData(payload);
    }
    _verifyData(subscription, messageId, timestamp, body, algoAndSignature) {
        const [algorithm, signature] = algoAndSignature.split('=', 2);
        const hash = crypto
            .createHmac(algorithm, this._createSecretForSubscription(subscription))
            .update(messageId + timestamp + body)
            .digest('hex');
        return hash === signature;
    }
    _createSecretForSubscription(subscription) {
        if (subscription.usesLegacySecret) {
            return `${subscription.id}.${this._secret}`.slice(-100);
        }
        return this._secret;
    }
}
__decorate([
    Enumerable(false)
], EventSubHttpBase.prototype, "_seenEventIds", void 0);
__decorate([
    Enumerable(false)
], EventSubHttpBase.prototype, "_secret", void 0);
