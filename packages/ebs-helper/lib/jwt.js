"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExternalJwt = void 0;
const jose_1 = require("jose");
const jwt_external_1 = require("./jwt.external");
/**
 * Creates a JWT with the role "external" to use with the various extension APIs.
 *
 * @param config The configuration of the JWT to generate.
 *
 * @expandParams
 */
async function createExternalJwt(config) {
    var _a;
    const ttl = (_a = config.ttl) !== null && _a !== void 0 ? _a : 60;
    const dataToSign = (0, jwt_external_1.createExternalJwtData)(config, ttl);
    const jwt = await new jose_1.SignJWT(dataToSign)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(jose_1.base64url.decode(config.secret));
    return jwt;
}
exports.createExternalJwt = createExternalJwt;
