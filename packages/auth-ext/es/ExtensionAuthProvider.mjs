import { extractUserId } from '@twurple/common';
export class ExtensionAuthProvider {
    constructor(clientId) {
        this.clientId = clientId;
        this.authorizationType = 'Extension';
        this.currentScopes = [];
        if (!('Twitch' in globalThis)) {
            throw new Error("This is not an extension, or you didn't load the Twitch Extension Helper properly.");
        }
    }
    getCurrentScopesForUser() {
        return [];
    }
    async getAccessTokenForUser(user, ...scopeSets) {
        if (scopeSets.length && scopeSets.some(set => set === null || set === void 0 ? void 0 : set.length)) {
            throw new Error(`Scopes ${scopeSets
                .filter((val) => Boolean(val))
                .map(scopes => scopes.join('|'))
                .join(', ')} requested but direct extension calls do not support scopes. Please use an EBS instead.`);
        }
        return {
            ...(await this.getAnyAccessToken()),
            userId: extractUserId(user)
        };
    }
    async getAnyAccessToken() {
        const accessToken = Twitch.ext.viewer.helixToken;
        if (accessToken == null) {
            throw new Error(`Could not retrieve an access token from the Twitch extension environment. This could mean different things:
			
- You're in a mobile extension or the Extension Developer Rig. This is a known issue that has to be resolved by Twitch.
- You didn't wait for the onAuthorized callback before doing any API calls. Before this callback fires, a token is not available.`);
        }
        return {
            accessToken,
            refreshToken: null,
            expiresIn: null,
            obtainmentTimestamp: Date.now(),
            scope: []
        };
    }
    async refreshAccessTokenForUser(user) {
        // basically just retry
        return await this.getAccessTokenForUser(user);
    }
}
