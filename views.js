/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

namespace("com.subnodal.subui.views", function(exports) {
    var elements = require("com.subnodal.subui.events");

    var lastSelectedElement = null;

    exports.selectionModes = {
        SINGLE: 0,
        LINEAR: 1,
        ARBITRARY: 2
    };

    exports.selectionMode = exports.selectionModes.SINGLE;

    exports.selectListItem = function(element, selectionMode = exports.selectionMode) {
        var list = elements.findAncestor(element, "ul[sui-iconlist]");
        var selectBefore = false;
        var selectBeforeFoundElement = false;

        list.querySelectorAll("li").forEach(function(item) {
            if (selectBeforeFoundElement) {
                return;
            }

            if (item == lastSelectedElement) {
                selectBeforeFoundElement = true;
            }

            if (item == element) {
                selectBefore = true;
            }
        });

        if (selectionMode == exports.selectionModes.SINGLE) {
            list.querySelectorAll("li").forEach(function(item) {
                item.removeAttribute("aria-selected");
            });
        } else if (selectionMode == exports.selectionModes.LINEAR) {
            var items = list.querySelectorAll("li");
            var foundSelected = false;
            var foundElement = false;

            if (selectBefore) {
                items = [...items].reverse();
            }

            items.forEach(function(item) {
                if (foundElement) {
                    return;
                }

                if (item.getAttribute("aria-selected") == "true") {
                    foundSelected = true;
                }

                if (foundSelected) {
                    item.setAttribute("aria-selected", true);
                }

                if (item == element) {
                    foundElement = true;
                }
            });
        }

        lastSelectedElement = element;

        if (selectionMode == exports.selectionModes.ARBITRARY && element.getAttribute("aria-selected") == "true") {
            element.removeAttribute("aria-selected");
        } else {
            element.setAttribute("aria-selected", true);
        }

        element.focus();
    };

    exports.deselectList = function(element) {
        var list = elements.findAncestor(element, "ul[sui-iconlist]");

        list.querySelectorAll("li").forEach(function(item) {
            item.removeAttribute("aria-selected");
        });
    };

    exports.attachEvents = function() {
        window.addEventListener("keydown", function(event) {
            var list = elements.findAncestor(event.target, "ul[sui-iconlist]");

            if (event.key == "Shift") {
                exports.selectionMode = exports.selectionModes.LINEAR;
            } else if (event.key == "Ctrl") {
                exports.selectionMode = exports.selectionModes.ARBITRARY;
            } else {
                exports.selectionMode = exports.selectionModes.SINGLE;
            }

            if (list == null || event.target.matches("input")) {
                return;
            }

            if (event.key == "a" && event.ctrlKey) {
                list.querySelectorAll("li").forEach(function(item) {
                    exports.selectListItem(item, exports.selectionModes.LINEAR);

                    event.target.focus();
                });
            }
        });

        window.addEventListener("click", function(event) {
            if (event.target.matches("ul[sui-iconlist]")) {
                exports.deselectList(event.target);
            }
        });

        window.addEventListener("keyup", function() {
            exports.selectionMode = exports.selectionModes.SINGLE;
        });

        elements.attachSelectorEvent("click", "ul[sui-iconlist] li", function(element, event) {
            exports.selectListItem(element);

            if (event.target.matches("input")) {
                event.target.focus();

                return;
            }
        });

        elements.attachSelectorEvent("keydown", "ul[sui-iconlist] li", function(element, event) {
            var list = elements.findAncestor(element, "ul[sui-iconlist]");

            if (event.target.matches("input")) {
                if (event.key == "Escape" || event.key == "Enter") {
                    exports.selectListItem(element);
                }

                return;
            }

            if (event.shiftKey) {
                exports.selectionMode = exports.selectionModes.LINEAR;
            } else if (event.ctrlKey) {
                exports.selectionMode = exports.selectionModes.ARBITRARY;
            } else {
                exports.selectionMode = exports.selectionModes.SINGLE;
            }

            if (event.key == " ") {
                exports.selectListItem(element);
            } else if (event.key == "ArrowUp") {
                var itemsAbove = elements.filterByCondition(list.querySelectorAll("li"), (item) => item.offsetTop < element.offsetTop && item.offsetLeft == element.offsetLeft);

                if (itemsAbove.length == 0) {
                    return;
                }

                exports.selectListItem(itemsAbove[itemsAbove.length - 1]);
            } else if (event.key == "ArrowDown") {
                var itemsBelow = elements.filterByCondition(list.querySelectorAll("li"), (item) => item.offsetTop > element.offsetTop && item.offsetLeft == element.offsetLeft);

                if (itemsBelow.length == 0) {
                    return;
                }

                exports.selectListItem(itemsBelow[0]);
            } else if (event.key == "ArrowLeft") {
                var previousItem = elements.findPreviousOfType(element, "ul[sui-iconlist] li");

                if (previousItem == null) {
                    return;
                }

                exports.selectListItem(previousItem);
            } else if (event.key == "ArrowRight") {
                var nextItem = elements.findNextOfType(element, "ul[sui-iconlist] li");

                if (nextItem == null) {
                    return;
                }

                exports.selectListItem(nextItem);
            } else if (event.key == "F2") {
                var renameField = element.querySelector("input");

                if (!renameField) {
                    return;
                }

                renameField.focus();
                renameField.select();
            } else if (event.key == "Escape") {
                exports.deselectList(list);
            }
        });
    };
});