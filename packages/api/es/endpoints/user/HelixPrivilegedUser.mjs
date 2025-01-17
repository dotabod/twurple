import { __decorate } from "tslib";
import { rawDataSymbol, rtfm } from '@twurple/common';
import { HelixUser } from "./HelixUser.mjs";
/**
 * A user you have extended privilges for, i.e. yourself.
 *
 * @inheritDoc
 */
let HelixPrivilegedUser = class HelixPrivilegedUser extends HelixUser {
    /**
     * The email address of the user.
     */
    get email() {
        return this[rawDataSymbol].email;
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
HelixPrivilegedUser = __decorate([
    rtfm('api', 'HelixPrivilegedUser', 'id')
], HelixPrivilegedUser);
export { HelixPrivilegedUser };
