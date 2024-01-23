import { mapNullable } from '@d-fischer/shared-utils';
import { callTwitchApi, createBroadcasterQuery } from '@twurple/api-call';
import { extractUserId, HelixExtension } from '@twurple/common';
import { HelixExtensionConfigurationSegment, } from "./classes/HelixExtensionConfigurationSegment.mjs";
import { HelixExtensionSecretList } from "./classes/HelixExtensionSecretList.mjs";
import { createChatMessageBody, createChatMessageJwtData, createConfigurationSegmentBody, createConfigurationSegmentQuery, createExtensionRequiredConfigurationBody, createPubSubGlobalMessageBody, createPubSubGlobalMessageJwtData, createPubSubMessageBody, createPubSubMessageJwtData, getExtensionQuery, getExtensionSecretCreateQuery, getExtensionSecretsQuery, } from "./helpers.external.mjs";
import { createExternalJwt } from "./jwt.mjs";
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
export async function getExtension(config, version) {
    const jwt = await createExternalJwt(config);
    const result = await callTwitchApi({
        url: 'extensions',
        query: getExtensionQuery(config, version),
    }, config.clientId, jwt);
    return mapNullable(result.data[0], data => new HelixExtension(data));
}
/**
 * Fetches the extension's secrets.
 *
 * @param config
 *
 * @expandParams
 */
export async function getExtensionSecrets(config) {
    const jwt = await createExternalJwt(config);
    const result = await callTwitchApi({
        url: 'extensions/jwt/secrets',
        query: getExtensionSecretsQuery(config),
    }, config.clientId, jwt);
    return new HelixExtensionSecretList(result.data[0]);
}
/**
 * Creates a new extension secret.
 *
 * @param config
 * @param delay The delay after which extension frontends will use the new secret. Defaults to 300 seconds.
 *
 * @expandParams
 */
export async function createExtensionSecret(config, delay) {
    const jwt = await createExternalJwt(config);
    const result = await callTwitchApi({
        url: 'extensions/jwt/secrets',
        method: 'POST',
        query: getExtensionSecretCreateQuery(config, delay),
    }, config.clientId, jwt);
    return new HelixExtensionSecretList(result.data[0]);
}
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
export async function setExtensionRequiredConfiguration(config, broadcaster, version, configVersion) {
    const jwt = await createExternalJwt(config);
    await callTwitchApi({
        url: 'extensions/required_configuration',
        query: createBroadcasterQuery(broadcaster),
        jsonBody: createExtensionRequiredConfigurationBody(config, version, configVersion),
    }, config.clientId, jwt);
}
/** @internal */
async function getAnyConfigurationSegment(config, segment, broadcaster) {
    const jwt = await createExternalJwt(config);
    const result = await callTwitchApi({
        url: 'extensions/configurations',
        query: createConfigurationSegmentQuery(config, segment, broadcaster),
    }, config.clientId, jwt);
    return mapNullable(result.data[0], data => new HelixExtensionConfigurationSegment(data));
}
/**
 * Fetches the global configuration of an extension.
 *
 * @param config
 *
 * @expandParams
 */
export async function getExtensionGlobalConfiguration(config) {
    return await getAnyConfigurationSegment(config, 'global');
}
/**
 * Fetches the broadcaster configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to fetch the configuration for.
 *
 * @expandParams
 */
export async function getExtensionBroadcasterConfiguration(config, broadcaster) {
    return await getAnyConfigurationSegment(config, 'broadcaster', broadcaster);
}
/**
 * Fetches the developer configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to fetch the configuration for.
 *
 * @expandParams
 */
export async function getExtensionDeveloperConfiguration(config, broadcaster) {
    return await getAnyConfigurationSegment(config, 'developer', broadcaster);
}
/** @internal */
async function setAnyConfigurationSegment(config, segment, broadcaster, content, version) {
    const jwt = await createExternalJwt(config);
    await callTwitchApi({
        url: 'extensions/configurations',
        method: 'PUT',
        jsonBody: createConfigurationSegmentBody(config, segment, broadcaster, content, version),
    }, config.clientId, jwt);
}
/**
 * Changes the global configuration of an extension.
 *
 * @param config
 * @param content The new configuration content.
 * @param version The configuration version associated with the new configuration.
 *
 * @expandParams
 */
export async function setExtensionGlobalConfiguration(config, content, version) {
    await setAnyConfigurationSegment(config, 'global', undefined, content, version);
}
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
export async function setExtensionBroadcasterConfiguration(config, broadcaster, content, version) {
    await setAnyConfigurationSegment(config, 'broadcaster', broadcaster, content, version);
}
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
export async function setExtensionDeveloperConfiguration(config, broadcaster, content, version) {
    await setAnyConfigurationSegment(config, 'developer', broadcaster, content, version);
}
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
export async function sendExtensionChatMessage(config, broadcaster, extensionVersion, text) {
    const jwt = await createExternalJwt({ ...config, additionalData: createChatMessageJwtData(broadcaster) });
    await callTwitchApi({
        url: 'extensions/chat',
        method: 'POST',
        query: createBroadcasterQuery(broadcaster),
        jsonBody: createChatMessageBody(config, extensionVersion, text),
    }, config.clientId, jwt);
}
/** @internal */
async function sendAnyExtensionPubSubMessage(config, targets, message, broadcaster) {
    const jwt = await createExternalJwt({
        ...config,
        additionalData: createPubSubMessageJwtData(broadcaster, targets),
    });
    await callTwitchApi({
        url: 'extensions/pubsub',
        method: 'POST',
        jsonBody: createPubSubMessageBody(targets, broadcaster, message),
    }, config.clientId, jwt);
}
/**
 * Sends an Extension PubSub message to all users of an extension across all channels.
 *
 * @param config
 * @param message The content of the message.
 *
 * @expandParams
 */
export async function sendExtensionPubSubGlobalMessage(config, message) {
    const jwt = await createExternalJwt({
        ...config,
        additionalData: createPubSubGlobalMessageJwtData(),
    });
    await callTwitchApi({
        url: 'extensions/pubsub',
        method: 'POST',
        jsonBody: createPubSubGlobalMessageBody(message),
    }, config.clientId, jwt);
}
/**
 * Sends an Extension PubSub message to all users of an extension in a channel.
 *
 * @param config
 * @param broadcaster The broadcaster to broadcast the message to.
 * @param message The content of the message.
 *
 * @expandParams
 */
export async function sendExtensionPubSubBroadcastMessage(config, broadcaster, message) {
    await sendAnyExtensionPubSubMessage(config, ['broadcast'], message, broadcaster);
}
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
export async function sendExtensionPubSubWhisperMessage(config, broadcaster, targets, message) {
    const targetsArray = Array.isArray(targets) ? targets : [targets];
    await sendAnyExtensionPubSubMessage(config, targetsArray.map(u => `whisper-${extractUserId(u)}`), message, broadcaster);
}
