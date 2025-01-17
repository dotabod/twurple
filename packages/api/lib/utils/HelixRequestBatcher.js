"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixRequestBatcher = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
/** @internal */
class HelixRequestBatcher {
    constructor(_callOptions, _queryParamName, _matchKey, client, _mapper, _limitPerRequest = 100) {
        this._callOptions = _callOptions;
        this._queryParamName = _queryParamName;
        this._matchKey = _matchKey;
        this._mapper = _mapper;
        this._limitPerRequest = _limitPerRequest;
        this._requestedIds = [];
        this._requestResolversById = new Map();
        this._waitTimer = null;
        this._client = client;
        this._delay = client._batchDelay;
    }
    async request(id) {
        const { promise, resolve, reject } = (0, shared_utils_1.promiseWithResolvers)();
        if (!this._requestedIds.includes(id)) {
            this._requestedIds.push(id);
        }
        if (this._requestResolversById.has(id)) {
            this._requestResolversById.get(id).push({ resolve, reject });
        }
        else {
            this._requestResolversById.set(id, [{ resolve, reject }]);
        }
        if (this._waitTimer) {
            clearTimeout(this._waitTimer);
            this._waitTimer = null;
        }
        if (this._requestedIds.length >= this._limitPerRequest) {
            void this._handleBatch(this._requestedIds.splice(0, this._limitPerRequest));
        }
        else {
            this._waitTimer = setTimeout(() => {
                void this._handleBatch(this._requestedIds.splice(0, this._limitPerRequest));
            }, this._delay);
        }
        return await promise;
    }
    async _handleBatch(ids) {
        var _a;
        try {
            const { data } = await this._doRequest(ids);
            const dataById = (0, shared_utils_1.indexBy)(data, this._matchKey);
            for (const id of ids) {
                for (const resolver of (_a = this._requestResolversById.get(id)) !== null && _a !== void 0 ? _a : []) {
                    if (Object.prototype.hasOwnProperty.call(dataById, id)) {
                        resolver.resolve(this._mapper(dataById[id]));
                    }
                    else {
                        resolver.resolve(null);
                    }
                }
                this._requestResolversById.delete(id);
            }
        }
        catch (e) {
            await Promise.all(ids.map(async (id) => {
                var _a, _b;
                try {
                    const result = await this._doRequest([id]);
                    for (const resolver of (_a = this._requestResolversById.get(id)) !== null && _a !== void 0 ? _a : []) {
                        resolver.resolve(result.data.length ? this._mapper(result.data[0]) : null);
                    }
                }
                catch (e_) {
                    for (const resolver of (_b = this._requestResolversById.get(id)) !== null && _b !== void 0 ? _b : []) {
                        resolver.reject(e_);
                    }
                }
                this._requestResolversById.delete(id);
            }));
        }
    }
    async _doRequest(ids) {
        return await this._client.callApi({
            type: 'helix',
            ...this._callOptions,
            query: {
                ...this._callOptions.query,
                [this._queryParamName]: ids,
            },
        });
    }
}
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixRequestBatcher.prototype, "_client", void 0);
exports.HelixRequestBatcher = HelixRequestBatcher;
