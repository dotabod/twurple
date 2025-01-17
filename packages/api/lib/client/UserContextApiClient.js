"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContextApiClient = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const BaseApiClient_1 = require("./BaseApiClient");
/** @private */
let UserContextApiClient = class UserContextApiClient extends BaseApiClient_1.BaseApiClient {
    /** @internal */
    constructor(config, logger, rateLimiter, _userId) {
        super(config, logger, rateLimiter);
        this._userId = _userId;
    }
    /** @internal */
    _getUserIdFromRequestContext() {
        return this._userId;
    }
};
UserContextApiClient = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'ApiClient')
], UserContextApiClient);
exports.UserContextApiClient = UserContextApiClient;
