/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

// @namespace com.subnodal.subui.hapticfeedback
namespace("com.subnodal.subui.hapticfeedback", function(exports) {
    /*
        @name vibrationFeedbackTimings
        @type var <{[Number]}>
        Specifies the vibration timing pattern to use for each action. The
        pattern should be formatted as an `Array` such that the 2nth term index
        value is a vibration duration time (including the first item in the
        `Array`), and the (2n+1)th term index is a rest duration time (the time
        to wait in-between each vibration). All times are in milliseconds.
    */
    /*
        @name vibrationFeedbackTimings.alert
        @type var <[Number]>
        Used for alerting the user to an issue with a simple vibration.
    */
    /*
        @name vibrationFeedbackTimings.select
        @type var <[Number]>
        Used to provide feedback that an item has been selected. This vibration
        is usually played when the user holds their finger on an item.
    */
    /*
        @name vibrationFeedbackTimings.notify
        @type var <[Number]>
        Used to notify the user, in a familiar two-vibration notification
        pattern.
    */
    exports.vibrationFeedbackTimings = {
        alert: [500],
        select: [50],
        notify: [100, 100, 100]
    };

    /*
        @name setVibrationFeedbackTiming
        Sets the vibration timing pattern for a specified existent or
        nonexistent action.
        @param action <String> The action to set the pattern of.
        @param pattern <[Number]> The pattern to use for vibration/rest times, in milliseconds.
    */
    exports.setVibrationFeedbackTiming = function(action, pattern) {
        exports.vibrationFeedbackTimings[action] = pattern;
    };

    /*
        @name vibrate
        Vibrate according to a specified pattern.
        @param pattern <[Number] = vibrationFeedbackTimings.alert> The pattern to use for vibration/rest times, in milliseconds.
    */
    exports.vibrate = function(pattern = exports.vibrationFeedbackTimings.alert) {
        if (!("vibrate" in navigator)) {
            return;
        }

        navigator.vibrate(pattern);
    };
});
// @endnamespace