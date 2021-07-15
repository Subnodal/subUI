/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

namespace("com.subnodal.subui", function(exports) {
    var views = require("com.subnodal.subui.views");

    exports.autoInit = true;

    exports.cancelAutoInit = function() {
        exports.autoInit = false;
    };

    exports.init = function() {
        views.attachEvents();
    };

    window.addEventListener("load", function() {
        exports.init();
    });
});