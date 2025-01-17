import { ResponseBasedRateLimiter } from '@d-fischer/rate-limiter';
import { callTwitchApiRaw } from '@twurple/api-call';
/** @internal */
export class HelixRateLimiter extends ResponseBasedRateLimiter {
    async doRequest({ options, clientId, accessToken, authorizationType, fetchOptions, mockServerPort, }) {
        return await callTwitchApiRaw(options, clientId, accessToken, authorizationType, fetchOptions, mockServerPort);
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
