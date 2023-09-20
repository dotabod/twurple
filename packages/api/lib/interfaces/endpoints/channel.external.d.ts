/** @private */
export interface HelixChannelData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    broadcaster_language: string;
    game_id: string;
    game_name: string;
    title: string;
    delay: number;
    tags: string[];
}
/** @private */
export interface HelixChannelEditorData {
    user_id: string;
    user_name: string;
    created_at: string;
}
/** @private */
export interface HelixChannelReferenceData {
    broadcaster_id: string;
    broadcaster_name: string;
    game_id: string;
    game_name: string;
    title: string;
}
/** @private */
export interface HelixFollowedChannelData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    followed_at: string;
}
/** @private */
export interface HelixChannelFollowerData {
    user_id: string;
    user_login: string;
    user_name: string;
    followed_at: string;
}
//# sourceMappingURL=channel.external.d.ts.map