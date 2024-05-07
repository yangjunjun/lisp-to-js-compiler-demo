import { describe, it, expect } from "vitest"
import { transformer } from "../src"

describe("transformer", () => {
    it("single function - number", () => {
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
        expect(transformer(ast)).toStrictEqual(newAst)
    })
    it("single function - string", () => {
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
        expect(transformer(ast)).toStrictEqual(newAst)
    })
    it("nest function number & string", () => {
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
        expect(transformer(ast)).toStrictEqual(newAst)
    })
})
