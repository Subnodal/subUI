# com.subnodal.subui.elements
## ▶️ `attachSelectorEvent`
`function` · Attach an event which is specific to a given selector, and applies to all current and future events.

**Parameters:**
* **`type`** (`String`): The event type to capture
* **`selector`** (`String`): The query selector to match the event to
* **`callback`** (`Function`): The callback function to call when the event is triggered

## ▶️ `findAncestor`
`function` · Find an ancestor of self element that matches the given selector.

**Parameters:**
* **`element`** (`Node`): The element node to find using
* **`selector`** (`String`): The query selector to match the ancestor of

## ▶️ `findNextOfType`
`function` · Find the next instance of an element before the given element which matches the given selector.

**Parameters:**
* **`element`** (`Node`): The element node to find using
* **`selector`** (`String`): The query selector to match the next type of

## ▶️ `findPreviousOfType`
`function` · Find the previous instance of an element before the given element which matches the given selector.

**Parameters:**
* **`element`** (`Node`): The element node to find using
* **`selector`** (`String`): The query selector to match the previous type of