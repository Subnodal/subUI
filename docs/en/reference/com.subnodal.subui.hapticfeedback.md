# com.subnodal.subui.hapticfeedback
## ▶️ `setVibrationFeedbackTiming`
`function` · Sets the vibration timing pattern for a specified existent or nonexistent action.

**Parameters:**
* **`action`** (`String`): The action to set the pattern of.
* **`pattern`** (`[Number]`): The pattern to use for vibration/rest times, in milliseconds.

## ▶️ `vibrate`
`function` · Vibrate according to a specified pattern.

**Parameters:**
* **`pattern`** (`[Number]` = `vibrationFeedbackTimings.alert`): The pattern to use for vibration/rest times, in milliseconds.

## 🔠️ `vibrationFeedbackTimings`
`var <{[Number]}>` · Specifies the vibration timing pattern to use for each action. The pattern should be formatted as an `Array` such that the 2nth term index value is a vibration duration time (including the first item in the `Array`), and the (2n+1)th term index is a rest duration time (the time to wait in-between each vibration). All times are in milliseconds.

## 🔠️ `vibrationFeedbackTimings.alert`
`var <[Number]>` · Used for alerting the user to an issue with a simple vibration.

## 🔠️ `vibrationFeedbackTimings.notify`
`var <[Number]>` · Used to notify the user, in a familiar two-vibration notification pattern.

## 🔠️ `vibrationFeedbackTimings.select`
`var <[Number]>` · Used to provide feedback that an item has been selected. This vibration is usually played when the user holds their finger on an item.