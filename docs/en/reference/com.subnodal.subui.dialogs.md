# com.subnodal.subui.dialogs
## ▶️ `attachEvents`
`function` · Attach all events to all dialog elements.


This should only be called once. It is called when subUI is
initialised, which is usually when the document loads. Dialogs
should be pre-added to the DOM before initialisation to provide
better support for older browsers.

## ▶️ `close`
`function` · Close the given dialog.

**Parameters:**
* **`element`** (`Node`): The dialog node to close

## ▶️ `isOpen`
`function` · Check whether the given dialog is open.

**Parameters:**
* **`element`** (`Node`): The dialog node to check

**Returns:** `Boolean` · Whether the dialog is open

## ▶️ `open`
`function` · Open the given dialog.

**Parameters:**
* **`element`** (`Node`): The dialog node to open