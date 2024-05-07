import { describe, it, expect } from "vitest"
import { generator } from "../src"

describe("generator", () => {
    it("single function - number", () => {
        const newAst = {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "add",
                        },
                        arguments: [
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
                },
            ],
        }
        expect(generator(newAst)).toStrictEqual("add(2, 3);")
    })
    it("single function - string", () => {
        const newAst = {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "concat",
                        },
                        arguments: [
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
                },
            ],
        }
        expect(generator(newAst)).toStrictEqual('concat("foo", "bar");')
    })
    it("nest function number & string", () => {
        const newAst = {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "add",
                        },
                        arguments: [
                            {
                                type: "NumberLiteral",
                                value: "2",
                            },
                            {
                                type: "CallExpression",
                                callee: {
                                    type: "Identifier",
                                    name: "concat",
                                },
                                arguments: [
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
                },
            ],
        }
        expect(generator(newAst)).toStrictEqual('add(2, concat("foo", "bar"));')
    })
})
