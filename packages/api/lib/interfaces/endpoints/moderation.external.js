"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpdateShieldModeStatusBody = exports.createBanUserBody = exports.createAutoModSettingsBody = exports.createAutoModProcessBody = exports.createModeratorModifyQuery = exports.createModerationUserListQuery = void 0;
const common_1 = require("@twurple/common");
/** @internal */
function createModerationUserListQuery(channel, filter) {
    return {
        broadcaster_id: (0, common_1.extractUserId)(channel),
        user_id: filter === null || filter === void 0 ? void 0 : filter.userId,
    };
}
exports.createModerationUserListQuery = createModerationUserListQuery;
/** @internal */
function createModeratorModifyQuery(broadcaster, user) {
    return {
        broadcaster_id: (0, common_1.extractUserId)(broadcaster),
        user_id: (0, common_1.extractUserId)(user),
    };
}
exports.createModeratorModifyQuery = createModeratorModifyQuery;
/** @internal */
function createAutoModProcessBody(user, msgId, allow) {
    return {
        user_id: (0, common_1.extractUserId)(user),
        msg_id: msgId,
        action: allow ? 'ALLOW' : 'DENY',
    };
}
exports.createAutoModProcessBody = createAutoModProcessBody;
/** @internal */
function createAutoModSettingsBody(data) {
    return {
        overall_level: data.overallLevel,
        aggression: data.aggression,
        bullying: data.bullying,
        disability: data.disability,
        misogyny: data.misogyny,
        race_ethnicity_or_religion: data.raceEthnicityOrReligion,
        sex_based_terms: data.sexBasedTerms,
        sexuality_sex_or_gender: data.sexualitySexOrGender,
        swearing: data.swearing,
    };
}
exports.createAutoModSettingsBody = createAutoModSettingsBody;
/** @internal */
function createBanUserBody(data) {
    return {
        data: {
            duration: data.duration,
            reason: data.reason,
            user_id: (0, common_1.extractUserId)(data.user),
        },
    };
}
exports.createBanUserBody = createBanUserBody;
/** @internal */
function createUpdateShieldModeStatusBody(activate) {
    return {
        is_active: activate,
    };
}
exports.createUpdateShieldModeStatusBody = createUpdateShieldModeStatusBody;
