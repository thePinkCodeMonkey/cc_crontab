import validateCronInput from "./validator";

test("Incomplete inputs", () => {
    expect(validateCronInput("")).toBe(false);
    expect(validateCronInput("* ")).toBe(false);
    expect(validateCronInput("* *")).toBe(false);
    expect(validateCronInput("* * *")).toBe(false);
    expect(validateCronInput("* * * *")).toBe(false);
})

test("numeric range without list", () => {
    expect(validateCronInput("0-2 1 2 3 4 5")).toBe(false);
})

test("More than 5 inputs for cron tab should return false", () => {
    expect(validateCronInput("0 1 2 3 4 5")).toBe(false);
} )

test("5 cron components with no trailing space should return true", () => {
    expect(validateCronInput("0 1 2 3 4")).toBe(true);
} )

test("5 cron components with trailing space should return true", () => {
    expect(validateCronInput("0 1 2 3 4 ")).toBe(true);
} )

test("Wild card in minute", () => {
    expect(validateCronInput("* 1 2 3 4")).toBe(true);
})

test("Non numberic input and not wild card in minute cron component", () => {
    expect(validateCronInput("notANumber 1 2 3 4")).toBe(false);
})

test("Minute component within range", () => {
    expect(validateCronInput("0 2 3 4 5")).toBe(true);
    expect(validateCronInput("15 2 3 4 5")).toBe(true);
    expect(validateCronInput("59 2 3 4 5")).toBe(true);
})

test("Minute out of range", () => {
    expect(validateCronInput("-1 2 3 4")).toBe(false);
    expect(validateCronInput("60 2 3 4")).toBe(false);
})

test("Wild card in hour", () => {
    expect(validateCronInput("0 * 2 3 4")).toBe(true);
})

test("Non numberic input and not wild card in hour cron component", () => {
    expect(validateCronInput("1 notANumber 2 3 4")).toBe(false);
})

test("Hour component within range", () => {
    expect(validateCronInput("1 0 3 4 5")).toBe(true);
    expect(validateCronInput("1 12 3 4 5")).toBe(true);
    expect(validateCronInput("1 23 3 4 5")).toBe(true);
})

test("Hour component out of range", () => {
    expect(validateCronInput("1 -1 3 4 5")).toBe(false);
    expect(validateCronInput("1 24 3 4 5")).toBe(false);
})

test("Wild card and non numeric input in day", () => {
    expect(validateCronInput("0 1 * 2 3")).toBe(true);
    expect(validateCronInput("1 2 notANumber 3 4")).toBe(false);
})

test("Day component within range", () => {
    expect(validateCronInput("1 1 1 4 5")).toBe(true);
    expect(validateCronInput("1 1 15 3 4")).toBe(true);
    expect(validateCronInput("1 1 31 4 5")).toBe(true);
})

test("Day component out of range", () => {
    expect(validateCronInput("* * 0 * *")).toBe(false);
    expect(validateCronInput("* * 32 * *")).toBe(false);
})

test("Wild card and non numeric input in month", () => {
    expect(validateCronInput("* * * * *")).toBe(true);
    expect(validateCronInput("* * * notANumber *")).toBe(false);
})

test("Month component within range", () => {
    expect(validateCronInput("1 1 1 1 *")).toBe(true);
    expect(validateCronInput("1 1 1 6 *")).toBe(true);
    expect(validateCronInput("1 1 1 12 *")).toBe(true);
})

test("Month component out of range", () => {
    expect(validateCronInput("* * * 0 *")).toBe(false);
    expect(validateCronInput("* * * 13 *")).toBe(false);
})

test("Valid month string input", () => {
    expect(validateCronInput("* * * jan *")).toBe(true);
    expect(validateCronInput("* * * Feb *")).toBe(true);
    expect(validateCronInput("* * * Mar *")).toBe(true);
    expect(validateCronInput("* * * apr *")).toBe(true);
    expect(validateCronInput("* * * may *")).toBe(true);
    expect(validateCronInput("* * * JUN *")).toBe(true);
    expect(validateCronInput("* * * aug *")).toBe(true);
    expect(validateCronInput("* * * seP *")).toBe(true);
    expect(validateCronInput("* * * Oct *")).toBe(true);
    expect(validateCronInput("* * * Nov *")).toBe(true);
    expect(validateCronInput("* * * dec *")).toBe(true);
})

test("Wild card and non numeric input in week", () => {
    expect(validateCronInput("* * * * *")).toBe(true);
    expect(validateCronInput("* * * * notANumber")).toBe(false);
})

test("Week component within range", () => {
    expect(validateCronInput("1 1 1 1 0")).toBe(true);
    expect(validateCronInput("1 1 1 6 4")).toBe(true);
    expect(validateCronInput("1 1 1 12 7")).toBe(true);
})

test("Week component out of range", () => {
    expect(validateCronInput("* * * * -1")).toBe(false);
    expect(validateCronInput("* * * * 8")).toBe(false);
})

test("Valid week string input", () => {
    expect(validateCronInput("* * * * mon")).toBe(true);
    expect(validateCronInput("* * * * MoN")).toBe(true);
    expect(validateCronInput("* * * * tue")).toBe(true);
    expect(validateCronInput("* * * * wed")).toBe(true);
    expect(validateCronInput("* * * * Thu")).toBe(true);
    expect(validateCronInput("* * * * Fri")).toBe(true);
    expect(validateCronInput("* * * * sat")).toBe(true);
    expect(validateCronInput("* * * * sun")).toBe(true);
})