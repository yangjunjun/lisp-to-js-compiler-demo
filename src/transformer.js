const traverser = (ast, visitor) => {
    const traverserArray = (arr, parent) => {
        arr.forEach((node) => {
            traverserNode(node, parent)
        })
    }

    const traverserNode = (node, parent) => {
        const method = visitor[node.type]
        if (method && method.enter) {
            method.enter(node, parent)
        }
        if (node.type === "Program") {
            traverserArray(node.body, node)
        } else if (node.type === "CallExpression") {
            traverserArray(node.params, node)
        }
        if (method && method.exit) {
            method.exit(node, parent)
        }
    }
    traverserNode(ast, null)
}

const transformer = (ast) => {
    const newAst = {
        type: "Program",
        body: [],
    }
    ast._context = newAst.body
    traverser(ast, {
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: "NumberLiteral",
                    value: node.value,
                })
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: "StringLiteral",
                    value: node.value,
                })
            },
        },
        CallExpression: {
            enter(node, parent) {
                let newNode = {
                    type: "CallExpression",
                    callee: {
                        type: "Identifier",
                        name: node.name,
                    },
                    arguments: [],
                }
                node._context = newNode.arguments
                if (parent.type !== "CallExpression") {
                    newNode = {
                        type: "ExpressionStatement",
                        expression: newNode,
                    }
                }
                parent._context.push(newNode)
            },
        },
    })
    return newAst
}

export { transformer }
