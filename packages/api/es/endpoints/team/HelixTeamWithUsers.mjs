import { __decorate } from "tslib";
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixUserRelation } from "../../relations/HelixUserRelation.mjs";
import { HelixTeam } from "./HelixTeam.mjs";
/**
 * A Stream Team with its member relations.
 *
 * @inheritDoc
 */
let HelixTeamWithUsers = class HelixTeamWithUsers extends HelixTeam {
    /**
     * The relations to the members of the team.
     */
    get userRelations() {
        return this[rawDataSymbol].users.map(data => new HelixUserRelation(data, this._client));
    }
};
HelixTeamWithUsers = __decorate([
    rtfm('api', 'HelixTeamWithUsers', 'id')
], HelixTeamWithUsers);
export { HelixTeamWithUsers };
