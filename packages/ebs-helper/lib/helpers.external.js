"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPubSubMessageBody = exports.createPubSubMessageJwtData = exports.createPubSubGlobalMessageBody = exports.createPubSubGlobalMessageJwtData = exports.createChatMessageBody = exports.createChatMessageJwtData = exports.createConfigurationSegmentBody = exports.createConfigurationSegmentQuery = exports.createExtensionRequiredConfigurationBody = exports.getExtensionSecretCreateQuery = exports.getExtensionSecretsQuery = exports.getExtensionQuery = void 0;
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/** @internal */
function getExtensionQuery(config, version) {
    return {
        extension_id: config.clientId,
        extension_version: version
    };
}
exports.getExtensionQuery = getExtensionQuery;
/** @internal */
function getExtensionSecretsQuery(config) {
    return {
        extension_id: config.clientId
    };
}
exports.getExtensionSecretsQuery = getExtensionSecretsQuery;
/** @internal */
function getExtensionSecretCreateQuery(config, delay) {
    return {
        extension_id: config.clientId,
        delay: delay === null || delay === void 0 ? void 0 : delay.toString()
    };
}
exports.getExtensionSecretCreateQuery = getExtensionSecretCreateQuery;
/** @internal */
function createExtensionRequiredConfigurationBody(config, version, configVersion) {
    return {
        extension_id: config.clientId,
        extension_version: version,
        required_configuration: configVersion
    };
}
exports.createExtensionRequiredConfigurationBody = createExtensionRequiredConfigurationBody;
/** @internal */
function createConfigurationSegmentQuery(config, segment, broadcaster) {
    return {
        extension_id: config.clientId,
        segment,
        broadcaster_id: (0, shared_utils_1.mapOptional)(broadcaster, common_1.extractUserId)
    };
}
exports.createConfigurationSegmentQuery = createConfigurationSegmentQuery;
/** @internal */
function createConfigurationSegmentBody(config, segment, broadcaster, content, version) {
    return {
        extension_id: config.clientId,
        segment,
        broadcaster_id: (0, shared_utils_1.mapOptional)(broadcaster, common_1.extractUserId),
        content,
        version
    };
}
exports.createConfigurationSegmentBody = createConfigurationSegmentBody;
/** @internal */
function createChatMessageJwtData(broadcaster) {
    return { channel_id: (0, common_1.extractUserId)(broadcaster) };
}
exports.createChatMessageJwtData = createChatMessageJwtData;
/** @internal */
function createChatMessageBody(config, extensionVersion, text) {
    return {
        extension_id: config.clientId,
        extension_version: extensionVersion,
        text
    };
}
exports.createChatMessageBody = createChatMessageBody;
/** @internal */
function createPubSubGlobalMessageJwtData() {
    return { channel_id: 'all', pubsub_perms: { send: ['global'] } };
}
exports.createPubSubGlobalMessageJwtData = createPubSubGlobalMessageJwtData;
/** @internal */
function createPubSubGlobalMessageBody(message) {
    return {
        is_global_broadcast: true,
        target: ['global'],
        message
    };
}
exports.createPubSubGlobalMessageBody = createPubSubGlobalMessageBody;
/** @internal */
function createPubSubMessageJwtData(broadcaster, targets) {
    return { channel_id: (0, common_1.extractUserId)(broadcaster), pubsub_perms: { send: targets } };
}
exports.createPubSubMessageJwtData = createPubSubMessageJwtData;
/** @internal */
function createPubSubMessageBody(targets, broadcaster, message) {
    return {
        target: targets,
        broadcaster_id: (0, common_1.extractUserId)(broadcaster),
        message
    };
}
exports.createPubSubMessageBody = createPubSubMessageBody;
