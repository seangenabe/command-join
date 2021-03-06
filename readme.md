# command-join

Escape command-line arguments, cross-platform.

[![npm](https://img.shields.io/npm/v/command-join.svg?style=flat-square)](https://www.npmjs.com/package/command-join)
[![Build Status](https://img.shields.io/travis/seangenabe/command-join/master.svg?style=flat-square)](https://travis-ci.org/seangenabe/command-join)
[![devDependency Status](https://img.shields.io/david/dev/seangenabe/command-join.svg?style=flat-square)](https://david-dm.org/seangenabe/command-join#info=devDependencies)
[![node](https://img.shields.io/node/v/command-join.svg?style=flat-square)](https://nodejs.org/en/download/)

If you like this package, be sure to star its repo, and please consider [donating](https://seangenabe.netlify.com/donate).

## Usage

```typescript
import { commandJoin } from "command-join"
```

### `commandJoin(arg: string | string[]): string`

Escapes each command-line argument and joins them into a string that can then be executed, e.g. via `child_process.exec`.

If a string is passed, an array containing the string will instead be processed.

**Example**

```javascript
const command = commandJoin(['a', "b\\", "'c"])
command
// output on Windows: a "b\\" 'c
// output on Linux: a 'b\' \'c
```

See the tests for more convoluted examples.

## Migrating

**Migrating to v3**:
```diff
- const commandJoin = require("command-join")
+ const { commandJoin } = require("command-join")
```
