# com.subnodal.subui.menus
## ▶️ `attachEvents`
`function` · Attach all events to all menu elements.


This should only be called once. It is called when subUI is
initialised, which is usually when the document loads. All future
added menus will automatically be subject to the attached events.

## ▶️ `closeMenu`
`function` · Close the given menu.

**Parameters:**
* **`element`** (`Node`): The menu node to close

## ▶️ `openMenu`
`function` · Open the given menu nearby the given opener element.


It is recommneded that `openerElement` is specified for
accessibility reasons. When the menu is closed using the Esc key on
the keyboard, focus will be returned to the opener element.

**Parameters:**
* **`element`** (`Node`): The menu node to open
* **`openerElement`** (`Node` = `(global):document.body`): The node of the element to position the menu nearby
* **`expandWidth`** (`Boolean` = `false`): Whether to resize the menu to have a width of at least the opener element's width

## ▶️ `openMenuAtPosition`
`function` · Open the given menu at the specified pixel coordinates. The menu may change position if it is near to the edge of the screen.

**Parameters:**
* **`element`** (`Node`): The menu node to open
* **`x`** (`Number`): The X position to situate the menu nearby
* **`y`** (`Number`): The Y position to situate the menu nearby
* **`padWidth`** (`Number` = `0`): The width of any opener element which the menu should avoid obstructing
* **`padHeight`** (`Number` = `0`): The height of any opener element which the menu should avoid obstructing
* **`minWidth`** (`Number` = `0`): The minimum width the menu should be; usually used to equally size the menu with relation to `select` elements

## ▶️ `toggleContextMenu`
`function` · Toggle whether the menu should be open as a context menu nearby the mouse pointer.


It is recommneded that `togglerElement` is specified for
accessibility reasons. When the menu is closed using the Esc key on
the keyboard, focus will be returned to the toggler element.

**Parameters:**
* **`element`** (`Node`): The menu node to toggle the opening of
* **`togglerElement`** (`Node` = `(global):document.body`): The node of the element to focus if the menu is closed using the keyboard

## ▶️ `toggleMenu`
`function` · Toggle whether the menu should be open nearby the given opener element.


It is recommneded that `togglerElement` is specified for
accessibility reasons. When the menu is closed using the Esc key on
the keyboard, focus will be returned to the toggler element.

**Parameters:**
* **`element`** (`Node`): The menu node to toggle the opening of
* **`togglerElement`** (`Node` = `(global):document.body`): The node of the element to position the menu nearby
* **`expandWidth`** (`Boolean` = `false`): Whether to resize the menu to have a width of at least the opener element's width