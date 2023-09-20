import { DataObject } from '@twurple/common';
export type HelixExtensionConfigurationSegmentName = 'global' | 'broadcaster' | 'developer';
export interface HelixExtensionConfigurationSegmentData {
    segment: HelixExtensionConfigurationSegmentName;
    content: string;
    version: string;
}
export declare class HelixExtensionConfigurationSegment extends DataObject<HelixExtensionConfigurationSegmentData> {
    get segmentName(): HelixExtensionConfigurationSegmentName;
    get content(): string;
    get version(): string;
}
