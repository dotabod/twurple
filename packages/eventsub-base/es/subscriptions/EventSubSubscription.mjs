import { __decorate } from "tslib";
import { rtfm } from '@twurple/common';
/**
 * A subscription to an EventSub event.
 *
 * @hideProtected
 */
let EventSubSubscription = class EventSubSubscription {
    /** @internal */
    constructor(_handler, _client) {
        this._handler = _handler;
        this._client = _client;
        this._startedFromExistingTwitchSub = true;
        this._verified = false;
    }
    /**
     * Whether the subscription has been verified by Twitch.
     */
    get verified() {
        return this._verified;
    }
    /** @private */
    get _twitchId() {
        var _a;
        return (_a = this._twitchSubscriptionData) === null || _a === void 0 ? void 0 : _a.id;
    }
    /** @private */
    _verify() {
        this._verified = true;
    }
    /** @private */
    _handleData(body) {
        this._handler(this.transformData(body));
    }
    /**
     * Activates the subscription.
     *
     * You don't have to call this method manually after subscribing, as it's done automatically.
     * It's only used to reactivate a subscription after calling `.stop()`.
     *
     * @param resumeFrom The subscription data from Twitch to check whether the subscription needs to be re-added.
     */
    start(resumeFrom) {
        if (resumeFrom) {
            if (resumeFrom.status === 'enabled') {
                this._twitchSubscriptionData = resumeFrom;
                this._verified = true;
                this._client._logger.debug(`Successfully resumed subscription for event: ${this.id}`);
                return;
            }
            this._client._logger.info(`Cycling broken conflicting subscription for event: ${this.id}`);
            this._unsubscribe().then(() => this._subscribeAndSave(), e => this._client._notifySubscriptionDeleteError(this, e));
        }
        else {
            this._subscribeAndSave();
        }
    }
    /**
     * Suspends the subscription, not removing it from the listener.
     */
    suspend() {
        if (!this._twitchSubscriptionData) {
            return;
        }
        this._unsubscribe().then(() => {
            this._verified = false;
            this._twitchSubscriptionData = undefined;
        }, e => this._client._notifySubscriptionDeleteError(this, e));
    }
    /**
     * Deactivates the subscription and removes it from the listener.
     */
    stop() {
        this.suspend();
        this._client._dropSubscription(this.id);
    }
    /**
     * Migrates the subscription from legacy secrets to modern secrets.
     */
    async migrate() {
        if (this._client._legacySecrets !== 'migrate') {
            throw new Error("The `.migrate()` method is not available unless the legacySecrets options is set to 'migrate'");
        }
        if (!this._startedFromExistingTwitchSub) {
            this._client._logger.warn(`Tried to migrate subscription ${this.id} but it was already migrated`);
            return;
        }
        await this._unsubscribe().then(async () => {
            this._verified = false;
            this._twitchSubscriptionData = undefined;
            this._startedFromExistingTwitchSub = false;
            await this._subscribe().then(data => {
                this._twitchSubscriptionData = data;
                this._client._registerTwitchSubscription(this, data);
            }, e => {
                var _a;
                this._client._logger.error(
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                `Subscription ${this.id} failed to subscribe: ${(_a = e.message) !== null && _a !== void 0 ? _a : e}`);
                this._client._notifySubscriptionCreateError(this, e);
            });
        }, e => this._client._notifySubscriptionDeleteError(this, e));
    }
    /**
     * Outputs the base command to execute for testing the subscription using the Twitch CLI.
     *
     * Some additional parameters, like the target user, may be required.
     */
    async getCliTestCommand() {
        return await this._client._getCliTestCommandForSubscription(this);
    }
    /**
     * Whether the subscription uses a legacy secret.
     *
     * You can use this property to check whether any subscription still has to be migrated from legacy secrets.
     */
    get usesLegacySecret() {
        if (this._client._legacySecrets === 'migrate') {
            return this._startedFromExistingTwitchSub;
        }
        return this._client._legacySecrets;
    }
    /** @private */
    _droppedByTwitch() {
        this._twitchSubscriptionData = undefined;
        this._verified = false;
    }
    async _getTransportOptions() {
        return await this._client._getTransportOptionsForSubscription(this);
    }
    _subscribeAndSave() {
        this._subscribe().then(data => {
            this._twitchSubscriptionData = data;
            this._client._registerTwitchSubscription(this, data);
        }, e => {
            var _a;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            this._client._logger.error(`Subscription ${this.id} failed to subscribe: ${(_a = e.message) !== null && _a !== void 0 ? _a : e}`);
            this._client._notifySubscriptionCreateError(this, e);
        });
    }
    async _unsubscribe() {
        if (this._twitchSubscriptionData) {
            await this._client._apiClient.eventSub.deleteSubscription(this._twitchSubscriptionData.id);
        }
        this._client._dropTwitchSubscription(this.id);
        this._client._notifySubscriptionDeleteSuccess(this);
    }
};
EventSubSubscription = __decorate([
    rtfm('eventsub-base', 'EventSubSubscription')
], EventSubSubscription);
export { EventSubSubscription };
