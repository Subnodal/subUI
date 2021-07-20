/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.menus
namespace("com.subnodal.subui.menus", function(exports) {
    var elements = require("com.subnodal.subui.elements");

    var ignoreNextCloseEvent = false;
    var transitionTimeout = null;
    var lastMouseX = 0;
    var lastMouseY = 0;

    exports.openMenuAtPosition = function(element, top, left, padTop = 0, padLeft = 0, minWidth = 0) {
        ignoreNextCloseEvent = true;

        clearTimeout(transitionTimeout);

        if (document.body.querySelectorAll("sui-backdrop").length == 0) {
            var backdrop = document.createElement("sui-backdrop");

            backdrop.addEventListener("click", function() {
                ignoreNextCloseEvent = false;
            });

            document.body.append(backdrop);
        }

        element.setAttribute("sui-open", "fadeIn");
        element.querySelector("button")?.focus();

        setTimeout(function() {
            element.style.minWidth = `${minWidth}px`;

            if (top + element.clientHeight + 10 > window.innerHeight) {
                top = window.innerHeight - element.clientHeight - padTop - 10;
            }

            if (document.body.getAttribute("dir") != "rtl" && left + element.clientWidth + 5 > window.innerWidth) {
                left = window.innerWidth - element.clientWidth - padLeft - 5;
            } else if (document.body.getAttribute("dir") == "rtl" && left - element.clientWidth - 5 < 0) {
                left = padLeft + 5;
            } else if (document.body.getAttribute("dir") == "rtl") {
                left = left - element.clientWidth;
            }

            element.style.top = `${top}px`;
            element.style.left = `${left}px`;

            ignoreNextCloseEvent = false;

            element.setAttribute("sui-open", true);
        });
    };

    exports.openMenu = function(element, openerElement = document.body, expandWidth = false) {
        var openerPosition = openerElement.getBoundingClientRect();

        element.returnElement = openerElement;

        exports.openMenuAtPosition(
            element,
            openerPosition.top + openerPosition.height,
            document.body.getAttribute("dir") != "rtl" ? openerPosition.left : openerPosition.left + openerPosition.width,
            openerPosition.height,
            0,
            expandWidth ? openerPosition.width : 0
        );

        // Doesn't specify `padWidth` because otherwise alignment would break if menu becomes flipped
    };

    exports.closeMenu = function(element) {
        if (element.getAttribute("sui-open") == null) {
            return;
        }

        if (!!element.returnElement) {
            element.returnElement.focus();

            element.returnElement = undefined;
        }

        element.setAttribute("sui-open", "fadeOut");

        clearTimeout(transitionTimeout);

        transitionTimeout = setTimeout(function() {
            element.removeAttribute("sui-open");
        }, 500);
    };

    exports.toggleMenu = function(element, togglerElement = document.body, expandWidth = false) {
        if (element.getAttribute("sui-open") == "true") {
            exports.closeMenu(element);
        } else {
            exports.openMenu(element, togglerElement, expandWidth);
        }
    };

    exports.toggleContextMenu = function(element, togglerElement = document.body) {
        element.returnElement = togglerElement;

        if (element.getAttribute("sui-open") == "true") {
            exports.closeMenu(element);
        } else {
            exports.openMenuAtPosition(
                element,
                lastMouseY,
                lastMouseX,
                window.innerHeight - lastMouseY,
                document.body.getAttribute("dir") != "rtl" ? window.innerWidth - lastMouseX : lastMouseX
            );
        }
    };

    exports.attachEvents = function() {
        window.addEventListener("click", function(event) {
            if (ignoreNextCloseEvent) {
                ignoreNextCloseEvent = false;

                return;
            }

            if (elements.findAncestor(event.target, "sui-menu") != null) {
                return;
            }

            document.querySelectorAll("sui-menu").forEach((element) => exports.closeMenu(element));
        });

        window.addEventListener("keydown", function(event) {
            if (event.key == "Escape") {
                document.querySelectorAll("sui-menu").forEach((element) => exports.closeMenu(element));
            }
        });

        window.addEventListener("mousemove", function(event) {
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
        });

        window.addEventListener("contextmenu", function(event) {
            if (document.body.getAttribute("sui-target") == "web") {
                return;
            }

            event.preventDefault();
        });

        elements.attachSelectorEvent("keydown", "sui-menu button", function(element, event) {
            if (event.key == "ArrowUp") {
                (
                    elements.findPreviousOfType(element, "button:not(:disabled)") ||
                    element.parentNode.querySelector("button:not(:disabled):last-child")
                ).focus();
            } else if (event.key == "ArrowDown") {
                (
                    elements.findNextOfType(element, "button:not(:disabled)") ||
                    element.parentNode.querySelector("button:not(:disabled):first-child")
                ).focus();
            } else if (event.key == "Tab") {
                event.preventDefault();
            }
        });

        function toggleSelectMenuCallback(element, event) {
            if (document.body.querySelectorAll("sui-menu[sui-role='select']").length == 0) {
                var newSelectMenu = document.createElement("sui-menu");

                newSelectMenu.setAttribute("sui-role", "select");

                document.body.append(newSelectMenu);
            }

            var selectMenu = document.body.querySelector("sui-menu[sui-role='select']");
            var selectOptions = element.querySelectorAll("option");
            var optionIndex = 0;

            selectMenu.innerHTML = "";

            selectOptions.forEach(function(option) {
                var optionButton = document.createElement("button");

                optionButton.innerHTML = option.innerHTML;

                selectMenu.append(optionButton);

                (function(optionIndex) {
                    optionButton.addEventListener("click", function() {
                        element.selectedIndex = optionIndex;

                        exports.closeMenu(selectMenu);
                    });
                })(optionIndex);

                setTimeout(function() {
                    if (element.options[element.selectedIndex] == option) {
                        optionButton.focus();
                    }
                });

                optionIndex++;
            });

            event.preventDefault();
            element.blur();

            exports.toggleMenu(selectMenu, element, true);

            setTimeout(function() {
                ignoreNextCloseEvent = true;
            });
        }

        elements.attachSelectorEvent("mousedown", "select", function(element, event) {
            if (event.button != 0) {
                return;
            }
            
            toggleSelectMenuCallback(element, event);
        });

        elements.attachSelectorEvent("keydown", "select", function(element, event) {
            if (event.key == "Enter" || event.key == " ") {
                toggleSelectMenuCallback(element, event);                
            }
        });
    };
});
// @endnamespace