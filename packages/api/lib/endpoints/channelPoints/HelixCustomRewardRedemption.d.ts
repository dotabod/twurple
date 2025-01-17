import { DataObject } from '@twurple/common';
import { type HelixCustomRewardRedemptionData, type HelixCustomRewardRedemptionTargetStatus } from '../../interfaces/endpoints/channelPoints.external';
import type { HelixUser } from '../user/HelixUser';
import type { HelixCustomReward } from './HelixCustomReward';
/**
 * A redemption of a custom Channel Points reward.
 */
export declare class HelixCustomRewardRedemption extends DataObject<HelixCustomRewardRedemptionData> {
    /**
     * The ID of the redemption.
     */
    get id(): string;
    /**
     * The ID of the broadcaster where the reward was redeemed.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster where the reward was redeemed.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster where the reward was redeemed.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster where the reward was redeemed.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The ID of the user that redeemed the reward.
     */
    get userId(): string;
    /**
     * The name of the user that redeemed the reward.
     */
    get userName(): string;
    /**
     * The display name of the user that redeemed the reward.
     */
    get userDisplayName(): string;
    /**
     * Gets more information about the user that redeemed the reward.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The text the user wrote when redeeming the reward.
     */
    get userInput(): string;
    /**
     * Whether the redemption was fulfilled.
     */
    get isFulfilled(): boolean;
    /**
     * Whether the redemption was canceled.
     */
    get isCanceled(): boolean;
    /**
     * The date and time when the reward was redeemed.
     */
    get redemptionDate(): Date;
    /**
     * The ID of the reward that was redeemed.
     */
    get rewardId(): string;
    /**
     * The title of the reward that was redeemed.
     */
    get rewardTitle(): string;
    /**
     * The prompt of the reward that was redeemed.
     */
    get rewardPrompt(): string;
    /**
     * The cost of the reward that was redeemed.
     */
    get rewardCost(): number;
    /**
     * Gets more information about the reward that was redeemed.
     */
    getReward(): Promise<HelixCustomReward>;
    /**
     * Updates the redemption's status.
     *
     * @param newStatus The status the redemption should have.
     */
    updateStatus(newStatus: HelixCustomRewardRedemptionTargetStatus): Promise<HelixCustomRewardRedemption>;
}
//# sourceMappingURL=HelixCustomRewardRedemption.d.ts.map