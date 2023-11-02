// TODO: Validate # of inputs - very simple, just 5, separated by space
// TODO: Validate ranges, lists, string inputs and such, step values
// TODO: consider what errors to return

import { isMinusToken } from "typescript";

const VALID_MONTH_STR = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];

const VALID_WEEK_STR = [
    "mon",
    "tue",
    "wed",
    "thur",
    "fri",
    "sat",
    "sun"
];

/* 
    Validates a cron component substring for
    1. Valid range - true
    2. Wild card - true
    3. Non numberic false
*/
function simpleValidation(str: string, range: [number, number]): boolean {

    if(str === "*") return true;
    const numbericValue = parseInt(str);
    if(isNaN(numbericValue)) return false;
    return (numbericValue >= range[0] && numbericValue <= range[1] )
}

export function validateMinute(minStr: string): boolean {
    //NOTE: Valid values are: * - wild card, 0-59
    return(simpleValidation(minStr,[0,59]));
}

function validateHour(hourStr: string): boolean {
    return(simpleValidation(hourStr,[0,23]));
}

function validateDay(dayStr: string): boolean {
    return(simpleValidation(dayStr,[1,31]));
}

function validateMonth(monthStr: string): boolean {
    return(simpleValidation(monthStr,[1,12]));
}

function validateWeek(weekStr: string): boolean {
    return(simpleValidation(weekStr,[0,7]));
}
export default function validateCronInput(str: string): boolean {

    let [minute, hour, day, month, week, ...others] = str.trim().split(" ");

    //TODO:  do we just ignore the rest of the inputs?
    if (others.length > 0) {
        return false;
    }
    return validateMinute(minute) && validateHour(hour) && validateDay(day) && validateMonth(month) && validateWeek(week);
}