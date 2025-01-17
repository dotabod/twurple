"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixPrivilegedUser = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@twurple/common");
const HelixUser_1 = require("./HelixUser");
/**
 * A user you have extended privilges for, i.e. yourself.
 *
 * @inheritDoc
 */
let HelixPrivilegedUser = class HelixPrivilegedUser extends HelixUser_1.HelixUser {
    /**
     * The email address of the user.
     */
    get email() {
        return this[common_1.rawDataSymbol].email;
    }
    /**
     * Changes the description of the user.
     *
     * @param description The new description.
     */
    async setDescription(description) {
        return await this._client.users.updateAuthenticatedUser(this, { description });
    }
};
HelixPrivilegedUser = tslib_1.__decorate([
    (0, common_1.rtfm)('api', 'HelixPrivilegedUser', 'id')
], HelixPrivilegedUser);
exports.HelixPrivilegedUser = HelixPrivilegedUser;
