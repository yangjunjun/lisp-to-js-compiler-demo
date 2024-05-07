const parser = (tokens) => {
    const ast = {
        type: "Program",
        body: [],
    }
    let index = 0
    const walk = () => {
        let token = tokens[index]
        if (token.type === "paren" && token.value === "(") {
            token = tokens[++index]
            const node = {
                type: "CallExpression",
                name: token.value,
                params: [],
            }
            token = tokens[++index]
            while (
                token.type !== "paren" ||
                (token.type === "paren" && token.value !== ")")
            ) {
                node.params.push(walk())
                token = tokens[++index]
            }
            return node
        } else if (token.type === "number") {
            return {
                type: "NumberLiteral",
                value: token.value,
            }
        } else if (token.type === "string") {
            return {
                type: "StringLiteral",
                value: token.value,
            }
        }
    }
    ast.body.push(walk())
    return ast
}

export { parser }
