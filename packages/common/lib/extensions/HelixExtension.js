"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelixExtension = void 0;
const tslib_1 = require("tslib");
const DataObject_1 = require("../DataObject");
const rtfm_1 = require("../rtfm");
/**
 * A Twitch Extension.
 */
let HelixExtension = class HelixExtension extends DataObject_1.DataObject {
    /**
     * The name of the extension's author.
     */
    get authorName() {
        return this[DataObject_1.rawDataSymbol].author_name;
    }
    /**
     * Whether bits are enabled for the extension.
     */
    get bitsEnabled() {
        return this[DataObject_1.rawDataSymbol].bits_enabled;
    }
    /**
     * Whether the extension can be installed.
     */
    get installable() {
        return this[DataObject_1.rawDataSymbol].can_install;
    }
    /**
     * The location of the extension's configuration.
     */
    get configurationLocation() {
        return this[DataObject_1.rawDataSymbol].configuration_location;
    }
    /**
     * The extension's description.
     */
    get description() {
        return this[DataObject_1.rawDataSymbol].description;
    }
    /**
     * The URL of the extension's terms of service.
     */
    get tosUrl() {
        return this[DataObject_1.rawDataSymbol].eula_tos_url;
    }
    /**
     * Whether the extension has support for sending chat messages.
     */
    get hasChatSupport() {
        return this[DataObject_1.rawDataSymbol].has_chat_support;
    }
    /**
     * The URL of the extension's default sized icon.
     */
    get iconUrl() {
        return this[DataObject_1.rawDataSymbol].icon_url;
    }
    /**
     * Gets the URL of the extension's icon in the given size.
     *
     * @param size The size of the icon.
     */
    getIconUrl(size) {
        return this[DataObject_1.rawDataSymbol].icon_urls[size];
    }
    /**
     * The extension's ID.
     */
    get id() {
        return this[DataObject_1.rawDataSymbol].id;
    }
    /**
     * The extension's name.
     */
    get name() {
        return this[DataObject_1.rawDataSymbol].name;
    }
    /**
     * The URL of the extension's privacy policy.
     */
    get privacyPolicyUrl() {
        return this[DataObject_1.rawDataSymbol].privacy_policy_url;
    }
    /**
     * Whether the extension requests its users to share their identity with it.
     */
    get requestsIdentityLink() {
        return this[DataObject_1.rawDataSymbol].request_identity_link;
    }
    /**
     * The URLs of the extension's screenshots.
     */
    get screenshotUrls() {
        return this[DataObject_1.rawDataSymbol].screenshot_urls;
    }
    /**
     * The extension's activity state.
     */
    get state() {
        return this[DataObject_1.rawDataSymbol].state;
    }
    /**
     * The extension's level of support for subscriptions.
     */
    get subscriptionsSupportLevel() {
        return this[DataObject_1.rawDataSymbol].subscriptions_support_level;
    }
    /**
     * The extension's feature summary.
     */
    get summary() {
        return this[DataObject_1.rawDataSymbol].summary;
    }
    /**
     * The extension's support email address.
     */
    get supportEmail() {
        return this[DataObject_1.rawDataSymbol].support_email;
    }
    /**
     * The extension's version.
     */
    get version() {
        return this[DataObject_1.rawDataSymbol].version;
    }
    /**
     * The extension's feature summary for viewers.
     */
    get viewerSummery() {
        return this[DataObject_1.rawDataSymbol].viewer_summary;
    }
    /**
     * The extension's allowed configuration URLs.
     */
    get allowedConfigUrls() {
        return this[DataObject_1.rawDataSymbol].allowlisted_config_urls;
    }
    /**
     * The extension's allowed panel URLs.
     */
    get allowedPanelUrls() {
        return this[DataObject_1.rawDataSymbol].allowlisted_panel_urls;
    }
    /**
     * The URL shown when a viewer opens the extension on a mobile device.
     *
     * If the extension does not have a mobile view, this is null.
     */
    get mobileViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.mobile) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.panel) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The height of the extension panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelHeight() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.panel) === null || _a === void 0 ? void 0 : _a.height) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its panel view.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.panel) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a video overlay.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.video_overlay) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its overlay view.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.video_overlay) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a video component.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The aspect width of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectWidth() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_width) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The aspect height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectHeight() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_height) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The horizontal aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioX() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_ratio_x) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The vertical aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioY() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.aspect_ratio_y) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension's component view should automatically scale.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAutoScales() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.autoscale) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The base width of the extension's component view to use for scaling.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentScalePixels() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.scale_pixels) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The target height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentTargetHeight() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.target_height) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The size of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentSize() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether zooming is enabled for the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoom() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.zoom) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The zoom pixels of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoomPixels() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.zoom_pixels) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.component) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * The URL shown to the viewer when the extension's configuration page is shown.
     *
     * If the extension does not have a config view, this is null.
     */
    get configViewerUrl() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.config) === null || _a === void 0 ? void 0 : _a.viewer_url) !== null && _b !== void 0 ? _b : null;
    }
    /**
     * Whether the extension can link to external content from its config view.
     *
     * If the extension does not have a config view, this is null.
     */
    get configCanLinkExternalContent() {
        var _a, _b;
        return (_b = (_a = this[DataObject_1.rawDataSymbol].views.config) === null || _a === void 0 ? void 0 : _a.can_link_external_content) !== null && _b !== void 0 ? _b : null;
    }
};
HelixExtension = tslib_1.__decorate([
    (0, rtfm_1.rtfm)('api', 'HelixExtension', 'id')
], HelixExtension);
exports.HelixExtension = HelixExtension;
