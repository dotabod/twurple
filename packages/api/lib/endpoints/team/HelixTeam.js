"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixTeam = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@d-fischer/shared-utils");
const common_1 = require("@twurple/common");
/**
 * A Stream Team.
 */
let HelixTeam = class HelixTeam extends common_1.DataObject {
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the team.
     */
    get id() {
        return this[common_1.rawDataSymbol].id;
    }
    /**
     * The name of the team.
     */
    get name() {
        return this[common_1.rawDataSymbol].team_name;
    }
    /**
     * The display name of the team.
     */
    get displayName() {
        return this[common_1.rawDataSymbol].team_display_name;
    }
    /**
     * The URL of the background image of the team.
     */
    get backgroundImageUrl() {
        return this[common_1.rawDataSymbol].background_image_url;
    }
    /**
     * The URL of the banner of the team.
     */
    get bannerUrl() {
        return this[common_1.rawDataSymbol].banner;
    }
    /**
     * The date when the team was created.
     */
    get creationDate() {
        return new Date(this[common_1.rawDataSymbol].created_at);
    }
    /**
     * The date when the team was last updated.
     */
    get updateDate() {
        return new Date(this[common_1.rawDataSymbol].updated_at);
    }
    /**
     * The info of the team.
     *
     * May contain HTML tags.
     */
    get info() {
        return this[common_1.rawDataSymbol].info;
    }
    /**
     * The URL of the thumbnail of the team's logo.
     */
    get logoThumbnailUrl() {
        return this[common_1.rawDataSymbol].thumbnail_url;
    }
    /**
     * Gets the relations to the members of the team.
     */
    async getUserRelations() {
        const teamWithUsers = await this._client.teams.getTeamById(this.id);
        return teamWithUsers.userRelations;
    }
};
tslib_1.__decorate([
    (0, shared_utils_1.Enumerable)(false)
], HelixTeam.prototype, "_client", void 0);
HelixTeam = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixTeam', 'id')
], HelixTeam);
exports.HelixTeam = HelixTeam;
