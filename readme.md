# command-join

Escape command-line arguments, cross-platform.

## Usage

```javascript
const commandJoin = require('command-join')
```

### `commandJoin(arg: Array|String): String`

Escapes each command-line argument and joins them into a string that can then be executed, e.g. via `child_process.exec`.

If a string is passed, an array containing the string will instead be processed.

```javascript
let x = commandJoin('a', "b\\", "'c")
x // Windows: a b\ c'   *nix: a b\ '\''c
```

## License

MIT
