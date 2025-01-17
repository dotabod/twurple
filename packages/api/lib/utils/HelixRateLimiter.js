"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixRateLimiter = void 0;
const rate_limiter_1 = require("@d-fischer/rate-limiter");
const api_call_1 = require("@twurple/api-call");
/** @internal */
class HelixRateLimiter extends rate_limiter_1.ResponseBasedRateLimiter {
    async doRequest({ options, clientId, accessToken, authorizationType, fetchOptions, mockServerPort, }) {
        return await (0, api_call_1.callTwitchApiRaw)(options, clientId, accessToken, authorizationType, fetchOptions, mockServerPort);
    }
    needsToRetryAfter(res) {
        if (res.status === 429 &&
            (!res.headers.has('ratelimit-remaining') || Number(res.headers.get('ratelimit-remaining')) === 0)) {
            return +res.headers.get('ratelimit-reset') * 1000 - Date.now();
        }
        return null;
    }
    getParametersFromResponse(res) {
        const { headers } = res;
        return {
            limit: +headers.get('ratelimit-limit'),
            remaining: +headers.get('ratelimit-remaining'),
            resetsAt: +headers.get('ratelimit-reset') * 1000,
        };
    }
}
exports.HelixRateLimiter = HelixRateLimiter;
