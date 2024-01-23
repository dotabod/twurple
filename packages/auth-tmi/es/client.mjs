import { getValidTokenFromProviderForIntent } from '@twurple/auth';
import { Client as BaseClient } from 'tmi.js';
/**
 * An extension of the tmi.js client which extends it with {@link AuthProvider} integration.
 */
export class DecoratedClient extends BaseClient {
    /**
     * Creates a new tmi.js client which utilizes the given {@link AuthProvider} instance.
     *
     * @param opts The tmi.js options, with the auth provider replacing the identity option.
     */
    constructor(opts) {
        const { authProvider, authIntents = [], ...tmiOpts } = opts;
        super({
            ...tmiOpts,
            identity: {
                // need this because we can't get a username dynamically, but need something to not default to justinfan
                username: 'dummy',
                password: async () => {
                    let lastTokenError = undefined;
                    for (const intent of [...authIntents, 'chat']) {
                        try {
                            const { accessToken } = await getValidTokenFromProviderForIntent(authProvider, intent, [
                                'chat:read',
                                'chat:edit',
                            ]);
                            return accessToken.accessToken;
                        }
                        catch (e) {
                            lastTokenError = e;
                        }
                    }
                    throw new Error('Could not find a token for any given intent', { cause: lastTokenError });
                },
            },
        });
    }
}
export const Client = DecoratedClient;
