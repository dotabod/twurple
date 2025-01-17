import { __decorate } from "tslib";
import { DataObject, rawDataSymbol } from "../DataObject.mjs";
import { rtfm } from "../rtfm.mjs";
/**
 * A Twitch Extension.
 */
let HelixExtension = class HelixExtension extends DataObject {
    /**
     * The name of the extension's author.
     */
    get authorName() {
        return this[rawDataSymbol].author_name;
    }
    /**
     * Whether bits are enabled for the extension.
     */
    get bitsEnabled() {
        return this[rawDataSymbol].bits_enabled;
    }
    /**
     * Whether the extension can be installed.
     */
    get installable() {
        return this[rawDataSymbol].can_install;
    }
    /**
     * The location of the extension's configuration.
     */
    get configurationLocation() {
        return this[rawDataSymbol].configuration_location;
    }
    /**
     * The extension's description.
     */
    get description() {
        return this[rawDataSymbol].description;
    }
    /**
     * The URL of the extension's terms of service.
     */
    get tosUrl() {
        return this[rawDataSymbol].eula_tos_url;
    }
    /**
     * Whether the extension has support for sending chat messages.
     */
    get hasChatSupport() {
        return this[rawDataSymbol].has_chat_support;
    }
    /**
     * The URL of the extension's default sized icon.
     */
    get iconUrl() {
        return this[rawDataSymbol].icon_url;
    }
    /**
     * Gets the URL of the extension's icon in the given size.
     *
     * @param size The size of the icon.
     */
    getIconUrl(size) {
        return this[rawDataSymbol].icon_urls[size];
    }
    /**
     * The extension's ID.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The extension's name.
     */
    get name() {
        return this[rawDataSymbol].name;
    }
    /**
     * The URL of the extension's privacy policy.
     */
    get privacyPolicyUrl() {
        return this[rawDataSymbol].privacy_policy_url;
    }
    /**
     * Whether the extension requests its users to share their identity with it.
     */
    get requestsIdentityLink() {
        return this[rawDataSymbol].request_identity_link;
    }
    /**
     * The URLs of the extension's screenshots.
     */
    get screenshotUrls() {
        return this[rawDataSymbol].screenshot_urls;
    }
    /**
     * The extension's activity state.
     */
    get state() {
        return this[rawDataSymbol].state;
    }
    /**
     * The extension's level of support for subscriptions.
     */
    get subscriptionsSupportLevel() {
        return this[rawDataSymbol].subscriptions_support_level;
    }
    /**
     * The extension's feature summary.
     */
    get summary() {
        return this[rawDataSymbol].summary;
    }
    /**
     * The extension's support email address.
     */
    get supportEmail() {
        return this[rawDataSymbol].support_email;
    }
    /**
     * The extension's version.
     */
    get version() {
        return this[rawDataSymbol].version;
    }
    /**
     * The extension's feature summary for viewers.
     */
    get viewerSummery() {
        return this[rawDataSymbol].viewer_summary;
    }
    /**
     * The extension's allowed configuration URLs.
     */
    get allowedConfigUrls() {
        return this[rawDataSymbol].allowlisted_config_urls;
    }
    /**
     * The extension's allowed panel URLs.
     */
    get allowedPanelUrls() {
        return this[rawDataSymbol].allowlisted_panel_urls;
    }
    /**
     * The URL shown when a viewer opens the extension on a mobile device.
     *
     * If the extension does not have a mobile view, this is null.
     */
    get mobileViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.mobile) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.panel) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The height of the extension panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelHeight() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.panel) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its panel view.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.panel) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a video overlay.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.video_overlay) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its overlay view.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.video_overlay) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a video component.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The aspect width of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectWidth() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_width) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The aspect height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectHeight() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_height) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The horizontal aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioX() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_ratio_x) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The vertical aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioY() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_ratio_y) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension's component view should automatically scale.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAutoScales() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.autoscale) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The base width of the extension's component view to use for scaling.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentScalePixels() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.scale_pixels) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The target height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentTargetHeight() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.target_height) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The size of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentSize() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether zooming is enabled for the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoom() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.zoom) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The zoom pixels of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoomPixels() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.zoom_pixels) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension's configuration page is shown.
     *
     * If the extension does not have a config view, this is null.
     */
    get configViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.config) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its config view.
     *
     * If the extension does not have a config view, this is null.
     */
    get configCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[rawDataSymbol].views.config) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
};
HelixExtension = __decorate([
    rtfm('api', 'HelixExtension', 'id')
], HelixExtension);
export { HelixExtension };
