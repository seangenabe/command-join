# command-join

[![Greenkeeper badge](https://badges.greenkeeper.io/seangenabe/command-join.svg)](https://greenkeeper.io/)

Escape command-line arguments, cross-platform.

[![npm](https://img.shields.io/npm/v/command-join.svg?style=flat-square)](https://www.npmjs.com/package/command-join)
[![Travis Build Status](https://img.shields.io/travis/seangenabe/command-join/master.svg?label=travis&style=flat-square)](https://travis-ci.org/seangenabe/command-join)
[![AppVeyor Build Status](https://img.shields.io/appveyor/ci/seangenabe/command-join.svg?label=appveyor&style=flat-square)](https://ci.appveyor.com/project/seangenabe/command-join)
[![devDependency Status](https://img.shields.io/david/dev/seangenabe/command-join.svg?style=flat-square)](https://david-dm.org/seangenabe/command-join#info=devDependencies)
[![node](https://img.shields.io/node/v/command-join.svg?style=flat-square)](https://nodejs.org/en/download/)

## Usage

```javascript
const commandJoin = require('command-join')
```

### `commandJoin(arg: Array|String): String`

Escapes each command-line argument and joins them into a string that can then be executed, e.g. via `child_process.exec`.

If a string is passed, an array containing the string will instead be processed.

**Example**

```javascript
let command = commandJoin(['a', "b\\", "'c"])
command
// output on Windows: a "b\\" 'c
// output on Linux: a 'b\' \'c
```

See the tests for more convoluted examples.

## License

MIT
