# com.subnodal.subui.views
## ▶️ `attachEvents`
`function` · Attach all events to all view elements.


This should only be called once. It is called when subUI is
initialised, which is usually when the document loads. All future
added views will automatically be subject to the attached events.

## ▶️ `attachListItemOpenEvent`
`function` · Attach an event callback to a list item which fires whenever the item is opened.

**Parameters:**
* **`element`** (`Node`): The item node to attach the event to
* **`callback`** (`Function`): The callback function to call when the event is triggered

## ▶️ `attachListSelectEvent`
`function` · Attach an event callback to a list which triggers whenever items in the list are selected or deselected.

**Parameters:**
* **`element`** (`Node`): The list node to attach the event to
* **`callback`** (`Function`): The callback function to call when the event is triggered

## ▶️ `deselectList`
`function` · Deselect all items from a list, triggering any event callbacks.

**Parameters:**
* **`element`** (`Node`): The list node to deselect the items in

## ▶️ `generateListItem`
`function` · Create a list item node which can be appended to a list.

**Parameters:**
* **`name`** (`String`): The name to show in the list item
* **`icon`** (`String`): The URL of the icon's image to show
* **`subtext`** (`String` = `""`): The subtext to show underneath the name
* **`id`** (`String | null` = `null`): The internal element identifier to bind to the item
* **`selected`** (`Boolean` = `false`): Whether to make the item appear selected
* **`renamable`** (`Boolean` = `true`): Whether the item should be renamable by the user

**Returns:** `Node` · The generated list item

## ▶️ `getListItemID`
`function` · Get the identifier of an item from a list.

**Parameters:**
* **`element`** (`Node`): The item node to get the identifier of

**Returns:** `String | null` · The identifier of the list item

## ▶️ `getListItemName`
`function` · Get the name of an item from a list.

**Parameters:**
* **`element`** (`Node`): The item node to get the name of

**Returns:** `String` · The name of the list item

## ▶️ `getSelectedListItemIds`
`function` · Get the identifiers of the currently-selected list items from a list.

**Parameters:**
* **`element`** (`Node`): The list node to get the selected items of

**Returns:** `[String | null]` · The currently-selected list item identifiers

## ▶️ `getSelectedListItemIds`
`function` · Get the names of the currently-selected list items from a list.

**Parameters:**
* **`element`** (`Node`): The list node to get the selected items of

**Returns:** `[String | null]` · The currently-selected list item names

## ▶️ `getSelectedListItems`
`function` · Get the currently-selected list item nodes from a list.

**Parameters:**
* **`element`** (`Node`): The list node to get the selected items of

**Returns:** `[Node]` · The currently-selected list items

## ▶️ `openListItem`
`function` · Open an item from a list, triggering any event callbacks.

**Parameters:**
* **`element`** (`Node`): The item node to open

## ▶️ `selectListItem`
`function` · Select an item from a list, and present the selection to the user, triggering any event callbacks.

**Parameters:**
* **`element`** (`Node`): The item node to select
* **`selectionMode`** (`selectionModes` = `selectionMode`): The mode to use when deciding the outcome of selection

## 🔠️ `selectionMode`
`var <selectionModes>` · The current selection mode, as determined by the current keyboard state.

## 🔒️ `selectionModes`
`const <{*}>` · Enum for icon list view item selection modes.

## 🔒️ `selectionModes.ARBITRARY`
`const <*>` · Toggle the selection of an item. The selection of other items will not be affected.

## 🔒️ `selectionModes.LINEAR`
`const <*>` · Select items in a non-visual row from the last-selected item, deselecting items which lie outside of the row.

## 🔒️ `selectionModes.SINGLE`
`const <*>` · Select only one item at a time, deselecting previous items.