/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

namespace("com.subnodal.subui.views", function(exports) {
    var elements = require("com.subnodal.subui.events");

    var lastSelectedElement = null;
    var listSelectEvents = [];
    var listItemOpenEvents = [];

    class ElementEvent { 
        constructor(element, callback) {
            this.element = element;
            this.callback = callback;
        }
    }

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

        listSelectEvents.forEach(function(elementEvent) {
            if (elementEvent.element == list) {
                elementEvent.callback();
            }
        });
    };

    exports.openListItem = function(element) {
        listItemOpenEvents.forEach(function(elementEvent) {
            if (elementEvent.element == element) {
                elementEvent.callback();
            }
        });
    };

    exports.deselectList = function(element) {
        var list = elements.findAncestor(element, "ul[sui-iconlist]");

        list.querySelectorAll("li").forEach(function(item) {
            item.removeAttribute("aria-selected");
        });
    };

    exports.generateListItem = function(name, icon, subtext = "", id = null, selected = false, renamable = true) {
        var item = document.createElement("li");

        item.setAttribute("tabindex", 0);
        item.setAttribute("id", id);

        if (selected) {
            item.setAttribute("aria-selected", true);
        }

        var iconImage = document.createElement("img");

        iconImage.setAttribute("aria-hidden", true);

        iconImage.src = icon;

        item.append(iconImage);

        if (renamable) {
            var nameInput = document.createElement("input");

            nameInput.setAttribute("tabindex", -1);

            nameInput.value = name;

            item.append(nameInput);
        } else {
            var nameSpan = document.createElement("span");

            nameSpan.textContent = name;

            item.append(nameSpan);
        }

        var subtextSpan = document.createElement("span");

        subtextSpan.textContent = subtext;

        item.append(subtextSpan);

        return item;
    };

    exports.getListItemName = function(element) {
        return element.querySelector("input")?.value || element.querySelector("span")?.textContent || null;
    };

    exports.getListItemId = function(element) {
        return element.getAttribute("id") || null;
    };

    exports.getSelectedListItems = function(element) {
        return [...element.querySelectorAll("li[aria-selected='true']")];
    };

    exports.getSelectedListItemIds = function(element) {
        return exports.getSelectedListItems(element).map((item) => item.getAttribute("id"));
    };

    exports.getSelectedListItemNames = function(element) {
        return exports.getSelectedListItems(element).map((item) => exports.getListItemName(item));
    };

    exports.attachListSelectEvent = function(element, callback) {
        listSelectEvents.push(new ElementEvent(element, callback));
    };

    exports.attachListItemOpenEvent = function(element, callback) {
        listItemOpenEvents.push(new ElementEvent(element, callback));
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
            } else if (event.key == "Enter") {
                exports.openListItem(element);
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