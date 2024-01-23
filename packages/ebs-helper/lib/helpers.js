"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendExtensionPubSubWhisperMessage = exports.sendExtensionPubSubBroadcastMessage = exports.sendExtensionPubSubGlobalMessage = exports.sendExtensionChatMessage = exports.setExtensionDeveloperConfiguration = exports.setExtensionBroadcasterConfiguration = exports.setExtensionGlobalConfiguration = exports.getExtensionDeveloperConfiguration = exports.getExtensionBroadcasterConfiguration = exports.getExtensionGlobalConfiguration = exports.setExtensionRequiredConfiguration = exports.createExtensionSecret = exports.getExtensionSecrets = exports.getExtension = void 0;
const shared_utils_1 = require("@d-fischer/shared-utils");
const api_call_1 = require("@twurple/api-call");
const common_1 = require("@twurple/common");
const HelixExtensionConfigurationSegment_1 = require("./classes/HelixExtensionConfigurationSegment");
const HelixExtensionSecretList_1 = require("./classes/HelixExtensionSecretList");
const helpers_external_1 = require("./helpers.external");
const jwt_1 = require("./jwt");
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
async function getExtension(config, version) {
    const jwt = await (0, jwt_1.createExternalJwt)(config);
    const result = await (0, api_call_1.callTwitchApi)({
        url: 'extensions',
        query: (0, helpers_external_1.getExtensionQuery)(config, version),
    }, config.clientId, jwt);
    return (0, shared_utils_1.mapNullable)(result.data[0], data => new common_1.HelixExtension(data));
}
exports.getExtension = getExtension;
/**
 * Fetches the extension's secrets.
 *
 * @param config
 *
 * @expandParams
 */
async function getExtensionSecrets(config) {
    const jwt = await (0, jwt_1.createExternalJwt)(config);
    const result = await (0, api_call_1.callTwitchApi)({
        url: 'extensions/jwt/secrets',
        query: (0, helpers_external_1.getExtensionSecretsQuery)(config),
    }, config.clientId, jwt);
    return new HelixExtensionSecretList_1.HelixExtensionSecretList(result.data[0]);
}
exports.getExtensionSecrets = getExtensionSecrets;
/**
 * Creates a new extension secret.
 *
 * @param config
 * @param delay The delay after which extension frontends will use the new secret. Defaults to 300 seconds.
 *
 * @expandParams
 */
async function createExtensionSecret(config, delay) {
    const jwt = await (0, jwt_1.createExternalJwt)(config);
    const result = await (0, api_call_1.callTwitchApi)({
        url: 'extensions/jwt/secrets',
        method: 'POST',
        query: (0, helpers_external_1.getExtensionSecretCreateQuery)(config, delay),
    }, config.clientId, jwt);
    return new HelixExtensionSecretList_1.HelixExtensionSecretList(result.data[0]);
}
exports.createExtensionSecret = createExtensionSecret;
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
async function setExtensionRequiredConfiguration(config, broadcaster, version, configVersion) {
    const jwt = await (0, jwt_1.createExternalJwt)(config);
    await (0, api_call_1.callTwitchApi)({
        url: 'extensions/required_configuration',
        query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        jsonBody: (0, helpers_external_1.createExtensionRequiredConfigurationBody)(config, version, configVersion),
    }, config.clientId, jwt);
}
exports.setExtensionRequiredConfiguration = setExtensionRequiredConfiguration;
/** @internal */
async function getAnyConfigurationSegment(config, segment, broadcaster) {
    const jwt = await (0, jwt_1.createExternalJwt)(config);
    const result = await (0, api_call_1.callTwitchApi)({
        url: 'extensions/configurations',
        query: (0, helpers_external_1.createConfigurationSegmentQuery)(config, segment, broadcaster),
    }, config.clientId, jwt);
    return (0, shared_utils_1.mapNullable)(result.data[0], data => new HelixExtensionConfigurationSegment_1.HelixExtensionConfigurationSegment(data));
}
/**
 * Fetches the global configuration of an extension.
 *
 * @param config
 *
 * @expandParams
 */
async function getExtensionGlobalConfiguration(config) {
    return await getAnyConfigurationSegment(config, 'global');
}
exports.getExtensionGlobalConfiguration = getExtensionGlobalConfiguration;
/**
 * Fetches the broadcaster configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to fetch the configuration for.
 *
 * @expandParams
 */
async function getExtensionBroadcasterConfiguration(config, broadcaster) {
    return await getAnyConfigurationSegment(config, 'broadcaster', broadcaster);
}
exports.getExtensionBroadcasterConfiguration = getExtensionBroadcasterConfiguration;
/**
 * Fetches the developer configuration of an extension for a broadcaster.
 *
 * @param config
 * @param broadcaster The broadcaster to fetch the configuration for.
 *
 * @expandParams
 */
async function getExtensionDeveloperConfiguration(config, broadcaster) {
    return await getAnyConfigurationSegment(config, 'developer', broadcaster);
}
exports.getExtensionDeveloperConfiguration = getExtensionDeveloperConfiguration;
/** @internal */
async function setAnyConfigurationSegment(config, segment, broadcaster, content, version) {
    const jwt = await (0, jwt_1.createExternalJwt)(config);
    await (0, api_call_1.callTwitchApi)({
        url: 'extensions/configurations',
        method: 'PUT',
        jsonBody: (0, helpers_external_1.createConfigurationSegmentBody)(config, segment, broadcaster, content, version),
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
async function setExtensionGlobalConfiguration(config, content, version) {
    await setAnyConfigurationSegment(config, 'global', undefined, content, version);
}
exports.setExtensionGlobalConfiguration = setExtensionGlobalConfiguration;
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
async function setExtensionBroadcasterConfiguration(config, broadcaster, content, version) {
    await setAnyConfigurationSegment(config, 'broadcaster', broadcaster, content, version);
}
exports.setExtensionBroadcasterConfiguration = setExtensionBroadcasterConfiguration;
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
async function setExtensionDeveloperConfiguration(config, broadcaster, content, version) {
    await setAnyConfigurationSegment(config, 'developer', broadcaster, content, version);
}
exports.setExtensionDeveloperConfiguration = setExtensionDeveloperConfiguration;
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
async function sendExtensionChatMessage(config, broadcaster, extensionVersion, text) {
    const jwt = await (0, jwt_1.createExternalJwt)({ ...config, additionalData: (0, helpers_external_1.createChatMessageJwtData)(broadcaster) });
    await (0, api_call_1.callTwitchApi)({
        url: 'extensions/chat',
        method: 'POST',
        query: (0, api_call_1.createBroadcasterQuery)(broadcaster),
        jsonBody: (0, helpers_external_1.createChatMessageBody)(config, extensionVersion, text),
    }, config.clientId, jwt);
}
exports.sendExtensionChatMessage = sendExtensionChatMessage;
/** @internal */
async function sendAnyExtensionPubSubMessage(config, targets, message, broadcaster) {
    const jwt = await (0, jwt_1.createExternalJwt)({
        ...config,
        additionalData: (0, helpers_external_1.createPubSubMessageJwtData)(broadcaster, targets),
    });
    await (0, api_call_1.callTwitchApi)({
        url: 'extensions/pubsub',
        method: 'POST',
        jsonBody: (0, helpers_external_1.createPubSubMessageBody)(targets, broadcaster, message),
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
async function sendExtensionPubSubGlobalMessage(config, message) {
    const jwt = await (0, jwt_1.createExternalJwt)({
        ...config,
        additionalData: (0, helpers_external_1.createPubSubGlobalMessageJwtData)(),
    });
    await (0, api_call_1.callTwitchApi)({
        url: 'extensions/pubsub',
        method: 'POST',
        jsonBody: (0, helpers_external_1.createPubSubGlobalMessageBody)(message),
    }, config.clientId, jwt);
}
exports.sendExtensionPubSubGlobalMessage = sendExtensionPubSubGlobalMessage;
/**
 * Sends an Extension PubSub message to all users of an extension in a channel.
 *
 * @param config
 * @param broadcaster The broadcaster to broadcast the message to.
 * @param message The content of the message.
 *
 * @expandParams
 */
async function sendExtensionPubSubBroadcastMessage(config, broadcaster, message) {
    await sendAnyExtensionPubSubMessage(config, ['broadcast'], message, broadcaster);
}
exports.sendExtensionPubSubBroadcastMessage = sendExtensionPubSubBroadcastMessage;
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
async function sendExtensionPubSubWhisperMessage(config, broadcaster, targets, message) {
    const targetsArray = Array.isArray(targets) ? targets : [targets];
    await sendAnyExtensionPubSubMessage(config, targetsArray.map(u => `whisper-${(0, common_1.extractUserId)(u)}`), message, broadcaster);
}
exports.sendExtensionPubSubWhisperMessage = sendExtensionPubSubWhisperMessage;
