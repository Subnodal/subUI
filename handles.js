/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.handles
namespace("com.subnodal.subui.handles", function(exports) {
    var elements = require("com.subnodal.subui.elements");

    var currentHandle = null;
    var lastMouseX = null;
    var lastMouseY = null;

    exports.attachEvents = function() {
        elements.attachSelectorEvent("mousedown", "sui-handle", function(element, event) {
            currentHandle = element;

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        });

        elements.attachSelectorEvent("touchstart", "sui-handle", function(element, event) {
            currentHandle = element;

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        });

        window.addEventListener("mouseup", function() {
            currentHandle = null;
        });

        window.addEventListener("touchend", function() {
            currentHandle = null;
        });

        function moveCallback(event) {
            if (currentHandle == null) {
                return;
            }

            var resizeTarget;

            if (currentHandle.getAttribute("sui-target") == "next") {
                resizeTarget = elements.findNextOfType(currentHandle, "*", true);
            } else {
                resizeTarget = elements.findPreviousOfType(currentHandle, "*", true);
            }

            if (currentHandle.getAttribute("sui-mode") == "vertical") {
                resizeTarget.style.height = `${resizeTarget.getBoundingClientRect().height - (lastMouseX - event.clientY)}px`;
            } else if (document.body.dir == "rtl") {
                resizeTarget.style.width = `${resizeTarget.getBoundingClientRect().width + (lastMouseX - event.clientX)}px`;
            } else {
                resizeTarget.style.width = `${resizeTarget.getBoundingClientRect().width - (lastMouseX - event.clientX)}px`;
            }

            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        }

        window.addEventListener("mousemove", moveCallback);
        window.addEventListener("touchmove", moveCallback);
    };
});
// @endnamespace