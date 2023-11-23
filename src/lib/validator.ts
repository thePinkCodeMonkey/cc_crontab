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
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat"
];

function isWildCard(str: string): boolean {
    return str === "*";
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
    if (minStr == null) return false;
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
    if (hourStr == null) return false;
    if(hourStr.includes("-")) {
        let [start, end, ...rest] = hourStr.split("-");

        if (rest.length>0) return false;
        // start and end should have values and rest should not
        if (simpleValidation(start, [0,23]) && simpleValidation(end, [0,23])) {
            //check to see if the range are correct
            return(parseInt(start) < parseInt(end))
        }
        return false;
    }
    return(simpleValidation(hourStr,[0,23]));
}

function validateDay(dayStr: string): boolean {
    if(dayStr == null) return false;
    if(dayStr.includes("-")) {
        let [start, end, ...rest] = dayStr.split("-");

        if (rest.length>0) return false;
        // start and end should have values and rest should not
        if (simpleValidation(start, [0,31]) && simpleValidation(end, [0,31])) {
            //check to see if the range are correct
            return(parseInt(start) < parseInt(end))
        }
        return false;
    }
    return(simpleValidation(dayStr,[1,31]));
}

function validateMonth(monthStr: string): boolean {
    if(monthStr === undefined) return false;
    if(monthStr.includes("-")){
        let [start, end, ...rest] = monthStr.split("-");

        if (rest.length>0) return false;
        // convert month string into numbers
        // FIXME:  converting back and forth between integer for Month string is undesirable
        if(isNaN(parseInt(start))) {
            start =  (VALID_MONTH_STR.indexOf(start.toLowerCase())+1).toString();
        }
        if(isNaN(parseInt(end))) {
            end =  (VALID_MONTH_STR.indexOf(end.toLowerCase())+1).toString();
        }
        // start and end should have values and rest should not
        if (simpleValidation(start, [1,12]) && simpleValidation(end, [1,12])) {
            //check to see if the range are correct
            return(parseInt(start) < parseInt(end))
        }
        return false;
    }
    if(valideMonthStrValue(monthStr)) return true;
    return(simpleValidation(monthStr,[1,12]));
}

function validateWeek(weekStr: string): boolean {
    if(weekStr === undefined) return false;
    if(weekStr.includes("-")) {
        let [start, end, ...rest] = weekStr.split("-");

        if (rest.length>0) return false;
        // convert week string into numbers
        // FIXME:  converting back and forth between integer for week is undesirable
        if(isNaN(parseInt(start))) {
            start =  (VALID_WEEK_STR.indexOf(start.toLowerCase())).toString();
        }
        if(isNaN(parseInt(end))) {
            end =  (VALID_WEEK_STR.indexOf(end.toLowerCase())).toString();
        }
        // start and end should have values and rest should not
        if (simpleValidation(start, [0,6]) && simpleValidation(end, [0,6])) {
            //check to see if the range are correct
            return(parseInt(start) < parseInt(end))
        }
        return false;
    }
    if(valideWeekStrValue(weekStr)) return true;
    return(simpleValidation(weekStr,[0,7]));
}

function valideMonthStrValue(monthStr: string): boolean {
    return (VALID_MONTH_STR.includes(monthStr.toLowerCase()));
}

function valideWeekStrValue(weekStr: string): boolean {
    return (VALID_WEEK_STR.includes(weekStr.toLowerCase()));
}

export default function validateCronInput(str: string): boolean {

    let [minute, hour, day, month, week, ...others] = str.trim().split(" ");

    if (others.length > 0) {
        return false;
    }
    return validateMinute(minute) && validateHour(hour) && validateDay(day) && validateMonth(month) && validateWeek(week);
}