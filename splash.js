/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.splash
namespace("com.subnodal.subui.splash", function(exports) {
    const SHOW_LOADER_AFTER = 2_000; // 2 seconds

    /*
        @name finish
        Hide the splash screen, signifying that loading has finished.
    */
    exports.finish = function() {
        document.querySelectorAll("sui-splash").forEach(function(element) {
            element.setAttribute("aria-hidden", "true");
            element.setAttribute("tabindex", "-1");
        });
    };

    /*
        @name attachEvents
        Attach all events to all the splash screen element.
            ~~~~
            This should only be called once. It is called when subUI is
            initialised, which is usually when the document loads.
    */
    exports.attachEvents = function() {
        document.querySelectorAll("sui-splash").forEach(function(element) {
            element.setAttribute("sui-animate", "open");

            setTimeout(function() {
                element.setAttribute("sui-animate", "open loader");
            }, SHOW_LOADER_AFTER);
        });
    };
});