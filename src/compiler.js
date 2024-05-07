import { generator } from "./generator.js"
import { parser } from "./parser.js"
import { tokenizer } from "./tokenizer.js"
import { transformer } from "./transformer.js"

const compiler = (input) => {
    return generator(transformer(parser(tokenizer(input))))
}

export { compiler }
