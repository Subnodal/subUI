var elements = require("com.subnodal.subui.elements");
var menus = require("com.subnodal.subui.menus");
var views = require("com.subnodal.subui.views");

function selectAll() {
    document.querySelectorAll("ul[sui-iconlist] li").forEach((element) => element.setAttribute("aria-selected", true));
}

function invertSelection() {
    document.querySelectorAll("ul[sui-iconlist] li").forEach(function(element) {
        if (element.hasAttribute("aria-selected")) {
            element.removeAttribute("aria-selected");
        } else {
            element.setAttribute("aria-selected", true);
        }
    });
}

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