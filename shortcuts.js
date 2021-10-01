/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.shortcuts
namespace("com.subnodal.subui.shortcuts", function(exports) {
    var platforms = require("com.subnodal.subui.platforms");

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

    var list = {
        subUI_selectAll: {code: "KeyA", primaryModifierKey: true},
        subUI_rename: {code: "F2"}
    };

    var displayNames = {};

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
        localStorage.setItem("subUI_shortcutsList", list);
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
        return Object.keys(list).find((key) => exports.shortcutsAreEquivalent(list[key], shortcut)) || null;
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
        @name removeShortcut
        Remove the keyboard shortcut from an action.
        @param action <String> The action name to remove the shortcut of
    */
    exports.removeShortcut = function(action) {
        exports.loadList();

        delete list[action];

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
        @name getShortcutRenderedElement
        Get a visual DOM element representing a keyboard shortcut.
        @param shortcut <{*}> The keyboard shortcut to render
        @param platform <{*} = com.subnodal.subui.platforms:getPlatform()> The platform to render the keys of
        @returns <Element> The rendered element representing the keyboard shortcut
    */
    exports.getShortcutRenderedElement = function(shortcut, platform = platforms.getPlatform()) {
        var element = document.createElement("span");
        var normalisedShortcut = exports.getNormalisedShortcut(shortcut);

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
                addKey([platforms.osTypes.MACOS, platforms.osTypes.IOS].includes(platform.os) ? "⌃ control" : "control");
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

    // TODO: Allow opening of a dialog to view and change keyboard shortcuts

    window.addEventListener("load", function() {
        exports.loadList();
    });
});
// @endnamespace