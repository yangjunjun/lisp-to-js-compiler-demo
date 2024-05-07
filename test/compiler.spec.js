import { describe, it, expect } from "vitest"
import { compiler } from "../src"

describe("compiler", () => {
    it("single function - number", () => {
        const input = "(add 2 3)"
        const output = "add(2, 3);"
        expect(compiler(input)).toStrictEqual(output)
    })
    it("single function - string - double quote", () => {
        const input = '(concat "foo" "bar" )'
        const output = 'concat("foo", "bar");'
        expect(compiler(input)).toStrictEqual(output)
    })
    it("nest function number & string", () => {
        const input = '(add 2 (concat "foo" "bar"))'
        const output = 'add(2, concat("foo", "bar"));'
        expect(compiler(input)).toStrictEqual(output)
    })
})
