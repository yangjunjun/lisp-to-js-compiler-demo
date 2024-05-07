# lisp to js compiler demo

an exercise to [https://github.com/jamiebuilds/the-super-tiny-compiler](the-super-tiny-compiler.js)

## usage

convert lisp to js

```js
import { compiler } from "./src"
const input = '(add 2 (concat "foo" "bar"))'
const output = compiler(input)
// output = 'add(2, concat("foo", "bar"));'
```
