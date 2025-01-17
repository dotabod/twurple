"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataObject = exports.getRawData = exports.rawDataSymbol = void 0;
const klona_1 = require("klona");
/** @private */
exports.rawDataSymbol = Symbol('twurpleRawData');
/**
 * Gets the raw data of a data object.
 *
 * @param obj The data object to get the raw data of.
 */
function getRawData(obj) {
    return (0, klona_1.klona)(obj[exports.rawDataSymbol]);
}
exports.getRawData = getRawData;
/** @private */
class DataObject {
    /** @private */
    constructor(data) {
        this[exports.rawDataSymbol] = data;
    }
}
exports.DataObject = DataObject;
