# com.subnodal.subui.platforms
## 🔒️ `KEY_DISPLAY_NAMES`
`const <{String}>` · A list of keyboard key display names for associated key codes.

## ▶️ `assignShortcut`
`function` · Assign a keyboard shortcut to an action.

**Parameters:**
* **`action`** (`String`): The action name to be assigned to
* **`shortcut`** (`{*}`): The keyboard shortcut object to assign
* **`useNormalisedForm`** (`Boolean` = `true`): Whether to allow for normalised form conversions

## ▶️ `getActionFromEvent`
`function` · Find the associated action for a given JavaScript event.

**Parameters:**
* **`event`** (`Event`): The JavaScript event to get the action of

**Returns:** `String | null` · The found action name, or `null` if there is no associated action

## ▶️ `getActionFromShortcut`
`function` · Find the associated action for a given keyboard shortcut.

**Parameters:**
* **`shortcut`** (`{*}`): The keyboard shortcut object to get the action of

**Returns:** `String | null` · The found action name, or `null` if there is no associated action

## ▶️ `getDisplayNames`
`function` · Get a list of shortcut display names and their associated actions.

**Returns:** `{String}` · An object containing action names as keys and shortcut display names as values

## ▶️ `getList`
`function` · Get a list of assigned keyboard shortcuts and their associated actions.

**Returns:** `{{*}}` · An object containing action names as keys and shortcut objects as values

## ▶️ `getNormalisedShortcut`
`function` · Normalise the given keyboard shortcut object so that primary/secondary modifier keys are converted into their raw key codes.

**Parameters:**
* **`shortcut`** (`{*}`): The keyboard shortcut object to normalise

**Returns:** `{*}` · The normalised keyboard shortcut object

## ▶️ `getPrimaryModifierKey`
`function` · Get the primary modifier key code for the current platform. 

For example, on most systems, `"ctrlKey"`. On systems such as macOS,
the primary modifier key is `"metaKey"` for the 'cmd' key.

**Parameters:**
* **`platform`** (`{*}` = `com.subnodal.subui.platforms:getPlatform()`): The platform to find the primary modifier key of

**Returns:** `String` · The associated raw key code

## ▶️ `getSecondaryModifierKey`
`function` · Get the secondary modifier key code for the current platform. 

For example, on most systems, `"altKey"`.

**Parameters:**
* **`platform`** (`{*}` = `com.subnodal.subui.platforms:getPlatform()`): The platform to find the primary modifier key of

**Returns:** `String` · The associated raw key code

## ▶️ `getShortcutFromEvent`
`function` · Get a keyboard shortcut object from a given JavaScript event.

**Parameters:**
* **`event`** (`Event`): The JavaScript event to convert

**Returns:** `{*}` · The converted keyboard shortcut object

## ▶️ `getShortcutRenderedElement`
`function` · Get a visual DOM element representing a keyboard shortcut.

**Parameters:**
* **`shortcut`** (`{*}`): The keyboard shortcut to render
* **`platform`** (`{*}` = `com.subnodal.subui.platforms:getPlatform()`): The platform to render the keys of

**Returns:** `Element` · The rendered element representing the keyboard shortcut

## ▶️ `loadList`
`function` · Load the list of keyboard shortcuts from local storage.

## ▶️ `removeDisplayNameForAction`
`function` · Remove the display name of an action, so that the action doesn't show in the keyboard shortcuts dialog.

**Parameters:**
* **`action`** (`String`): The action name to remove the display name of

## ▶️ `removeShortcut`
`function` · Remove the keyboard shortcut from an action.

**Parameters:**
* **`action`** (`String`): The action name to remove the shortcut of

## ▶️ `saveList`
`function` · Save the list of keyboard shortcuts to local storage.

## ▶️ `setDisplayNameForAction`
`function` · Set the display name for an action, to be shown in the keyboard shortcuts dialog.

**Parameters:**
* **`action`** (`String`): The action name to be referenced
* **`displayName`** (`String`): The display name to set

## ▶️ `shortcutsAreEquivalent`
`function` · Determine whether the given keyboard shortcuts are equivalent.

**Parameters:**
* **`a`** (`{*}`): The first keyboard shortcut object to test against
* **`b`** (`{*}`): The second keyboard shortcut object to test against

**Returns:** `Boolean` · Whether the keyboard shortcuts are equivalent