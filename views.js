/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.views
namespace("com.subnodal.subui.views", function(exports) {
    var elements = require("com.subnodal.subui.elements");
    var hapticFeedback = require("com.subnodal.subui.hapticfeedback");

    var lastSelectedElement = null;
    var listSelectEvents = [];
    var listItemOpenEvents = [];
    var lastTouchTime = null;

    class ElementEvent { 
        constructor(element, callback) {
            this.element = element;
            this.callback = callback;
        }
    }

    /*
        @name selectionModes
        @type const <{*}>
        Enum for icon list view item selection modes.
    */
    /*
        @name selectionModes.SINGLE
        @type const <*>
        Select only one item at a time, deselecting previous items.
    */
    /*
        @name selectionModes.LINEAR
        @type const <*>
        Select items in a non-visual row from the last-selected item,
        deselecting items which lie outside of the row.
    */
    /*
        @name selectionModes.ARBITRARY
        @type const <*>
        Toggle the selection of an item. The selection of other items will not
        be affected.
    */
    exports.selectionModes = {
        SINGLE: 0,
        LINEAR: 1,
        ARBITRARY: 2
    };

    /*
        @name selectionMode
        @type var <selectionModes>
        The current selection mode, as determined by the current keyboard state.
    */
    exports.selectionMode = exports.selectionModes.SINGLE;

    /*
        @name longPressDuration
        @type var <Number>
        The duration to use for detecting touch long-press events on mobile, in
        milliseconds.
    */
    exports.longPressDuration = 500;

    /*
        @name setLongPressDuration
        Set the duration to use for detecting touch long-press events on mobile.
        @param duration <Number> The duration to use, in milliseconds.
    */
    exports.setLongPressDuration = function(duration) {
        exports.longPressDuration = duration;
    };

    /*
        @name selectListItem
        Select an item from a list, and present the selection to the user,
        triggering any event callbacks.
            ~~~~
            The selection mode to use will be forced to `selectionModes.SINGLE`
            if the list's `sui-mode` attribute is `"single"`.
        @param element <Node> The item node to select
        @param selectionMode <selectionModes = selectionMode> The mode to use when deciding the outcome of selection
    */
    exports.selectListItem = function(element, selectionMode = exports.selectionMode) {
        var list = elements.findAncestor(element, "ul[sui-iconlist]");
        var selectBefore = false;
        var selectBeforeFoundElement = false;

        if (list.getAttribute("sui-mode") == "single") {
            selectionMode = exports.selectionModes.SINGLE;
        }

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

    /*
        @name openListItem
        Open an item from a list, triggering any event callbacks.
        @param element <Node> The item node to open
    */
    exports.openListItem = function(element) {
        listItemOpenEvents.forEach(function(elementEvent) {
            if (elementEvent.element == element) {
                elementEvent.callback();
            }
        });
    };

    /*
        @name deselectList
        Deselect all items from a list, triggering any event callbacks.
        @param element <Node> The list node to deselect the items in
    */
    exports.deselectList = function(element) {
        element.querySelectorAll("li").forEach(function(item) {
            item.removeAttribute("aria-selected");
        });

        listSelectEvents.forEach(function(elementEvent) {
            if (elementEvent.element == element) {
                elementEvent.callback();
            }
        });
    };

    /*
        @name generateListItem
        Create a list item node which can be appended to a list.
        @param name <String> The name to show in the list item
        @param icon <String> The URL of the icon's image to show
        @param subtext <String = ""> The subtext to show underneath the name
        @param id <String | null = null> The internal element identifier to bind to the item
        @param selected <Boolean = false> Whether to make the item appear selected
        @param renamable <Boolean = true> Whether the item should be renamable by the user
        @returns <Node> The generated list item
    */
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

    /*
        @name getListItemName
        Get the name of an item from a list.
        @param element <Node> The item node to get the name of
        @returns <String> The name of the list item
    */
    exports.getListItemName = function(element) {
        return element.querySelector("input")?.value || element.querySelector("span")?.textContent || null;
    };

    /*
        @name getListItemID
        Get the identifier of an item from a list.
        @param element <Node> The item node to get the identifier of
        @returns <String | null> The identifier of the list item
    */
    exports.getListItemId = function(element) {
        return element.getAttribute("id") || null;
    };

    /*
        @name getSelectedListItems
        Get the currently-selected list item nodes from a list.
        @param element <Node> The list node to get the selected items of
        @returns <[Node]> The currently-selected list items
    */
    exports.getSelectedListItems = function(element) {
        return [...element.querySelectorAll("li[aria-selected='true']")];
    };

    /*
        @name getSelectedListItemIds
        Get the identifiers of the currently-selected list items from a list.
        @param element <Node> The list node to get the selected items of
        @returns <[String | null]> The currently-selected list item identifiers
    */
    exports.getSelectedListItemIds = function(element) {
        return exports.getSelectedListItems(element).map((item) => item.getAttribute("id"));
    };

    /*
        @name getSelectedListItemIds
        Get the names of the currently-selected list items from a list.
        @param element <Node> The list node to get the selected items of
        @returns <[String | null]> The currently-selected list item names
    */
    exports.getSelectedListItemNames = function(element) {
        return exports.getSelectedListItems(element).map((item) => exports.getListItemName(item));
    };

    /*
        @name attachListSelectEvent
        Attach an event callback to a list which triggers whenever items in the
        list are selected or deselected.
        @param element <Node> The list node to attach the event to
        @param callback <Function> The callback function to call when the event is triggered
    */
    exports.attachListSelectEvent = function(element, callback) {
        listSelectEvents.push(new ElementEvent(element, callback));
    };

    /*
        @name attachListItemOpenEvent
        Attach an event callback to a list item which fires whenever the item is
        opened.
        @param element <Node> The item node to attach the event to
        @param callback <Function> The callback function to call when the event is triggered
    */
    exports.attachListItemOpenEvent = function(element, callback) {
        listItemOpenEvents.push(new ElementEvent(element, callback));
    };

    /*
        @name attachEvents
        Attach all events to all view elements.
            ~~~~
            This should only be called once. It is called when subUI is
            initialised, which is usually when the document loads. All future
            added views will automatically be subject to the attached events.
    */
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

        elements.attachSelectorEvent("dblclick", "ul[sui-iconlist] li", function(element, event) {
            if (event.target.matches("input")) {
                return;
            }

            exports.openListItem(element);
        });

        elements.attachSelectorEvent("touchstart", "ul[sui-iconlist] li", function(element, event) {
            lastTouchTime = new Date();

            setTimeout(function() {
                if (lastTouchTime == null) {
                    return;
                }

                if (new Date().getTime() - lastTouchTime.getTime() >= exports.longPressDuration) {
                    exports.selectListItem(element);
                }
            }, exports.longPressDuration);
        });

        elements.attachSelectorEvent("touchend", "ul[sui-iconlist] li", function(element) {
            if (new Date().getTime() - lastTouchTime.getTime() < exports.longPressDuration) {
                exports.openListItem(element);
            }

            lastTouchTime = null;
        });

        elements.attachSelectorEvent("contextmenu", "ul[sui-iconlist]", function(element, event) {
            if (lastTouchTime == null) {
                return;
            }

            event.preventDefault();
        });

        elements.attachSelectorEvent("keydown", "ul[sui-iconlist] li", function(element, event) {
            var list = elements.findAncestor(element, "ul[sui-iconlist]");

            if (event.target.matches("input")) {
                if (event.key == "Escape" || event.key == "Enter") {
                    exports.selectListItem(element);

                    hapticFeedback.vibrate(hapticFeedback.vibrationFeedbackTimings.select);
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
                var itemsAbove = [...list.querySelectorAll("li")].filter((item) => item.offsetTop < element.offsetTop && item.offsetLeft == element.offsetLeft);

                if (itemsAbove.length == 0) {
                    return;
                }

                exports.selectListItem(itemsAbove[itemsAbove.length - 1]);
            } else if (event.key == "ArrowDown") {
                var itemsBelow = [...list.querySelectorAll("li")].filter((item) => item.offsetTop > element.offsetTop && item.offsetLeft == element.offsetLeft);

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
// @endnamespace