import type { UserIdResolvable } from '@twurple/common';
import { HelixExtension } from '@twurple/common';
import { HelixExtensionConfigurationSegment } from './classes/HelixExtensionConfigurationSegment';
import { HelixExtensionSecretList } from './classes/HelixExtensionSecretList';
import type { BaseExternalJwtConfig } from './jwt';
/**
 * Configuration for an EBS call.
 *
 * @inheritDoc
 */
export interface EbsCallConfig extends BaseExternalJwtConfig {
    /**
     * The client ID of the extension.
     */
    clientId: string;
}
/**
 * Feetches details about the extension.
 *
 * @param config
 * @param version The extension version to fetch details for.
 *
 * If not given, fetches the details of the latest released version.
 *
 * @expandParams
 */
export declare function getExtension(config: EbsCallConfig, version?: string): Promise<HelixExtension | null>;
/**
 * Fetches the extension's secrets.
 *
 * @param config
 *
 * @expandParams
 */
export declare function getExtensionSecrets(config: EbsCallConfig): Promise<HelixExtensionSecretList>;
/**
 * Creates a new extension secret.
 *
 * @param config
 * @param delay The delay after which extension frontends will use the new secret. Defaults to 300 seconds.
 *
 * @expandParams
 */
export declare function createExtensionSecret(config: EbsCallConfig, delay?: number): Promise<HelixExtensionSecretList>;
/**
 * Sets a new required configuration version for a specific broadcaster using an extension.
 *
 * @param config
 * @param broadcaster The broadcaster to update the required configuration version for.
 * @param version The extension's version.
 * @param configVersion The new required configuration version.
 *
 * @expandParams
 */
export declare function setExtensionRequiredConfiguration(config: EbsCallConfig, broadcaster: UserIdResolvable, version: string, configVersion: string): Promise<void>;
/**
 * Fetches the global configuration of an extension.
 *
 * @param config
 *
 * @expandParams
 */
export declare function getExtensionGlobalConfiguration(config: EbsCallConfig): Promise<HelixExtensionConfigurationSegment | null>;
/**
 * Fetches the broadcaster configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to fetch the configuration for.
 *
 * @expandParams
 */
export declare function getExtensionBroadcasterConfiguration(config: EbsCallConfig, broadcaster: UserIdResolvable): Promise<HelixExtensionConfigurationSegment | null>;
/**
 * Fetches the developer configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to fetch the configuration for.
 *
 * @expandParams
 */
export declare function getExtensionDeveloperConfiguration(config: EbsCallConfig, broadcaster: UserIdResolvable): Promise<HelixExtensionConfigurationSegment | null>;
/**
 * Changes the global configuration of an extension.
 *
 * @param config
 * @param content The new configuration content.
 * @param version The configuration version associated with the new configuration.
 *
 * @expandParams
 */
export declare function setExtensionGlobalConfiguration(config: EbsCallConfig, content: string, version?: string): Promise<void>;
/**
 * Changes the broadcaster configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to change the configuration for.
 * @param content The new configuration content.
 * @param version The configuration version associated with the new configuration.
 *
 * @expandParams
 */
export declare function setExtensionBroadcasterConfiguration(config: EbsCallConfig, broadcaster: UserIdResolvable, content: string, version?: string): Promise<void>;
/**
 * Changes the developer configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to change the configuration for.
 * @param content The new configuration content.
 * @param version The configuration version associated with the new configuration.
 *
 * @expandParams
 */
export declare function setExtensionDeveloperConfiguration(config: EbsCallConfig, broadcaster: UserIdResolvable, content: string, version?: string): Promise<void>;
/**
 * Sends a chat message in the name of the extension to a channel.
 *
 * @param config
 * @param broadcaster The broadcaster to send a chat message to.
 * @param extensionVersion The version of the extension.
 * @param text The text to send to the channel.
 *
 * @expandParams
 */
export declare function sendExtensionChatMessage(config: EbsCallConfig, broadcaster: UserIdResolvable, extensionVersion: string, text: string): Promise<void>;
/**
 * Sends an Extension PubSub message to all users of an extension across all channels.
 *
 * @param config
 * @param message The content of the message.
 *
 * @expandParams
 */
export declare function sendExtensionPubSubGlobalMessage(config: EbsCallConfig, message: string): Promise<void>;
/**
 * Sends an Extension PubSub message to all users of an extension in a channel.
 *
 * @param config
 * @param broadcaster The broadcaster to broadcast the message to.
 * @param message The content of the message.
 *
 * @expandParams
 */
export declare function sendExtensionPubSubBroadcastMessage(config: EbsCallConfig, broadcaster: UserIdResolvable, message: string): Promise<void>;
/**
 * Sends an Extension PubSub message to specified users in the context of a channel.
 *
 * @param config
 * @param broadcaster The broadcaster that is used as the context of the message.
 * @param targets The user(s) you want to send the message to.
 * @param message The content of the message.
 *
 * @expandParams
 */
export declare function sendExtensionPubSubWhisperMessage(config: EbsCallConfig, broadcaster: UserIdResolvable, targets: UserIdResolvable | UserIdResolvable[], message: string): Promise<void>;
//# sourceMappingURL=helpers.d.ts.map