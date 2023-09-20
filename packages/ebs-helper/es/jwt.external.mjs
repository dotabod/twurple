/** @internal */
export function createExternalJwtData(config, ttl) {
    return {
        ...config.additionalData,
        exp: Math.floor(Date.now() / 1000) + ttl,
        user_id: config.ownerId,
        role: 'external'
    };
}
