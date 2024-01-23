"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixExtensionSecretList = void 0;
const common_1 = require("@twurple/common");
const jose_1 = require("jose");
class HelixExtensionSecretList extends common_1.DataObject {
    get latestSecret() {
        var _a, _b;
        return ((_b = (_a = this[common_1.rawDataSymbol].secrets
            .slice()
            .sort((a, b) => new Date(b.expires_at).getTime() - new Date(a.expires_at).getTime())[0]) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : null);
    }
    get currentSecrets() {
        const now = new Date();
        return this[common_1.rawDataSymbol].secrets
            .filter(secret => {
            const start = new Date(secret.active_at);
            const end = new Date(secret.expires_at);
            return start < now && now < end;
        })
            .sort((a, b) => new Date(b.expires_at).getTime() - new Date(a.expires_at).getTime())
            .map(secret => secret.content);
    }
    async verifyJwt(token) {
        for (const secret of this.currentSecrets) {
            try {
                const { payload } = await (0, jose_1.jwtVerify)(token, jose_1.base64url.decode(secret), {
                    algorithms: ['HS256'],
                });
                return payload;
            }
            catch (e) {
                if (e instanceof jose_1.errors.JWSSignatureVerificationFailed) {
                    continue;
                }
                throw e;
            }
        }
        throw new Error('Could not find a secret that could verify this token');
    }
}
exports.HelixExtensionSecretList = HelixExtensionSecretList;
