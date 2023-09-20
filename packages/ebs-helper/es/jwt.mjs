import { SignJWT, base64url } from 'jose';
import { createExternalJwtData } from "./jwt.external.mjs";
/**
 * Creates a JWT with the role "external" to use with the various extension APIs.
 *
 * @param config The configuration of the JWT to generate.
 *
 * @expandParams
 */
export async function createExternalJwt(config) {
    var _a;
    const ttl = (_a = config.ttl) !== null && _a !== void 0 ? _a : 60;
    const dataToSign = createExternalJwtData(config, ttl);
    const jwt = await new SignJWT(dataToSign)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(base64url.decode(config.secret));
    return jwt;
}
