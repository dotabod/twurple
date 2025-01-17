"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenIsExpired = exports.getExpiryDateOfAccessToken = void 0;
const shared_utils_1 = require("@d-fischer/shared-utils");
// one minute
const EXPIRY_GRACE_PERIOD = 60000;
function getExpiryMillis(token) {
    return (0, shared_utils_1.mapNullable)(token.expiresIn, _ => token.obtainmentTimestamp + _ * 1000 - EXPIRY_GRACE_PERIOD);
}
/**
 * Calculates the date when the access token will expire.
 *
 * A one-minute grace period is applied for smooth handling of API latency.
 *
 * May be `null`, in which case the token does not expire.
 * This can only be the case with very old Client IDs.
 *
 * @param token The access token.
 */
function getExpiryDateOfAccessToken(token) {
    return (0, shared_utils_1.mapNullable)(getExpiryMillis(token), _ => new Date(_));
}
exports.getExpiryDateOfAccessToken = getExpiryDateOfAccessToken;
/**
 * Calculates whether the given access token is expired.
 *
 * A one-minute grace period is applied for smooth handling of API latency.
 *
 * @param token The access token.
 */
function accessTokenIsExpired(token) {
    var _a;
    return (_a = (0, shared_utils_1.mapNullable)(getExpiryMillis(token), _ => Date.now() > _)) !== null && _a !== void 0 ? _a : false;
}
exports.accessTokenIsExpired = accessTokenIsExpired;
