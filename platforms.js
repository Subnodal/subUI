/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.platforms
namespace("com.subnodal.subui.platforms", function(exports) {
    /*
        @name osTypes
        @type const <{*}>
        Enum for types of operating systems.
    */
    /*
        @name osTypes.OTHER
        @type const <*>
        An unknown operating system.
    */
    /*
        @name osTypes.SUBOS
        @type const <*>
        The Subnodal subOS operating system.
    */
    /*
        @name osTypes.LINUX
        @type const <*>
        A generic GNU/Linux distribution.
    */
    /*
        @name osTypes.WINDOWS
        @type const <*>
        The Microsoft Windows operating system.
    */
    /*
        @name osTypes.MACOS
        @type const <*>
        The Apple macOS operating system.
    */
    /*
        @name osTypes.IOS
        @type const <*>
        The Apple iOS or Apple iPadOS operating systems.
    */
    /*
        @name osTypes.CHROMEOS
        @type const <*>
        The Google Chrome OS operating system.
    */
    /*
        @name osTypes.ANDROID
        @type const <*>
        A generic flavour of the Android operating system.
    */
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

    /*
        @name browserEngineTypes
        @type const <{*}>
        Enum for types of browser engine.
    */
    /*
        @name browserEngineTypes.OTHER
        @type const <*>
        An unknown browser engine.
    */
    /*
        @name browserEngineTypes.CHROMIUM
        @type const <*>
        The Chromium browser engine.
    */
    /*
        @name browserEngineTypes.GECKO
        @type const <*>
        The Gecko browser engine.
    */
    /*
        @name browserEngineTypes.WEBKIT
        @type const <*>
        The WebKit browser engine.
    */
    exports.browserEngineTypes = {
        OTHER: -1,
        CHROMIUM: 0,
        GECKO: 1,
        WEBKIT: 2
    };

    /*
        @name browserTypes
        @type const <{*}>
        Enum for types of browser.
    */
    /*
        @name browserTypes.OTHER
        @type const <*>
        An unknown browser.
    */
    /*
        @name browserTypes.ORBIT
        @type const <*>
        The Subnodal Orbit web browser.
    */
    /*
        @name browserTypes.CHROMIUM
        @type const <*>
        The Google Chrome or Chromium web browsers.
    */
    /*
        @name browserTypes.FIREFOX
        @type const <*>
        The Mozilla Firefox web browser.
    */
    /*
        @name browserTypes.SAFARI
        @type const <*>
        The Apple Safari web browser.
    */
    /*
        @name browserTypes.EDGE
        @type const <*>
        The Microsoft Edge web browser.
        ~~~~
            This is the new Microsoft Edge, based on Chromium, and not the old
            EdgeHTML-based Edge.
    */
    /*
        @name browserTypes.OPERA
        @type const <*>
        The Opera web browser.
    */
    exports.browserTypes = {
        OTHER: -1,
        ORBIT: 0,
        CHROMIUM: 1,
        FIREFOX: 2,
        SAFARI: 3,
        EDGE: 4,
        OPERA: 5
    };

    /*
        @name getPlatform
        Get the current device's platform information.
        @returns <{os: osTypes, browserEngine: browserEngineTypes, browser: browserTypes}> An object representing the current platform.
    */
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
// @endnamespace