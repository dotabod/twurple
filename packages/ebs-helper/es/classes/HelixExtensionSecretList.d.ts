import { DataObject } from '@twurple/common';
import { type JWTPayload } from 'jose';
import { type HelixExtensionSecretListData } from './HelixExtensionSecretList.external';
export declare class HelixExtensionSecretList extends DataObject<HelixExtensionSecretListData> {
    get latestSecret(): string | null;
    get currentSecrets(): string[];
    verifyJwt(token: string): Promise<JWTPayload>;
}
