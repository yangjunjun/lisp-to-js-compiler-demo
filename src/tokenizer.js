const tokenizer = (input) => {
    const tokens = []
    let index = 0
    while (index < input.length) {
        let char = input[index]
        if (char === "(" || char === ")") {
            tokens.push({
                type: "paren",
                value: char,
            })
            index++
            continue
        }
        const STRING_REGEXP = /[a-z]/i
        if (STRING_REGEXP.test(char)) {
            let tempTokenString = ""
            while (STRING_REGEXP.test(char)) {
                tempTokenString += char
                char = input[++index]
            }
            tokens.push({
                type: "name",
                value: tempTokenString,
            })
            continue
        }

        const WHITESPACE_REGEXP = /\s/
        if (WHITESPACE_REGEXP.test(char)) {
            index++
            continue
        }

        const NUMBER_REGEXP = /\d/
        if (NUMBER_REGEXP.test(char)) {
            let tempTokenString = ""
            while (NUMBER_REGEXP.test(char)) {
                tempTokenString += char
                char = input[++index]
            }
            tokens.push({
                type: "number",
                value: tempTokenString,
            })
            continue
        }

        // string token
        const STRING_QUOTE_REGEXP = /"|'|`/
        let matchResult = null
        if ((matchResult = char.match(STRING_QUOTE_REGEXP))) {
            char = input[++index]
            let tempTokenString = ""
            while (char !== matchResult[0]) {
                tempTokenString += char
                char = input[++index]
            }
            tokens.push({
                type: "string",
                value: tempTokenString,
            })
            index++
            continue
        }
        throw new TypeError("unknow char", char)
    }
    return tokens
}

export { tokenizer }
