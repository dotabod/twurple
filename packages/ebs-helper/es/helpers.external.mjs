import { mapOptional } from '@d-fischer/shared-utils';
import { extractUserId } from '@twurple/common';
/** @internal */
export function getExtensionQuery(config, version) {
    return {
        extension_id: config.clientId,
        extension_version: version,
    };
}
/** @internal */
export function getExtensionSecretsQuery(config) {
    return {
        extension_id: config.clientId,
    };
}
/** @internal */
export function getExtensionSecretCreateQuery(config, delay) {
    return {
        extension_id: config.clientId,
        delay: delay === null || delay === void 0 ? void 0 : delay.toString(),
    };
}
/** @internal */
export function createExtensionRequiredConfigurationBody(config, version, configVersion) {
    return {
        extension_id: config.clientId,
        extension_version: version,
        required_configuration: configVersion,
    };
}
/** @internal */
export function createConfigurationSegmentQuery(config, segment, broadcaster) {
    return {
        extension_id: config.clientId,
        segment,
        broadcaster_id: mapOptional(broadcaster, extractUserId),
    };
}
/** @internal */
export function createConfigurationSegmentBody(config, segment, broadcaster, content, version) {
    return {
        extension_id: config.clientId,
        segment,
        broadcaster_id: mapOptional(broadcaster, extractUserId),
        content,
        version,
    };
}
/** @internal */
export function createChatMessageJwtData(broadcaster) {
    return { channel_id: extractUserId(broadcaster) };
}
/** @internal */
export function createChatMessageBody(config, extensionVersion, text) {
    return {
        extension_id: config.clientId,
        extension_version: extensionVersion,
        text,
    };
}
/** @internal */
export function createPubSubGlobalMessageJwtData() {
    return { channel_id: 'all', pubsub_perms: { send: ['global'] } };
}
/** @internal */
export function createPubSubGlobalMessageBody(message) {
    return {
        is_global_broadcast: true,
        target: ['global'],
        message,
    };
}
/** @internal */
export function createPubSubMessageJwtData(broadcaster, targets) {
    return { channel_id: extractUserId(broadcaster), pubsub_perms: { send: targets } };
}
/** @internal */
export function createPubSubMessageBody(targets, broadcaster, message) {
    return {
        target: targets,
        broadcaster_id: extractUserId(broadcaster),
        message,
    };
}
