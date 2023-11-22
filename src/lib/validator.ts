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
    "thu",
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

function isWildCard(str: string): boolean {
    return str === "*";
}
/* checks for patter number-number */
function isNumberRange(str: string): boolean {
    return(!!str.match(/\d{1,}-\d{1,}/)) 

}

function isMonthRange(str: string): boolean {
    const [lower, upper] = str.split("-");
    if (lower === undefined || upper === undefined) return false;
    //TODO convert month str into number if not a number
    return false;
}
function simpleValidation(str: string, range: [number, number]): boolean {

    if(str === "*") return true;
    const numbericValue = parseInt(str);
    if(isNaN(numbericValue)) return false;
    return (numbericValue >= range[0] && numbericValue <= range[1] )
}

export function validateMinute(minStr: string): boolean {
    //if minute string has a range
    if(minStr.includes("-")) {
        let [start, end, ...rest] = minStr.split("-");

        if (rest.length>0) return false;
        // start and end should have values and rest should not
        if (simpleValidation(start, [0,59]) && simpleValidation(end, [0,59])) {
            //check to see if the range are correct
            return(parseInt(start) < parseInt(end))
        }
        return false;
    }
    return(simpleValidation(minStr,[0,59]));
}

function validateHour(hourStr: string): boolean {
    return(simpleValidation(hourStr,[0,23]));
}

function validateDay(dayStr: string): boolean {
    return(simpleValidation(dayStr,[1,31]));
}

function validateMonth(monthStr: string): boolean {
    if(monthStr === undefined) return false;
    if(valideMonthStrValue(monthStr)) return true;
    return(simpleValidation(monthStr,[1,12]));
}

function validateWeek(weekStr: string): boolean {
    if(weekStr === undefined) return false;
    if(valideWeekStrValue(weekStr)) return true;
    return(simpleValidation(weekStr,[0,7]));
}

function valideMonthStrValue(monthStr: string): boolean {
    return (VALID_MONTH_STR.includes(monthStr.toLowerCase()));
}

function valideWeekStrValue(weekStr: string): boolean {
    return (VALID_WEEK_STR.includes(weekStr.toLowerCase()));
}

//TODO: edge case, range mixing numeric and week/month str
function validateNumbericRangeStr(rangeStr: string, lowerBound?: number, upperBound?: number): boolean {
    //input contains a single "-"
    //split it into two
    const [lower, upper] = rangeStr.split("-");
    if (parseInt(upper)- parseInt(lower) < 0) return false;
    lowerBound = lowerBound || parseInt(lower);
    upperBound = upperBound || parseInt(upper);
    return (parseInt(upper) <= upperBound && parseInt(lower) >= lowerBound);
}

export default function validateCronInput(str: string): boolean {

    let [minute, hour, day, month, week, ...others] = str.trim().split(" ");

    if (others.length > 0) {
        return false;
    }
    return validateMinute(minute) && validateHour(hour) && validateDay(day) && validateMonth(month) && validateWeek(week);
}