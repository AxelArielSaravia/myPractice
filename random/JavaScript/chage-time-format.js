/**
 * Given a time in 12-hour AM/PM format, convert to 24-hour format
 *
 *  
 * time format input:  2-bit hout : 2-bit mins : 2-bit sec period , like  00:00:00AM
 * 
 * Example:
 * s = "12:01:20PM"
 * return "12:01:20"
 * 
 * s = "12:01:20AM"
 * return "00:01:20"
 * 
 * s = "04:01:20PM"
 * return "16:01:20" 
 * 
 * s = "04:01:20AM"
 * return "04:01:20" 
 */


'use strict'

function timeConversion(s) {
    const period = s.substring(8);
    const time = s.substring(0,8).split(":");

    if (period === "PM" && time[0] !== "12") {
        time[0] = (+time[0] + 12) + ""
    } else if (period === "AM" && time[0] === "12") {
        time[0] = "00"
    }

    return time.join(":");
}

