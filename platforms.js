/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.platforms
namespace("com.subnodal.subui.platforms", function(exports) {
    exports.osTypes = {
        OTHER: -1,
        SUBOS: 0,
        LINUX: 1,
        WINDOWS: 2,
        MACOS: 3,
        IOS: 4,
        CHROMIUMOS: 5,
        ANDROID: 6
    };

    exports.browserEngineTypes = {
        OTHER: -1,
        CHROMIUM: 0,
        GECKO: 1,
        WEBKIT: 2
    };

    exports.browserTypes = {
        OTHER: -1,
        ORBIT: 0,
        CHROMIUM: 1,
        FIREFOX: 2,
        SAFARI: 3,
        EDGE: 4,
        OPERA: 5
    };

    exports.getPlatform = function() {
        var platform = {
            os: exports.osTypes.OTHER,
            browserEngine: exports.browserEngineTypes.OTHER,
            browser: exports.browserTypes.OTHER
        };

        if (/\bsubOS\b/.test(navigator.userAgent)) {
            platform.os = exports.osTypes.SUBOS;
        } else if (/\bCrOS\b/.test(navigator.userAgent)) {
            platform.os = exports.osTypes.CHROMIUMOS;
        } else if (/\bLinux\b/.test(navigator.platform)) {
            platform.os = exports.osTypes.LINUX;
        } else if (/\b(?:Windows|Win32|Win64)\b/.test(navigator.platform)) {
            platform.os = exports.osTypes.WINDOWS;
        } else if (/\b(?:Macintosh|MacIntel|MacPPC|Mac68K)\b/.test(navigator.platform)) {
            platform.os = exports.osTypes.MACOS;
        } else if (/\b(?:iPhone|iPad|iPod)\b/.test(navigator.platform)) {
            platform.os = exports.osTypes.IOS;
        } else if (/\bAndroid\b/.test(navigator.userAgent)) {
            platform.os = exports.osTypes.ANDROID;
        }

        if (/\bChrome\b/.test(navigator.userAgent)) {
            platform.browserEngine = exports.browserEngineTypes.CHROMIUM;
        } else if (/\bAppleWebKit\b/.test(navigator.userAgent)) {
            platform.browserEngine = exports.browserEngineTypes.WEBKIT;
        } else if (/\bMozilla\b/.test(navigator.userAgent)) {
            platform.browserEngine = exports.browserEngineTypes.GECKO;
        }

        if (/\bOrbit\b/.test(navigator.userAgent)) {
            platform.browser = exports.browserTypes.ORBIT;
        } else if (/\bEdg\//.test(navigator.userAgent)) {
            platform.browser = exports.browserTypes.EDGE;
        } else if (/\b(?:Opera|OPR)\b/.test(navigator.userAgent)) {
            platform.browser = exports.browserTypes.OPERA;
        } else if (/\bChrome\b/.test(navigator.userAgent)) {
            platform.browser = exports.browserTypes.CHROMIUM;
        } else if (/\bSafari\b/.test(navigator.userAgent)) {
            platform.browser = exports.browserTypes.SAFARI;
        } else if (/\bMozilla\b/.test(navigator.userAgent)) {
            platform.browser = exports.browserTypes.FIREFOX;
        }

        return platform;
    };
});