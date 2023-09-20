import { DataObject, rawDataSymbol } from '@twurple/common';
export class HelixExtensionConfigurationSegment extends DataObject {
    get segmentName() {
        return this[rawDataSymbol].segment;
    }
    get content() {
        return this[rawDataSymbol].content;
    }
    get version() {
        return this[rawDataSymbol].version;
    }
}
