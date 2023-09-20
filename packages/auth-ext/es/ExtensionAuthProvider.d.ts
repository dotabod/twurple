import type { AccessTokenMaybeWithUserId, AccessTokenWithUserId, AuthProvider } from '@twurple/auth';
import { type UserIdResolvable } from '@twurple/common';
export declare class ExtensionAuthProvider implements AuthProvider {
    readonly clientId: string;
    authorizationType: string;
    currentScopes: never[];
    constructor(clientId: string);
    getCurrentScopesForUser(): string[];
    getAccessTokenForUser(user: UserIdResolvable, ...scopeSets: Array<string[] | undefined>): Promise<AccessTokenWithUserId>;
    getAnyAccessToken(): Promise<AccessTokenMaybeWithUserId>;
    refreshAccessTokenForUser(user: UserIdResolvable): Promise<AccessTokenWithUserId>;
}
