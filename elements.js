/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

namespace("com.subnodal.subui.events", function(exports) {
    exports.findAncestor = function(element, selector) {
        while (element != document.body) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };

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

    exports.filterByCondition = function(elements, condition) {
        var filteredElements = [];

        elements.forEach(function(element) {
            if (condition(element)) {
                filteredElements.push(element);
            }
        });

        return filteredElements;
    };

    exports.attachSelectorEvent = function(type, selector, callback) {
        window.addEventListener(type, function(event) {
            var ancestor = exports.findAncestor(event.target, selector);

            if (ancestor != null) {
                callback(ancestor, event);
            }
        });
    };
});