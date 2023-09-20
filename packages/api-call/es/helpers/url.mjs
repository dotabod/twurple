/** @internal */
export function getTwitchApiUrl(url, type) {
    switch (type) {
        case 'helix':
            return `https://api.twitch.tv/helix/${url.replace(/^\//, '')}`;
        case 'auth':
            return `https://id.twitch.tv/oauth2/${url.replace(/^\//, '')}`;
        case 'custom':
            return url;
        default:
            return url; // wat
    }
}
