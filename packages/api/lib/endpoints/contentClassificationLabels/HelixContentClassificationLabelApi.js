"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixContentClassificationLabelApi = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const BaseApi_1 = require("../BaseApi");
const HelixContentClassificationLabel_1 = require("./HelixContentClassificationLabel");
/**
 * The Helix API methods that deal with content classification labels.
 *
 * Can be accessed using `client.contentClassificationLabels` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const labels = await api.contentClassificationLabels.getAll();
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Content classification labels
 */
let HelixContentClassificationLabelApi = class HelixContentClassificationLabelApi extends BaseApi_1.BaseApi {
    /**
     * Fetches a list of all content classification labels.
     *
     * @param locale The locale for the content classification labels.
     */
    async getAll(locale) {
        const result = await this._client.callApi({
            url: 'content_classification_labels',
            query: {
                locale,
            },
        });
        return result.data.map(data => new HelixContentClassificationLabel_1.HelixContentClassificationLabel(data));
    }
};
HelixContentClassificationLabelApi = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixContentClassificationLabelApi')
], HelixContentClassificationLabelApi);
exports.HelixContentClassificationLabelApi = HelixContentClassificationLabelApi;
