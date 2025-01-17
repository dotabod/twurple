import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A Stream Team.
 */
let HelixTeam = class HelixTeam extends DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the team.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The name of the team.
     */
    get name() {
        return this[rawDataSymbol].team_name;
    }
    /**
     * The display name of the team.
     */
    get displayName() {
        return this[rawDataSymbol].team_display_name;
    }
    /**
     * The URL of the background image of the team.
     */
    get backgroundImageUrl() {
        return this[rawDataSymbol].background_image_url;
    }
    /**
     * The URL of the banner of the team.
     */
    get bannerUrl() {
        return this[rawDataSymbol].banner;
    }
    /**
     * The date when the team was created.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The date when the team was last updated.
     */
    get updateDate() {
        return new Date(this[rawDataSymbol].updated_at);
    }
    /**
     * The info of the team.
     *
     * May contain HTML tags.
     */
    get info() {
        return this[rawDataSymbol].info;
    }
    /**
     * The URL of the thumbnail of the team's logo.
     */
    get logoThumbnailUrl() {
        return this[rawDataSymbol].thumbnail_url;
    }
    /**
     * Gets the relations to the members of the team.
     */
    async getUserRelations() {
        const teamWithUsers = await this._client.teams.getTeamById(this.id);
        return teamWithUsers.userRelations;
    }
};
__decorate([
    Enumerable(false)
], HelixTeam.prototype, "_client", void 0);
HelixTeam = __decorate([
    rtfm('api', 'HelixTeam', 'id')
], HelixTeam);
export { HelixTeam };
