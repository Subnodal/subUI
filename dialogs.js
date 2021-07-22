/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.dialogs
namespace("com.subnodal.subui.dialogs", function(exports) {
    var elements = require("com.subnodal.subui.elements");

    var focusStack = [];

    /*
        @name open
        Open the given dialog.
        @param element <Node> The dialog node to open
    */
    exports.open = function(element) {
        if (element.hasAttribute("open")) {
            return;
        }

        focusStack.push(document.activeElement);

        element.setAttribute("sui-open", "fade");

        element.showModal();

        element.removeAttribute("sui-open");
    };

    /*
        @name close
        Close the given dialog.
        @param element <Node> The dialog node to close
    */
    exports.close = function(element) {
        if (!element.hasAttribute("open")) {
            return;
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            element.close();
            focusStack.pop()?.focus();

            return;
        }

        element.setAttribute("sui-open", "fade");

        setTimeout(function() {
            element.close();
            focusStack.pop()?.focus();

            element.removeAttribute("sui-open");
        }, 500);
    };

    /*
        @name attachEvents
        Attach all events to all dialog elements.
            ~~~~
            This should only be called once. It is called when subUI is
            initialised, which is usually when the document loads. Dialogs
            should be pre-added to the DOM before initialisation to provide
            better support for older browsers.
    */
    exports.attachEvents = function() {
        document.querySelectorAll("dialog").forEach(function(element) {
            dialogPolyfill.registerDialog(element);
        });

        elements.attachSelectorEvent("click", "dialog button[sui-action='close']", function(element) {
            var dialog = elements.findAncestor(element, "dialog");

            exports.close(dialog);
        });
    };
});
// @endnamespace