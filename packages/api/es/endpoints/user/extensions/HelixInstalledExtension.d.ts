import { type HelixExtensionSlotType } from '../../../interfaces/endpoints/userExtension.external';
import { HelixBaseExtension } from './HelixBaseExtension';
/**
 * A Twitch Extension that is installed in a slot of a channel.
 *
 * @inheritDoc
 */
export declare class HelixInstalledExtension extends HelixBaseExtension {
    private readonly _slotType;
    private readonly _slotId;
    /**
     * The type of the slot the extension is in.
     */
    get slotType(): HelixExtensionSlotType;
    /**
     * The ID of the slot the extension is in.
     */
    get slotId(): string;
}
