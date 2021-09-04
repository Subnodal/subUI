/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.menus
namespace("com.subnodal.subui.menus", function(exports) {
    var elements = require("com.subnodal.subelements.elements");

    var ignoreNextCloseEvent = false;
    var transitionTimeout = null;
    var lastMouseX = 0;
    var lastMouseY = 0;

    /*
        @name openMenuAtPosition
        Open the given menu at the specified pixel coordinates. The menu may
        change position if it is near to the edge of the screen.
        @param element <Node> The menu node to open
        @param x <Number> The X position to situate the menu nearby
        @param y <Number> The Y position to situate the menu nearby
        @param padWidth <Number = 0> The width of any opener element which the menu should avoid obstructing
        @param padHeight <Number = 0> The height of any opener element which the menu should avoid obstructing
        @param minWidth <Number = 200> The minimum width the menu should be; usually used to equally size the menu with relation to `select` elements
    */
    exports.openMenuAtPosition = function(element, x, y, padWidth = 0, padHeight = 0, minWidth = 200) {
        document.querySelectorAll("sui-menu").forEach((element) => exports.closeMenu(element));
        document.body.querySelectorAll("sui-backdrop").forEach((element) => element.remove());

        ignoreNextCloseEvent = true;

        clearTimeout(transitionTimeout);

        var backdrop = document.createElement("sui-backdrop");

        backdrop.addEventListener("click", function() {
            ignoreNextCloseEvent = false;
        });

        document.body.append(backdrop);

        var focusNodeClone = document.activeElement.cloneNode(true);

        focusNodeClone.querySelectorAll("[aria-hidden='true']").forEach((element) => element.remove());

        element.setAttribute("role", "dialog");
        element.setAttribute("aria-label", focusNodeClone.textContent.trim());

        element.setAttribute("sui-open", "fadeIn");
        element.querySelector("button")?.focus();

        setTimeout(function() {
            element.style.minWidth = `${minWidth}px`;

            if (y + element.offsetHeight + 10 > window.innerHeight) {
                y = Math.max(y - element.offsetHeight - padHeight - 10, 5);
            }

            if (document.body.getAttribute("dir") != "rtl" && x + element.offsetWidth + 5 > window.innerWidth) {
                x = Math.max(window.innerWidth - element.offsetWidth - padWidth - 5, 5);
            } else if (document.body.getAttribute("dir") == "rtl" && x - element.offsetWidth - 5 < 0) {
                x = Math.max(padWidth + 5, 5);
            } else if (document.body.getAttribute("dir") == "rtl") {
                x = Math.max(x - element.offsetWidth, 5);
            }

            element.style.top = `${y}px`;
            element.style.left = `${x}px`;

            ignoreNextCloseEvent = false;

            element.setAttribute("sui-open", true);
        });
    };

    /*
        @name openMenu
        Open the given menu nearby the given opener element.
            ~~~~
            It is recommneded that `openerElement` is specified for
            accessibility reasons. When the menu is closed using the Esc key on
            the keyboard, focus will be returned to the opener element.
        @param element <Node> The menu node to open
        @param openerElement <Node = (global):document.body> The node of the element to position the menu nearby
        @param expandWidth <Boolean = false> Whether to resize the menu to have a width of at least the opener element's width
    */
    exports.openMenu = function(element, openerElement = document.body, expandWidth = false) {
        var openerPosition = openerElement.getBoundingClientRect();

        element.returnElement = openerElement;

        exports.openMenuAtPosition(
            element,
            document.body.getAttribute("dir") != "rtl" ? openerPosition.left : openerPosition.left + openerPosition.width,
            openerPosition.top + openerPosition.height,
            0,
            openerPosition.height,
            expandWidth ? openerPosition.width : 0
        );

        // Doesn't specify `padWidth` because otherwise alignment would break if menu becomes flipped
    };

    /*
        @name closeMenu
        Close the given menu.
        @param element <Node> The menu node to close
    */
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

    /*
        @name toggleMenu
        Toggle whether the menu should be open nearby the given opener element.
            ~~~~
            It is recommneded that `togglerElement` is specified for
            accessibility reasons. When the menu is closed using the Esc key on
            the keyboard, focus will be returned to the toggler element.
        @param element <Node> The menu node to toggle the opening of
        @param togglerElement <Node = (global):document.body> The node of the element to position the menu nearby
        @param expandWidth <Boolean = false> Whether to resize the menu to have a width of at least the opener element's width
    */
    exports.toggleMenu = function(element, togglerElement = document.body, expandWidth = false) {
        if (element.getAttribute("sui-open") == "true") {
            exports.closeMenu(element);
        } else {
            exports.openMenu(element, togglerElement, expandWidth);
        }
    };

    /*
        @name toggleContextMenu
        Toggle whether the menu should be open as a context menu nearby the
        mouse pointer.
            ~~~~
            It is recommneded that `togglerElement` is specified for
            accessibility reasons. When the menu is closed using the Esc key on
            the keyboard, focus will be returned to the toggler element.
        @param element <Node> The menu node to toggle the opening of
        @param togglerElement <Node = (global):document.body> The node of the element to focus if the menu is closed using the keyboard
    */
    exports.toggleContextMenu = function(element, togglerElement = document.body) {
        element.returnElement = togglerElement;

        if (element.getAttribute("sui-open") == "true") {
            exports.closeMenu(element);
        } else {
            exports.openMenuAtPosition(
                element,
                lastMouseX,
                lastMouseY,
                document.body.getAttribute("dir") != "rtl" ? window.innerWidth - lastMouseX : lastMouseX,
                0
            );
        }
    };

    /*
        @name attachEvents
        Attach all events to all menu elements.
            ~~~~
            This should only be called once. It is called when subUI is
            initialised, which is usually when the document loads. All future
            added menus will automatically be subject to the attached events.
    */
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

        window.addEventListener("mouseover", function(event) {
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
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

        elements.attachSelectorEvent("click", "sui-menu button", function(element, event) {
            var menu = elements.findAncestor(element, "sui-menu");

            if (element.getAttribute("sui-mode") != "keepOpen") {
                exports.closeMenu(menu);
            }
        });

        elements.attachSelectorEvent("keydown", "sui-menu button", function(element, event) {
            var menu = elements.findAncestor(element, "sui-menu");

            if (event.key == "ArrowUp") {
                (
                    elements.findPreviousOfTypeFromParent(element, "button:not(:disabled)", menu, true) ||
                    menu.querySelectorAll("button:not(:disabled)")[menu.querySelectorAll("button:not(:disabled)").length - 1]
                ).focus();
            } else if (event.key == "ArrowDown") {
                (
                    elements.findNextOfTypeFromParent(element, "button:not(:disabled)", menu, true) ||
                    menu.querySelectorAll("button:not(:disabled)")[0]
                ).focus();
            } else if (event.key == "Tab") {
                event.preventDefault();
            } else if (event.key == "Space" || event.key == "Enter") {
                if (element.getAttribute("sui-mode") != "keepOpen") {
                    setTimeout(function() {
                        exports.closeMenu(menu);                        
                    });
                }
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

                        element.dispatchEvent(new Event("change"));
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

            document.querySelectorAll("sui-menu:not([sui-role='select'])").forEach((element) => exports.closeMenu(element));

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