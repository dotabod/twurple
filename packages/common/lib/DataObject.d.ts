/** @private */
export declare const rawDataSymbol: unique symbol;
/**
 * Gets the raw data of a data object.
 *
 * @param obj The data object to get the raw data of.
 */
export declare function getRawData<DataType>(obj: DataObject<DataType>): DataType;
/** @private */
export declare abstract class DataObject<DataType> {
    /** @private */ readonly [rawDataSymbol]: DataType;
    /** @private */
    constructor(data: DataType);
}
//# sourceMappingURL=DataObject.d.ts.map