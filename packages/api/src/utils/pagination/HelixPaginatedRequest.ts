import { Enumerable } from '@d-fischer/shared-utils';
import type { HelixPaginatedResponse, TwitchApiCallOptions } from '@twurple/api-call';
import { rtfm } from '@twurple/common';
import { type BaseApiClient } from '../../client/BaseApiClient';
import { type ContextApiCallOptions } from '../../client/ContextApiCallOptions';

if (!Object.prototype.hasOwnProperty.call(Symbol, 'asyncIterator')) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unnecessary-condition,@typescript-eslint/no-unsafe-member-access
	(Symbol as any).asyncIterator = Symbol.asyncIterator ?? Symbol.for('Symbol.asyncIterator');
}

/**
 * Represents a request to the new Twitch API (Helix) that utilizes a cursor to paginate through its results.
 *
 * Aside from the methods described below, you can also utilize the async iterator using `for await .. of`:
 *
 * ```ts
 * const result = client.videos.getVideosByUserPaginated('125328655');
 * for await (const video of result) {
 *     console.log(video.title);
 * }
 * ```
 */
@rtfm('api', 'HelixPaginatedRequest')
export class HelixPaginatedRequest<D, T> {
	/** @internal */ @Enumerable(false) private readonly _client: BaseApiClient;

	/** @internal */ protected _currentCursor?: string;
	/** @internal */ protected _isFinished = false;
	/** @internal */ protected _currentData?: HelixPaginatedResponse<D>;

	/** @internal */
	constructor(
		private readonly _callOptions: Omit<ContextApiCallOptions, 'type'>,
		client: BaseApiClient,
		private readonly _mapper: (data: D) => T | T[],
		private readonly _limitPerPage: number = 100,
	) {
		this._client = client;
	}

	/**
	 * The last fetched page of data associated to the requested resource.
	 *
	 * Only works with {@link HelixPaginatedRequest#getNext}} and not with any other methods of data fetching.
	 */
	get current(): D[] | undefined {
		return this._currentData?.data;
	}

	/**
	 * Gets the next available page of data associated to the requested resource, or an empty array if there are no more available pages.
	 */
	async getNext(): Promise<T[]> {
		if (this._isFinished) {
			return [];
		}

		const result = await this._fetchData();

		// should never be null, but in practice is sometimes
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!result.data?.length) {
			this._isFinished = true;
			return [];
		}

		return this._processResult(result);
	}

	/**
	 * Gets all data associated to the requested resource.
	 *
	 * Be aware that this makes multiple calls to the Twitch API. Due to this, you might be more suspectible to rate limits.
	 *
	 * Also be aware that this resets the internal cursor, so avoid using this and {@link HelixPaginatedRequest#getNext}} together.
	 */
	async getAll(): Promise<T[]> {
		this.reset();
		const result = [];
		do {
			const data = await this.getNext();
			if (!data.length) {
				break;
			}
			result.push(...data);
		} while (this._currentCursor);
		this.reset();

		return result;
	}

	/**
	 * Gets the current cursor.
	 *
	 * Only useful if you want to make manual requests to the API.
	 */
	get currentCursor(): string | undefined {
		return this._currentCursor;
	}

	/**
	 * Resets the internal cursor.
	 *
	 * This will make {@link HelixPaginatedRequest#getNext}} start from the first page again.
	 */
	reset(): void {
		this._currentCursor = undefined;
		this._isFinished = false;
		this._currentData = undefined;
	}

	async *[Symbol.asyncIterator](): AsyncGenerator<T, void, undefined> {
		this.reset();
		while (true) {
			const data = await this.getNext();
			if (!data.length) {
				break;
			}
			yield* data[Symbol.iterator]();
		}
	}

	/** @internal */
	protected async _fetchData(
		additionalOptions: Partial<TwitchApiCallOptions> = {},
	): Promise<HelixPaginatedResponse<D>> {
		return await this._client.callApi<HelixPaginatedResponse<D>>({
			type: 'helix',
			...this._callOptions,
			...additionalOptions,
			query: {
				...this._callOptions.query,
				after: this._currentCursor,
				first: this._limitPerPage.toString(),
				...additionalOptions.query,
			},
		});
	}

	/** @internal */
	private _processResult(result: HelixPaginatedResponse<D>): T[] {
		this._currentCursor = typeof result.pagination === 'string' ? result.pagination : result.pagination?.cursor;
		if (this._currentCursor === undefined) {
			this._isFinished = true;
		}
		this._currentData = result;

		return result.data.reduce<T[]>((acc, elem) => {
			const mapped = this._mapper(elem);
			return Array.isArray(mapped) ? [...acc, ...mapped] : [...acc, mapped];
		}, []);
	}
}
