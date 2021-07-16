/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.events
namespace("com.subnodal.subui.events", function(exports) {
    /*
        @name findAncestor
        Find an ancestor of self element that matches the given selector.
        @param element <Node> The element node to find using
        @param selector <String> The query selector to match the ancestor of
    */
    exports.findAncestor = function(element, selector) {
        while (element != document.body) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };

    /*
        @name findPreviousOfType
        Find the previous instance of an element before the given element which
        matches the given selector.
        @param element <Node> The element node to find using
        @param selector <String> The query selector to match the previous type of
    */
    exports.findPreviousOfType = function(element, selector) {
        while (true) {
            element = element.previousSibling;

            if (!element) {
                return null;
            }

            if (element.nodeType != Node.ELEMENT_NODE) {
                continue;
            }

            if (element.matches(selector)) {
                return element;
            }
        }
    };

    /*
        @name findNextOfType
        Find the next instance of an element before the given element which
        matches the given selector.
        @param element <Node> The element node to find using
        @param selector <String> The query selector to match the next type of
    */
    exports.findNextOfType = function(element, selector) {
        while (true) {
            element = element.nextSibling;

            if (!element) {
                return null;
            }

            if (element.nodeType != Node.ELEMENT_NODE) {
                continue;
            }

            if (element.matches(selector)) {
                return element;
            }
        }
    };

    /*
        @name attachSelectorEvent
        Attach an event which is specific to a given selector, and applies to
        all current and future events.
        @param type <String> The event type to capture
        @param selector <String> The query selector to match the event to
        @param callback <Function> The callback function to call when the event is triggered
    */
    exports.attachSelectorEvent = function(type, selector, callback) {
        window.addEventListener(type, function(event) {
            var ancestor = exports.findAncestor(event.target, selector);

            if (ancestor != null) {
                callback(ancestor, event);
            }
        });
    };
});
// @endnamespace