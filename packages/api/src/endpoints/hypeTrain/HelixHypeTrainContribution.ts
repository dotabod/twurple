import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { type BaseApiClient } from '../../client/BaseApiClient';
import {
	type HelixHypeTrainContributionData,
	type HelixHypeTrainContributionType,
} from '../../interfaces/endpoints/hypeTrain.external';
import type { HelixUser } from '../user/HelixUser';

/**
 * A Hype Train contributor.
 */
@rtfm<HelixHypeTrainContribution>('api', 'HelixHypeTrainContribution', 'userId')
export class HelixHypeTrainContribution extends DataObject<HelixHypeTrainContributionData> {
	/** @internal */ @Enumerable(false) private readonly _client: BaseApiClient;

	/** @internal */
	constructor(data: HelixHypeTrainContributionData, client: BaseApiClient) {
		super(data);
		this._client = client;
	}

	/**
	 * The ID of the user contributing to the Hype Train.
	 */
	get userId(): string {
		return this[rawDataSymbol].user;
	}

	/**
	 * Gets additional information about the user contributing to the Hype Train.
	 */
	async getUser(): Promise<HelixUser> {
		return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user));
	}

	/**
	 * The Hype Train event type.
	 */
	get type(): HelixHypeTrainContributionType {
		return this[rawDataSymbol].type;
	}

	/**
	 * The total contribution amount in subs or bits.
	 */
	get total(): number {
		return this[rawDataSymbol].total;
	}
}
