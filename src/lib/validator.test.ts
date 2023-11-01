import {validateMinute} from "./validator";

test("wild card in minute", () => {
    expect(validateMinute("*")).toBe(true);
})

test("non numberic input and not wild card in minute", () => {
    expect(validateMinute("notANumber")).toBe(false);
})

test("minute within range", () => {
    expect(validateMinute("0")).toBe(true);
    expect(validateMinute("15")).toBe(true);
    expect(validateMinute("59")).toBe(true);
})

test("minute out of range", () => {
    expect(validateMinute("-1")).toBe(false);
    expect(validateMinute("60")).toBe(false);
})