'use strict'

const join = require('..')
const ChildProcess = require('child_process')

if (require.main === module) {
  console.log(process.argv.slice(2).join('\n'))
}
else {
  module.exports = function exec(args) {
    args = args.slice()
    args.unshift(__filename)
    let joined = join(args)
    let command = `node ${joined}`
    let out = ChildProcess.execSync(command)
    // trim to remove extra \n appended by cmd
    return String(out).trim()
  }
}
