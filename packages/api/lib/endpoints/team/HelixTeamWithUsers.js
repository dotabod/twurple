"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixTeamWithUsers = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixUserRelation_1 = require("../../relations/HelixUserRelation");
const HelixTeam_1 = require("./HelixTeam");
/**
 * A Stream Team with its member relations.
 *
 * @inheritDoc
 */
let HelixTeamWithUsers = class HelixTeamWithUsers extends HelixTeam_1.HelixTeam {
    /**
     * The relations to the members of the team.
     */
    get userRelations() {
        return this[common_1.rawDataSymbol].users.map(data => new HelixUserRelation_1.HelixUserRelation(data, this._client));
    }
};
HelixTeamWithUsers = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixTeamWithUsers', 'id')
], HelixTeamWithUsers);
exports.HelixTeamWithUsers = HelixTeamWithUsers;
