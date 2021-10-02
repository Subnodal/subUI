/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.shortcuts
namespace("com.subnodal.subui.shortcuts", function(exports) {
    var internalL10n = require("com.subnodal.subui.internall10n");
    var platforms = require("com.subnodal.subui.platforms");
    var dialogs = require("com.subnodal.subui.dialogs");

    /*
        @name KEY_DISPLAY_NAMES
        @type const <{String}>
        A list of keyboard key display names for associated key codes.
    */
    exports.KEY_DISPLAY_NAMES = {
        "Escape": "esc",
        "F1": "F1", "F2": "F2", "F3": "F3", "F4": "F4", "F5": "F5", "F6": "F6", "F7": "F7", "F8": "F8", "F9": "F9", "F10": "F10", "F11": "F11", "F12": "F12",
        "Digit0": "0", "Digit1": "1", "Digit2": "2", "Digit3": "3", "Digit4": "4", "Digit5": "5", "Digit6": "6", "Digit7": "7", "Digit8": "8", "Digit9": "9",
        "Numpad0": "pad 0", "Numpad1": "pad 1", "Numpad2": "pad 2", "Numpad3": "pad 3", "Numpad4": "pad 4",
        "Numpad5": "pad 5", "Numpad6": "pad 6", "Numpad7": "pad 7", "Numpad8": "pad 8", "Numpad9": "pad 9",
        "KeyA": "A", "KeyB": "B", "KeyC": "C", "KeyD": "D", "KeyE": "E", "KeyF": "F", "KeyG": "G", "KeyH": "H", "KeyI": "I", "KeyJ": "J", 
        "KeyK": "K", "KeyL": "L", "KeyM": "M", "KeyN": "N", "KeyO": "O", "KeyP": "P", "KeyQ": "Q", "KeyR": "R", "KeyS": "S", "KeyT": "T", 
        "KeyU": "U", "KeyV": "V", "KeyW": "W", "KeyX": "X", "KeyY": "Y", "KeyZ": "Z",
        "Space": "space",
        "NumLock": "num lock",
        "CapsLock": "caps lock",
        "ScrollLock": "scroll lock",
        "Minus": "-",
        "Equal": "=",
        "BracketLeft": "(", "BracketRight": ")",
        "Semicolon": ";",
        "Quote": "'",
        "Backquote": "`",
        "Backslash": "\\", "Slash": "/",
        "Comma": ",",
        "Period": ".",
        "Backspace": "backspace",
        "NumpadAdd": "pad +",
        "NumpadSubtract": "pad -",
        "NumpadMultiply": "pad ×",
        "NumpadDivide": "pad ÷",
        "NumpadDecimal": "pad .",
        "NumpadComma": "pad ,",
        "NumpadEqual": "pad equal",
        "NumpadEnter": "pad enter",
        "Tab": "tab",
        "Home": "home",
        "PageUp": "page up",
        "PageDown": "page dn",
        "Insert": "ins",
        "Delete": "del",
        "ArrowUp": "⭡",
        "ArrowDown": "⭣",
        "ArrowLeft": "⭠",
        "ArrowRight": "⭢",
        "ContextMenu": "menu",
        "KanaMode": "kana",
        "Lang1": "hangul", "HangulMode": "hangul",
        "Lang2": "hanja", "Hanja": "hanja",
    };

    var defaultList = {
        subUI_openShortcutsDialog: {code: "Slash", primaryModifierKey: true},
        subUI_selectAll: {code: "KeyA", primaryModifierKey: true},
        subUI_rename: {code: "F2"}
    };

    var list = {};

    var displayNames = {};

    /*
        @name getDefaultList
        Get a list of default keyboard shortcuts and their associated actions.
        @returns <{{*}}> An object containing action names as keys and shortcut objects as values
    */
        exports.getDefaultList = function() {
            return defaultList;
        };

    /*
        @name getList
        Get a list of assigned keyboard shortcuts and their associated actions.
        @returns <{{*}}> An object containing action names as keys and shortcut objects as values
    */
    exports.getList = function() {
        return list;
    };

    /*
        @name loadList
        Load the list of keyboard shortcuts from local storage.
    */
    exports.loadList = function() {
        try {
            list = JSON.parse(localStorage.getItem("subUI_shortcutsList") || "{}");
        } catch (e) {}
    };

    /*
        @name saveList
        Save the list of keyboard shortcuts to local storage.
    */
    exports.saveList = function() {
        localStorage.setItem("subUI_shortcutsList", JSON.stringify(list));
    };

    /*
        @name getDisplayNames
        Get a list of shortcut display names and their associated actions.
        @returns <{String}> An object containing action names as keys and shortcut display names as values
    */
    exports.getDisplayNames = function() {
        return displayNames;
    };

    /*
        @name getPrimaryModifierKey
        Get the primary modifier key code for the current platform.
        ~~~~
            For example, on most systems, `"ctrlKey"`. On systems such as macOS,
            the primary modifier key is `"metaKey"` for the 'cmd' key.
        @param platform <{*} = com.subnodal.subui.platforms:getPlatform()> The platform to find the primary modifier key of
        @returns <String> The associated raw key code
    */
    exports.getPrimaryModifierKey = function(platform = platforms.getPlatform()) {
        if ([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os)) {
            return "metaKey";
        }

        return "ctrlKey";
    };

    /*
        @name getSecondaryModifierKey
        Get the secondary modifier key code for the current platform.
        ~~~~
            For example, on most systems, `"altKey"`.
        @param platform <{*} = com.subnodal.subui.platforms:getPlatform()> The platform to find the primary modifier key of
        @returns <String> The associated raw key code
    */
    exports.getSecondaryModifierKey = function(platform = platforms.getPlatform()) {
        return "altKey";
    };

    /*
        @name getNormalisedShortcut
        Normalise the given keyboard shortcut object so that primary/secondary
        modifier keys are converted into their raw key codes.
        @param shortcut <{*}> The keyboard shortcut object to normalise
        @returns <{*}> The normalised keyboard shortcut object
    */
    exports.getNormalisedShortcut = function(shortcut) {
        var normalisedShortcut = {...shortcut};

        if (normalisedShortcut.primaryModifierKey) {
            normalisedShortcut[exports.getPrimaryModifierKey()] = true;
        }

        if (normalisedShortcut.secondaryModifierKey) {
            normalisedShortcut[exports.getSecondaryModifierKey()] = true;
        }

        return normalisedShortcut;
    };

    /*
        @name shortcutsAreEquivalent
        Determine whether the given keyboard shortcuts are equivalent.
        @param a <{*}> The first keyboard shortcut object to test against
        @param b <{*}> The second keyboard shortcut object to test against
        @returns <Boolean> Whether the keyboard shortcuts are equivalent
    */
    exports.shortcutsAreEquivalent = function(a, b) {
        var normalisedA = exports.getNormalisedShortcut(a);
        var normalisedB = exports.getNormalisedShortcut(b);

        return (
            normalisedA.code == normalisedB.code &&
            !!normalisedA.ctrlKey == !!normalisedB.ctrlKey &&
            !!normalisedA.altKey == !!normalisedB.altKey &&
            !!normalisedA.shiftKey == !!normalisedB.shiftKey
        );
    };

    /*
        @name getShortcutFromEvent
        Get a keyboard shortcut object from a given JavaScript event.
        @param event <Event> The JavaScript event to convert
        @returns <{*}> The converted keyboard shortcut object
    */
    exports.getShortcutFromEvent = function(event) {
        return {
            code: event.code,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey
        };
    };

    /*
        @name getActionFromShortcut
        Find the associated action for a given keyboard shortcut.
        @param shortcut <{*}> The keyboard shortcut object to get the action of
        @returns <String | null> The found action name, or `null` if there is no associated action
    */
    exports.getActionFromShortcut = function(shortcut) {
        return Object.keys({...defaultList, ...list})
            .find((key) => exports.shortcutsAreEquivalent({...defaultList, ...list}[key], shortcut)) || null
        ;
    };

    /*
        @name getActionFromEvent
        Find the associated action for a given JavaScript event.
        @param event <Event> The JavaScript event to get the action of
        @returns <String | null> The found action name, or `null` if there is no associated action
    */
    exports.getActionFromEvent = function(event) {
        return exports.getActionFromShortcut(exports.getShortcutFromEvent(event));
    };

    /*
        @name assignDefaultShortcut
        Assign a default keyboard shortcut to an action.
        @param action <String> The action name to be assigned to
        @param shortcut <{*}> The keyboard shortcut object to assign
        @param useNormalisedForm <Boolean = true> Whether to allow for normalised form conversions
    */
    exports.assignDefaultShortcut = function(action, shortcut, useNormalisedForm = true) {
        var normalisedShortcut = {...shortcut};

        if (useNormalisedForm) {
            normalisedShortcut.primaryModifierKey = shortcut[exports.getPrimaryModifierKey()];
            normalisedShortcut.secondaryModifierKey = shortcut[exports.getSecondaryModifierKey()];

            delete normalisedShortcut[exports.getPrimaryModifierKey()];
            delete normalisedShortcut[exports.getSecondaryModifierKey()];
        }

        defaultList[action] = shortcut;
    };

    /*
        @name assignShortcut
        Assign a keyboard shortcut to an action.
        @param action <String> The action name to be assigned to
        @param shortcut <{*}> The keyboard shortcut object to assign
        @param useNormalisedForm <Boolean = true> Whether to allow for normalised form conversions
    */
    exports.assignShortcut = function(action, shortcut, useNormalisedForm = true) {
        var normalisedShortcut = {...shortcut};

        exports.loadList();

        if (useNormalisedForm) {
            normalisedShortcut.primaryModifierKey = shortcut[exports.getPrimaryModifierKey()];
            normalisedShortcut.secondaryModifierKey = shortcut[exports.getSecondaryModifierKey()];

            delete normalisedShortcut[exports.getPrimaryModifierKey()];
            delete normalisedShortcut[exports.getSecondaryModifierKey()];
        }

        list[action] = shortcut;

        exports.saveList();
    };

    /*
        @name removeDefaultShortcut
        Remove the default keyboard shortcut from an action.
        @param action <String> The action name to remove the shortcut of
    */
    exports.removeShortcut = function(action) {
        delete defaultList[action];
    };

    /*
        @name removeShortcut
        Remove the keyboard shortcut from an action.
        @param action <String> The action name to remove the shortcut of
    */
    exports.removeShortcut = function(action) {
        exports.loadList();

        list[action] = {};

        exports.saveList();
    };

    /*
        @name setDisplayNameForAction
        Set the display name for an action, to be shown in the keyboard shortcuts dialog.
        @param action <String> The action name to be referenced
        @param displayName <String> The display name to set
    */
    exports.setDisplayNameForAction = function(action, displayName) {
        displayNames[action] = displayName;
    };

    /*
        @name removeDisplayNameForAction
        Remove the display name of an action, so that the action doesn't show in the keyboard shortcuts dialog.
        @param action <String> The action name to remove the display name of
    */
    exports.removeDisplayNameForAction = function(action) {
        delete displayNames[action];
    };

    /*
        @name assignSubUIDisplayNames
        Assign the display names common to subUI's shortcuts.
            ~~~~
            Calling this function is useful to reload the default display names
            if the locale has since been changed. It will only update the
            relevant shortcuts if they have a purpose (for example, the 'select
            all' shortcut for icon list views will not be added/updated if there
            are no `ul[sui-iconlist]` elements).
    */
    exports.assignSubUIDisplayNames = function() {
        if (document.querySelectorAll("ul[sui-iconlist]").length > 0) {
            displayNames.subUI_selectAll = internalL10n.translate("shortcutDisplayName_selectAll");
            displayNames.subUI_rename = internalL10n.translate("shortcutDisplayName_rename");
        }

        if (Object.keys(displayNames).length > 0) {
            displayNames.subUI_openShortcutsDialog = internalL10n.translate("shortcutDisplayName_openShortcutsDialog");
        }
    };

    /*
        @name getShortcutRenderedElement
        Get a visual DOM element representing a keyboard shortcut.
        @param shortcut <{*}> The keyboard shortcut to render
        @param platform <{*} = com.subnodal.subui.platforms:getPlatform()> The platform to render the keys of
        @returns <Element> The rendered element representing the keyboard shortcut
    */
    exports.getShortcutRenderedElement = function(shortcut, platform = platforms.getPlatform(), forceSameLine = true) {
        var element = document.createElement("span");
        var normalisedShortcut = exports.getNormalisedShortcut(shortcut);

        if (forceSameLine) {
            element.setAttribute("sui-overflow", "reflow");
        }

        function addKey(name, concat = false) {
            var key = document.createElement("kbd");

            key.textContent = name;

            element.append(key);

            if (concat) {
                element.append(document.createTextNode(" + "));
            }
        }

        if (normalisedShortcut.ctrlKey) {
            addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌃ control" : "ctrl", true);
        }

        if (normalisedShortcut.altKey) {
            addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌥ option" : "ctrl", true);
        }

        if (normalisedShortcut.shiftKey) {
            addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⇧ shift" : "shift", true);
        }

        if (normalisedShortcut.metaKey) {
            addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌘ cmd" : "meta", true);
        }

        switch (shortcut.code) {
            case "PrintScreen":
                addKey(platform.os == platforms.types.SUBOS ? "screenshot" : "print screen");
                break;

            case "Enter":
                addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "return" : "enter");
                break;

            case "ControlLeft":
            case "ControlRight":
                addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌃ control" : "ctrl");
                break;

            case "AltLeft":
            case "AltRight":
                addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌥ option" : "alt");
                break;

            case "ShiftLeft":
            case "ShiftRight":
                addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⇧ shift" : "shift");
                break;

            case "OSLeft":
            case "OSRight":
                addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌘ cmd" : "meta");
                break;

            default:
                addKey(exports.KEY_DISPLAY_NAMES[shortcut.code]);
                break;
        }

        return element;
    };

    /*
        @name openShortcutsDialog
        Open the keyboard shortcuts configuration dialog.
    */
    exports.openShortcutsDialog = function() {
        if (Object.keys(displayNames).length == 0) {
            return;
        }

        if (
            document.body.querySelector("dialog[sui-shortcutsconfig]") != null &&
            dialogs.isOpen(document.body.querySelector("dialog[sui-shortcutsconfig]"))
        ) {
            return;
        }

        document.body.querySelectorAll("dialog[sui-shortcutsconfig]").forEach((element) => element.remove());

        var dialog = document.createElement("dialog");

        dialog.setAttribute("sui-shortcutsconfig", "");

        var heading = document.createElement("h1");

        heading.textContent = internalL10n.translate("keyboardShortcutsDialog_title");

        var workArea = document.createElement("sui-workarea");
        var table = document.createElement("table");
        var buttonRow = document.createElement("sui-buttonrow");
        var hiddenInput = document.createElement("input");

        hiddenInput.setAttribute("tabindex", "-1");
        hiddenInput.setAttribute("sui-a11y", "keyboardOnly");
        hiddenInput.setAttribute("aria-label", internalL10n.translate("keyboardShortcutsDialog_waitingForShortcut"));

        var actionToModify = null;

        function renderShortcuts() {
            var workAreaScrollTop = workArea.scrollTop;

            table.innerHTML = "";

            Object.keys(displayNames).forEach(function(action) {
                var tableRow = document.createElement("tr");
                var displayNameCell = document.createElement("td");
                var shortcutCell = document.createElement("td");

                displayNameCell.textContent = displayNames[action];

                if (action == actionToModify) {
                    shortcutCell.textContent = internalL10n.translate("keyboardShortcutsDialog_waitingForShortcut");
                } else {
                    if (Object.keys({...defaultList, ...list}[action] || {}).length > 0) {
                        shortcutCell.append(exports.getShortcutRenderedElement({...defaultList, ...list}[action] || {}));
                    } else {
                        shortcutCell.append(document.createTextNode(internalL10n.translate("keyboardShortcutsDialog_unassigned")));
                    }

                    shortcutCell.append(document.createTextNode(" "));

                    var assignButton = document.createElement("button");
                    var unassignButton = document.createElement("button");

                    assignButton.textContent = internalL10n.translate("keyboardShortcutsDialog_assign");
                    unassignButton.textContent = internalL10n.translate("keyboardShortcutsDialog_unassign");

                    assignButton.setAttribute("sui-a11y", "keyboardOnly showOnFocus");
                    unassignButton.setAttribute("sui-a11y", "keyboardOnly showOnFocus");

                    assignButton.addEventListener("click", function() {
                        actionToModify = action;
                        renderShortcuts();
                        hiddenInput.focus();
                    });

                    unassignButton.addEventListener("click", function() {
                        exports.assignShortcut(actionToModify, {});
                    });

                    shortcutCell.append(assignButton);
                    shortcutCell.append(unassignButton);
                }

                shortcutCell.setAttribute("sui-align", "end");

                shortcutCell.addEventListener("click", function() {
                    if (action == actionToModify) {
                        exports.assignShortcut(actionToModify, {}); // Unassign it

                        actionToModify = null;
                    } else {
                        actionToModify = action;

                        dialog.setAttribute("sui-mode", "nonClosable");
                        hiddenInput.focus();
                    }

                    renderShortcuts();
                });

                tableRow.append(displayNameCell);
                tableRow.append(shortcutCell);

                table.append(tableRow);
            });

            workArea.scrollTop = workAreaScrollTop;
        }

        renderShortcuts();

        hiddenInput.addEventListener("keyup", function(event) {
            event.preventDefault();
            event.stopPropagation();

            dialog.removeAttribute("sui-mode");

            if (actionToModify != null) {
                exports.assignShortcut(actionToModify, exports.getShortcutFromEvent(event));

                actionToModify = null;

                renderShortcuts();
            }
        });

        var doneButton = document.createElement("button");
        var resetButton = document.createElement("button");

        doneButton.textContent = internalL10n.translate("done");
        resetButton.textContent = internalL10n.translate("reset");

        doneButton.setAttribute("sui-action", "close");
        resetButton.setAttribute("sui-style", "flat");

        resetButton.addEventListener("click", function() {
            list = {};

            exports.saveList();
            renderShortcuts();
        });

        workArea.append(table);

        buttonRow.append(doneButton);
        buttonRow.append(resetButton);

        dialog.append(heading);
        dialog.append(workArea);
        dialog.append(hiddenInput);
        dialog.append(buttonRow);

        document.body.append(dialog);

        dialogs.attachEvents();

        dialogs.open(dialog);

        doneButton.focus();
    };

    window.addEventListener("load", function() {
        exports.loadList();
        exports.assignSubUIDisplayNames();

        window.addEventListener("keydown", function(event) {
            if (exports.getActionFromEvent(event) == "subUI_openShortcutsDialog") {
                exports.openShortcutsDialog();
            }
        });
    });
});
// @endnamespace