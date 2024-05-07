const generator = (node) => {
    switch (node.type) {
        case "Program":
            return `${node.body.map(generator).join("\n")}`
        case "ExpressionStatement":
            return `${generator(node.expression)};`
        case "CallExpression":
            return `${node.callee.name}(${node.arguments.map(generator).join(", ")})`
        case "NumberLiteral":
            return node.value
        case "StringLiteral":
            return `"${node.value}"`
        default:
            throw new Error("unknow", node.type)
    }
}

export { generator }
