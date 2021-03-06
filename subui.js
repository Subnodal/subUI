/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui
namespace("com.subnodal.subui", function(exports) {
    var views = require("com.subnodal.subui.views");
    var menus = require("com.subnodal.subui.menus");
    var dialogs = require("com.subnodal.subui.dialogs");
    var handles = require("com.subnodal.subui.handles");
    var splash = require("com.subnodal.subui.splash");

    /*
        @name autoInit
        @type var <Boolean>
        Whether subUI should automatically be initialised on document load.
    */
    exports.autoInit = true;

    /*
        @name cancelAutoInit
        Cancel the automatic initialisation of subUI on document load.
    */
    exports.cancelAutoInit = function() {
        exports.autoInit = false;
    };

    /*
        @name init
        Initialise subUI, attaching all internal events.
    */
    exports.init = function() {
        views.attachEvents();
        menus.attachEvents();
        dialogs.attachEvents();
        handles.attachEvents();
        splash.attachEvents();
    };

    window.addEventListener("load", function() {
        exports.init();
    });
});
// @endnamespace