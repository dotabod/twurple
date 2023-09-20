"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExternalJwtData = void 0;
/** @internal */
function createExternalJwtData(config, ttl) {
    return {
        ...config.additionalData,
        exp: Math.floor(Date.now() / 1000) + ttl,
        user_id: config.ownerId,
        role: 'external'
    };
}
exports.createExternalJwtData = createExternalJwtData;
