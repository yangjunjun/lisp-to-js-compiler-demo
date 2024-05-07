import { describe, it, expect } from "vitest"
import { tokenizer } from "../src"

describe("tokenizer", () => {
    it("single function - number", () => {
        const input = "(add 2 3)"
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "add" },
            { type: "number", value: "2" },
            { type: "number", value: "3" },
            { type: "paren", value: ")" },
        ]
        expect(tokenizer(input)).toStrictEqual(tokens)
    })
    it("single function - string - double quote", () => {
        const input = '(concat "foo" "bar" )'
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "concat" },
            { type: "string", value: "foo" },
            { type: "string", value: "bar" },
            { type: "paren", value: ")" },
        ]
        expect(tokenizer(input)).toStrictEqual(tokens)
    })
    it("single function - string - single quote", () => {
        const input = "(concat 'foo' 'bar' )"
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "concat" },
            { type: "string", value: "foo" },
            { type: "string", value: "bar" },
            { type: "paren", value: ")" },
        ]
        expect(tokenizer(input)).toStrictEqual(tokens)
    })
    it("single function - string - single quote", () => {
        const input = "(concat `foo` `bar` )"
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "concat" },
            { type: "string", value: "foo" },
            { type: "string", value: "bar" },
            { type: "paren", value: ")" },
        ]
        expect(tokenizer(input)).toStrictEqual(tokens)
    })
    it("nest function", () => {
        const input = "(add 2 (subtract 4 2))"
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "add" },
            { type: "number", value: "2" },
            { type: "paren", value: "(" },
            { type: "name", value: "subtract" },
            { type: "number", value: "4" },
            { type: "number", value: "2" },
            { type: "paren", value: ")" },
            { type: "paren", value: ")" },
        ]
        expect(tokenizer(input)).toStrictEqual(tokens)
    })
    it("nest function number & string", () => {
        const input = '(add 2 (concat "foo" "bar"))'
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "add" },
            { type: "number", value: "2" },
            { type: "paren", value: "(" },
            { type: "name", value: "concat" },
            { type: "string", value: "foo" },
            { type: "string", value: "bar" },
            { type: "paren", value: ")" },
            { type: "paren", value: ")" },
        ]
        expect(tokenizer(input)).toStrictEqual(tokens)
    })
})
