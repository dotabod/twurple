"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSubChannelPollChoice = exports.EventSubChannelPollBeginChoice = exports.EventSubChannelHypeTrainContribution = exports.EventSubChannelCharityAmount = exports.EventSubUserUpdateEvent = exports.EventSubUserAuthorizationRevokeEvent = exports.EventSubUserAuthorizationGrantEvent = exports.EventSubStreamOnlineEvent = exports.EventSubStreamOfflineEvent = exports.EventSubExtensionBitsTransactionCreateEvent = exports.EventSubDropEntitlementGrantEvent = exports.EventSubChannelUpdateEvent = exports.EventSubChannelUnbanEvent = exports.EventSubChannelSubscriptionMessageEvent = exports.EventSubChannelSubscriptionGiftEvent = exports.EventSubChannelSubscriptionEvent = exports.EventSubChannelSubscriptionEndEvent = exports.EventSubChannelShoutoutReceiveEvent = exports.EventSubChannelShoutoutCreateEvent = exports.EventSubChannelShieldModeEndEvent = exports.EventSubChannelShieldModeBeginEvent = exports.EventSubChannelRewardEvent = exports.EventSubChannelRedemptionUpdateEvent = exports.EventSubChannelRedemptionAddEvent = exports.EventSubChannelRaidEvent = exports.EventSubChannelPredictionProgressEvent = exports.EventSubChannelPredictionLockEvent = exports.EventSubChannelPredictionEndEvent = exports.EventSubChannelPredictionBeginEvent = exports.EventSubChannelPollProgressEvent = exports.EventSubChannelPollEndEvent = exports.EventSubChannelPollBeginEvent = exports.EventSubChannelModeratorEvent = exports.EventSubChannelHypeTrainProgressEvent = exports.EventSubChannelHypeTrainEndEvent = exports.EventSubChannelHypeTrainBeginEvent = exports.EventSubChannelGoalProgressEvent = exports.EventSubChannelGoalEndEvent = exports.EventSubChannelGoalBeginEvent = exports.EventSubChannelFollowEvent = exports.EventSubChannelCheerEvent = exports.EventSubChannelChatMessageDeleteEvent = exports.EventSubChannelChatClearUserMessagesEvent = exports.EventSubChannelChatClearEvent = exports.EventSubChannelCharityDonationEvent = exports.EventSubChannelCharityCampaignStopEvent = exports.EventSubChannelCharityCampaignStartEvent = exports.EventSubChannelCharityCampaignProgressEvent = exports.EventSubChannelBanEvent = exports.EventSubBase = void 0;
exports.EventSubSubscription = exports.EventSubChannelPredictionPredictor = exports.EventSubChannelPredictionOutcome = exports.EventSubChannelPredictionBeginOutcome = void 0;
var EventSubBase_1 = require("./EventSubBase");
Object.defineProperty(exports, "EventSubBase", { enumerable: true, get: function () { return EventSubBase_1.EventSubBase; } });
var EventSubChannelBanEvent_1 = require("./events/EventSubChannelBanEvent");
Object.defineProperty(exports, "EventSubChannelBanEvent", { enumerable: true, get: function () { return EventSubChannelBanEvent_1.EventSubChannelBanEvent; } });
var EventSubChannelCharityCampaignProgressEvent_1 = require("./events/EventSubChannelCharityCampaignProgressEvent");
Object.defineProperty(exports, "EventSubChannelCharityCampaignProgressEvent", { enumerable: true, get: function () { return EventSubChannelCharityCampaignProgressEvent_1.EventSubChannelCharityCampaignProgressEvent; } });
var EventSubChannelCharityCampaignStartEvent_1 = require("./events/EventSubChannelCharityCampaignStartEvent");
Object.defineProperty(exports, "EventSubChannelCharityCampaignStartEvent", { enumerable: true, get: function () { return EventSubChannelCharityCampaignStartEvent_1.EventSubChannelCharityCampaignStartEvent; } });
var EventSubChannelCharityCampaignStopEvent_1 = require("./events/EventSubChannelCharityCampaignStopEvent");
Object.defineProperty(exports, "EventSubChannelCharityCampaignStopEvent", { enumerable: true, get: function () { return EventSubChannelCharityCampaignStopEvent_1.EventSubChannelCharityCampaignStopEvent; } });
var EventSubChannelCharityDonationEvent_1 = require("./events/EventSubChannelCharityDonationEvent");
Object.defineProperty(exports, "EventSubChannelCharityDonationEvent", { enumerable: true, get: function () { return EventSubChannelCharityDonationEvent_1.EventSubChannelCharityDonationEvent; } });
var EventSubChannelChatClearEvent_1 = require("./events/EventSubChannelChatClearEvent");
Object.defineProperty(exports, "EventSubChannelChatClearEvent", { enumerable: true, get: function () { return EventSubChannelChatClearEvent_1.EventSubChannelChatClearEvent; } });
var EventSubChannelChatClearUserMessagesEvent_1 = require("./events/EventSubChannelChatClearUserMessagesEvent");
Object.defineProperty(exports, "EventSubChannelChatClearUserMessagesEvent", { enumerable: true, get: function () { return EventSubChannelChatClearUserMessagesEvent_1.EventSubChannelChatClearUserMessagesEvent; } });
var EventSubChannelChatMessageDeleteEvent_1 = require("./events/EventSubChannelChatMessageDeleteEvent");
Object.defineProperty(exports, "EventSubChannelChatMessageDeleteEvent", { enumerable: true, get: function () { return EventSubChannelChatMessageDeleteEvent_1.EventSubChannelChatMessageDeleteEvent; } });
var EventSubChannelCheerEvent_1 = require("./events/EventSubChannelCheerEvent");
Object.defineProperty(exports, "EventSubChannelCheerEvent", { enumerable: true, get: function () { return EventSubChannelCheerEvent_1.EventSubChannelCheerEvent; } });
var EventSubChannelFollowEvent_1 = require("./events/EventSubChannelFollowEvent");
Object.defineProperty(exports, "EventSubChannelFollowEvent", { enumerable: true, get: function () { return EventSubChannelFollowEvent_1.EventSubChannelFollowEvent; } });
var EventSubChannelGoalBeginEvent_1 = require("./events/EventSubChannelGoalBeginEvent");
Object.defineProperty(exports, "EventSubChannelGoalBeginEvent", { enumerable: true, get: function () { return EventSubChannelGoalBeginEvent_1.EventSubChannelGoalBeginEvent; } });
var EventSubChannelGoalEndEvent_1 = require("./events/EventSubChannelGoalEndEvent");
Object.defineProperty(exports, "EventSubChannelGoalEndEvent", { enumerable: true, get: function () { return EventSubChannelGoalEndEvent_1.EventSubChannelGoalEndEvent; } });
var EventSubChannelGoalProgressEvent_1 = require("./events/EventSubChannelGoalProgressEvent");
Object.defineProperty(exports, "EventSubChannelGoalProgressEvent", { enumerable: true, get: function () { return EventSubChannelGoalProgressEvent_1.EventSubChannelGoalProgressEvent; } });
var EventSubChannelHypeTrainBeginEvent_1 = require("./events/EventSubChannelHypeTrainBeginEvent");
Object.defineProperty(exports, "EventSubChannelHypeTrainBeginEvent", { enumerable: true, get: function () { return EventSubChannelHypeTrainBeginEvent_1.EventSubChannelHypeTrainBeginEvent; } });
var EventSubChannelHypeTrainEndEvent_1 = require("./events/EventSubChannelHypeTrainEndEvent");
Object.defineProperty(exports, "EventSubChannelHypeTrainEndEvent", { enumerable: true, get: function () { return EventSubChannelHypeTrainEndEvent_1.EventSubChannelHypeTrainEndEvent; } });
var EventSubChannelHypeTrainProgressEvent_1 = require("./events/EventSubChannelHypeTrainProgressEvent");
Object.defineProperty(exports, "EventSubChannelHypeTrainProgressEvent", { enumerable: true, get: function () { return EventSubChannelHypeTrainProgressEvent_1.EventSubChannelHypeTrainProgressEvent; } });
var EventSubChannelModeratorEvent_1 = require("./events/EventSubChannelModeratorEvent");
Object.defineProperty(exports, "EventSubChannelModeratorEvent", { enumerable: true, get: function () { return EventSubChannelModeratorEvent_1.EventSubChannelModeratorEvent; } });
var EventSubChannelPollBeginEvent_1 = require("./events/EventSubChannelPollBeginEvent");
Object.defineProperty(exports, "EventSubChannelPollBeginEvent", { enumerable: true, get: function () { return EventSubChannelPollBeginEvent_1.EventSubChannelPollBeginEvent; } });
var EventSubChannelPollEndEvent_1 = require("./events/EventSubChannelPollEndEvent");
Object.defineProperty(exports, "EventSubChannelPollEndEvent", { enumerable: true, get: function () { return EventSubChannelPollEndEvent_1.EventSubChannelPollEndEvent; } });
var EventSubChannelPollProgressEvent_1 = require("./events/EventSubChannelPollProgressEvent");
Object.defineProperty(exports, "EventSubChannelPollProgressEvent", { enumerable: true, get: function () { return EventSubChannelPollProgressEvent_1.EventSubChannelPollProgressEvent; } });
var EventSubChannelPredictionBeginEvent_1 = require("./events/EventSubChannelPredictionBeginEvent");
Object.defineProperty(exports, "EventSubChannelPredictionBeginEvent", { enumerable: true, get: function () { return EventSubChannelPredictionBeginEvent_1.EventSubChannelPredictionBeginEvent; } });
var EventSubChannelPredictionEndEvent_1 = require("./events/EventSubChannelPredictionEndEvent");
Object.defineProperty(exports, "EventSubChannelPredictionEndEvent", { enumerable: true, get: function () { return EventSubChannelPredictionEndEvent_1.EventSubChannelPredictionEndEvent; } });
var EventSubChannelPredictionLockEvent_1 = require("./events/EventSubChannelPredictionLockEvent");
Object.defineProperty(exports, "EventSubChannelPredictionLockEvent", { enumerable: true, get: function () { return EventSubChannelPredictionLockEvent_1.EventSubChannelPredictionLockEvent; } });
var EventSubChannelPredictionProgressEvent_1 = require("./events/EventSubChannelPredictionProgressEvent");
Object.defineProperty(exports, "EventSubChannelPredictionProgressEvent", { enumerable: true, get: function () { return EventSubChannelPredictionProgressEvent_1.EventSubChannelPredictionProgressEvent; } });
var EventSubChannelRaidEvent_1 = require("./events/EventSubChannelRaidEvent");
Object.defineProperty(exports, "EventSubChannelRaidEvent", { enumerable: true, get: function () { return EventSubChannelRaidEvent_1.EventSubChannelRaidEvent; } });
var EventSubChannelRedemptionAddEvent_1 = require("./events/EventSubChannelRedemptionAddEvent");
Object.defineProperty(exports, "EventSubChannelRedemptionAddEvent", { enumerable: true, get: function () { return EventSubChannelRedemptionAddEvent_1.EventSubChannelRedemptionAddEvent; } });
var EventSubChannelRedemptionUpdateEvent_1 = require("./events/EventSubChannelRedemptionUpdateEvent");
Object.defineProperty(exports, "EventSubChannelRedemptionUpdateEvent", { enumerable: true, get: function () { return EventSubChannelRedemptionUpdateEvent_1.EventSubChannelRedemptionUpdateEvent; } });
var EventSubChannelRewardEvent_1 = require("./events/EventSubChannelRewardEvent");
Object.defineProperty(exports, "EventSubChannelRewardEvent", { enumerable: true, get: function () { return EventSubChannelRewardEvent_1.EventSubChannelRewardEvent; } });
var EventSubChannelShieldModeBeginEvent_1 = require("./events/EventSubChannelShieldModeBeginEvent");
Object.defineProperty(exports, "EventSubChannelShieldModeBeginEvent", { enumerable: true, get: function () { return EventSubChannelShieldModeBeginEvent_1.EventSubChannelShieldModeBeginEvent; } });
var EventSubChannelShieldModeEndEvent_1 = require("./events/EventSubChannelShieldModeEndEvent");
Object.defineProperty(exports, "EventSubChannelShieldModeEndEvent", { enumerable: true, get: function () { return EventSubChannelShieldModeEndEvent_1.EventSubChannelShieldModeEndEvent; } });
var EventSubChannelShoutoutCreateEvent_1 = require("./events/EventSubChannelShoutoutCreateEvent");
Object.defineProperty(exports, "EventSubChannelShoutoutCreateEvent", { enumerable: true, get: function () { return EventSubChannelShoutoutCreateEvent_1.EventSubChannelShoutoutCreateEvent; } });
var EventSubChannelShoutoutReceiveEvent_1 = require("./events/EventSubChannelShoutoutReceiveEvent");
Object.defineProperty(exports, "EventSubChannelShoutoutReceiveEvent", { enumerable: true, get: function () { return EventSubChannelShoutoutReceiveEvent_1.EventSubChannelShoutoutReceiveEvent; } });
var EventSubChannelSubscriptionEndEvent_1 = require("./events/EventSubChannelSubscriptionEndEvent");
Object.defineProperty(exports, "EventSubChannelSubscriptionEndEvent", { enumerable: true, get: function () { return EventSubChannelSubscriptionEndEvent_1.EventSubChannelSubscriptionEndEvent; } });
var EventSubChannelSubscriptionEvent_1 = require("./events/EventSubChannelSubscriptionEvent");
Object.defineProperty(exports, "EventSubChannelSubscriptionEvent", { enumerable: true, get: function () { return EventSubChannelSubscriptionEvent_1.EventSubChannelSubscriptionEvent; } });
var EventSubChannelSubscriptionGiftEvent_1 = require("./events/EventSubChannelSubscriptionGiftEvent");
Object.defineProperty(exports, "EventSubChannelSubscriptionGiftEvent", { enumerable: true, get: function () { return EventSubChannelSubscriptionGiftEvent_1.EventSubChannelSubscriptionGiftEvent; } });
var EventSubChannelSubscriptionMessageEvent_1 = require("./events/EventSubChannelSubscriptionMessageEvent");
Object.defineProperty(exports, "EventSubChannelSubscriptionMessageEvent", { enumerable: true, get: function () { return EventSubChannelSubscriptionMessageEvent_1.EventSubChannelSubscriptionMessageEvent; } });
var EventSubChannelUnbanEvent_1 = require("./events/EventSubChannelUnbanEvent");
Object.defineProperty(exports, "EventSubChannelUnbanEvent", { enumerable: true, get: function () { return EventSubChannelUnbanEvent_1.EventSubChannelUnbanEvent; } });
var EventSubChannelUpdateEvent_1 = require("./events/EventSubChannelUpdateEvent");
Object.defineProperty(exports, "EventSubChannelUpdateEvent", { enumerable: true, get: function () { return EventSubChannelUpdateEvent_1.EventSubChannelUpdateEvent; } });
var EventSubDropEntitlementGrantEvent_1 = require("./events/EventSubDropEntitlementGrantEvent");
Object.defineProperty(exports, "EventSubDropEntitlementGrantEvent", { enumerable: true, get: function () { return EventSubDropEntitlementGrantEvent_1.EventSubDropEntitlementGrantEvent; } });
var EventSubExtensionBitsTransactionCreateEvent_1 = require("./events/EventSubExtensionBitsTransactionCreateEvent");
Object.defineProperty(exports, "EventSubExtensionBitsTransactionCreateEvent", { enumerable: true, get: function () { return EventSubExtensionBitsTransactionCreateEvent_1.EventSubExtensionBitsTransactionCreateEvent; } });
var EventSubStreamOfflineEvent_1 = require("./events/EventSubStreamOfflineEvent");
Object.defineProperty(exports, "EventSubStreamOfflineEvent", { enumerable: true, get: function () { return EventSubStreamOfflineEvent_1.EventSubStreamOfflineEvent; } });
var EventSubStreamOnlineEvent_1 = require("./events/EventSubStreamOnlineEvent");
Object.defineProperty(exports, "EventSubStreamOnlineEvent", { enumerable: true, get: function () { return EventSubStreamOnlineEvent_1.EventSubStreamOnlineEvent; } });
var EventSubUserAuthorizationGrantEvent_1 = require("./events/EventSubUserAuthorizationGrantEvent");
Object.defineProperty(exports, "EventSubUserAuthorizationGrantEvent", { enumerable: true, get: function () { return EventSubUserAuthorizationGrantEvent_1.EventSubUserAuthorizationGrantEvent; } });
var EventSubUserAuthorizationRevokeEvent_1 = require("./events/EventSubUserAuthorizationRevokeEvent");
Object.defineProperty(exports, "EventSubUserAuthorizationRevokeEvent", { enumerable: true, get: function () { return EventSubUserAuthorizationRevokeEvent_1.EventSubUserAuthorizationRevokeEvent; } });
var EventSubUserUpdateEvent_1 = require("./events/EventSubUserUpdateEvent");
Object.defineProperty(exports, "EventSubUserUpdateEvent", { enumerable: true, get: function () { return EventSubUserUpdateEvent_1.EventSubUserUpdateEvent; } });
var EventSubChannelCharityAmount_1 = require("./events/common/EventSubChannelCharityAmount");
Object.defineProperty(exports, "EventSubChannelCharityAmount", { enumerable: true, get: function () { return EventSubChannelCharityAmount_1.EventSubChannelCharityAmount; } });
var EventSubChannelHypeTrainContribution_1 = require("./events/common/EventSubChannelHypeTrainContribution");
Object.defineProperty(exports, "EventSubChannelHypeTrainContribution", { enumerable: true, get: function () { return EventSubChannelHypeTrainContribution_1.EventSubChannelHypeTrainContribution; } });
var EventSubChannelPollBeginChoice_1 = require("./events/common/EventSubChannelPollBeginChoice");
Object.defineProperty(exports, "EventSubChannelPollBeginChoice", { enumerable: true, get: function () { return EventSubChannelPollBeginChoice_1.EventSubChannelPollBeginChoice; } });
var EventSubChannelPollChoice_1 = require("./events/common/EventSubChannelPollChoice");
Object.defineProperty(exports, "EventSubChannelPollChoice", { enumerable: true, get: function () { return EventSubChannelPollChoice_1.EventSubChannelPollChoice; } });
var EventSubChannelPredictionBeginOutcome_1 = require("./events/common/EventSubChannelPredictionBeginOutcome");
Object.defineProperty(exports, "EventSubChannelPredictionBeginOutcome", { enumerable: true, get: function () { return EventSubChannelPredictionBeginOutcome_1.EventSubChannelPredictionBeginOutcome; } });
var EventSubChannelPredictionOutcome_1 = require("./events/common/EventSubChannelPredictionOutcome");
Object.defineProperty(exports, "EventSubChannelPredictionOutcome", { enumerable: true, get: function () { return EventSubChannelPredictionOutcome_1.EventSubChannelPredictionOutcome; } });
var EventSubChannelPredictionPredictor_1 = require("./events/common/EventSubChannelPredictionPredictor");
Object.defineProperty(exports, "EventSubChannelPredictionPredictor", { enumerable: true, get: function () { return EventSubChannelPredictionPredictor_1.EventSubChannelPredictionPredictor; } });
var EventSubSubscription_1 = require("./subscriptions/EventSubSubscription");
Object.defineProperty(exports, "EventSubSubscription", { enumerable: true, get: function () { return EventSubSubscription_1.EventSubSubscription; } });
