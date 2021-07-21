var elements = require("com.subnodal.subui.elements");
var menus = require("com.subnodal.subui.menus");
var views = require("com.subnodal.subui.views");

window.addEventListener("load", function() {
    document.querySelector("#exampleCheckbox3").indeterminate = true;

    elements.attachSelectorEvent("contextmenu", "ul[sui-iconlist]", function(element, event) {
        if (event.target != element) {
            return;
        }

        menus.toggleContextMenu(document.getElementById("viewContextMenu"), element);
    });

    elements.attachSelectorEvent("contextmenu", "ul[sui-iconlist] li", function(element, event) {
        if (element.getAttribute("aria-selected") != "true") {
            views.selectListItem(element, views.selectionModes.SINGLE);
        }

        menus.toggleContextMenu(document.getElementById("itemContextMenu"), element);
    });
});