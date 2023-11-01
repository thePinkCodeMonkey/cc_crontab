// TODO: Validate # of inputs - very simple, just 5, separated by space
// TODO: Validate ranges, lists, string inputs and such, step values
// TODO: consider what errors to return

function validateMinute(minStr: string): Boolean {
    //NOTE: Valid values are: * - wild card
    // 0-59
    let minute = parseInt(minStr);
    if (minute == Number.NaN && minStr !== "*") return false;
    if (minute < 0 || minute > 59) return false;
    return true;
}

export default function validateCronInput(str: string): Boolean {

    let [minute, hour, day, month, week, ...others] = str.split("");

    //TODO:  do we just ignore the rest of the inputs?
    if (others.length > 0) {
        return false;
    }
    return true;
}