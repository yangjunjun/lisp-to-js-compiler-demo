import { describe, it, expect } from "vitest"
import { parser } from "../src"

describe("parser", () => {
    it("single function - number", () => {
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "add" },
            { type: "number", value: "2" },
            { type: "number", value: "3" },
            { type: "paren", value: ")" },
        ]
        const ast = {
            type: "Program",
            body: [
                {
                    type: "CallExpression",
                    name: "add",
                    params: [
                        {
                            type: "NumberLiteral",
                            value: "2",
                        },
                        {
                            type: "NumberLiteral",
                            value: "3",
                        },
                    ],
                },
            ],
        }
        expect(parser(tokens)).toStrictEqual(ast)
    })
    it("single function - string", () => {
        const tokens = [
            { type: "paren", value: "(" },
            { type: "name", value: "concat" },
            { type: "string", value: "foo" },
            { type: "string", value: "bar" },
            { type: "paren", value: ")" },
        ]
        const ast = {
            type: "Program",
            body: [
                {
                    type: "CallExpression",
                    name: "concat",
                    params: [
                        {
                            type: "StringLiteral",
                            value: "foo",
                        },
                        {
                            type: "StringLiteral",
                            value: "bar",
                        },
                    ],
                },
            ],
        }
        expect(parser(tokens)).toStrictEqual(ast)
    })
    it("nest function number & string", () => {
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
        const ast = {
            type: "Program",
            body: [
                {
                    type: "CallExpression",
                    name: "add",
                    params: [
                        {
                            type: "NumberLiteral",
                            value: "2",
                        },
                        {
                            type: "CallExpression",
                            name: "concat",
                            params: [
                                {
                                    type: "StringLiteral",
                                    value: "foo",
                                },
                                {
                                    type: "StringLiteral",
                                    value: "bar",
                                },
                            ],
                        },
                    ],
                },
            ],
        }
        expect(parser(tokens)).toStrictEqual(ast)
    })
})
