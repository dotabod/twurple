"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.DecoratedClient = void 0;
const auth_1 = require("@twurple/auth");
const tmi_js_1 = require("tmi.js");
/**
 * An extension of the tmi.js client which extends it with {@link AuthProvider} integration.
 */
class DecoratedClient extends tmi_js_1.Client {
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
                            const { accessToken } = await (0, auth_1.getValidTokenFromProviderForIntent)(authProvider, intent, [
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
exports.DecoratedClient = DecoratedClient;
exports.Client = DecoratedClient;
