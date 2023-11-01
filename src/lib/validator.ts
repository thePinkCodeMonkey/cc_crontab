// TODO: Validate # of inputs - very simple, just 5, separated by space
// TODO: Validate ranges, lists, string inputs and such, step values
// TODO: consider what errors to return

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

export function validateMinute(minStr: string): boolean {
    //NOTE: Valid values are: * - wild card, 0-59
    let minute = parseInt(minStr);
    if (minStr === "*") return true;
    if (isNaN(minute)) return false;
    if (minute < 0 || minute > 59) return false;
    return true;
}

function validateHour(hourStr: string): boolean {
    let hour = parseInt(hourStr);
    if (hourStr === "*") return true;
    if (isNaN(hour)) return false;
    if (hour < 0 || hour> 23) return false;
    return true;
}

function validateDay(dayStr: string): boolean {
    let day = parseInt(dayStr);
    if (dayStr === "*") return true;
    if (isNaN(day)) return false;
    if (day < 1 || day > 31) return false;
    return true;
}

function validateMonth(monthStr: string): boolean {
    let month = parseInt(monthStr);
    if (monthStr === "*") return true;
    if (isNaN(month)) return false;
    if (month < 1 || month > 12) return false;
    return true;
}

function validateWeek(weekStr: string): boolean {
    let week = parseInt(weekStr);
    if (weekStr === "*") return true;
    if (isNaN(week)) return false;
    if (week < 1 || week > 7) return false;
    return true;
}
export default function validateCronInput(str: string): boolean {

    let [minute, hour, day, month, week, ...others] = str.split(" ");

    //TODO:  do we just ignore the rest of the inputs?
    if (others.length > 0) {
        return false;
    }
    return validateMinute(minute) && validateHour(hour) && validateDay(day) && validateMonth(month) && validateWeek(week);
}