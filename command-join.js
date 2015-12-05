'use strict'

function joinNix(arr) {
  let out = []
  for (let command of arr) {
    if (/[^A-Za-z0-9_\/:=-]/.test(command)) {
      // escape command in single quotes
      // use sequence '\'' to:
      //   end current string,
      //   specify a single quote literal,
      //   and start a new string
      command = "'" + command.replace(/'/g, "'\\''") + "'"
      // remove empty quotes
      command = command.replace(/^(?:'')+/g, '')
      command = command.replace(/\\'''/g, "\\'")
    }
  }
  return out.join(' ')
}

function joinWin(arr) {
  let out = []

  for (let command of arr) {
    if (/[\s\\"]/.test(command)) {
      let backslashes = 0
      let c
      // start escape quote
      let outString = ["\""]
      let flushBackslashes = (n) => {
        outString.push("\\".repeat(n * backslashes))
        backslashes = 0
      }
      for (let char of command) {
        // if char is a backslash
        if (char === "\\") {
          // enqueue backslash
          backslashes++
        }
        // if char is a double quote
        else if (char === "\"") {
          // doubly end backslash sequence if any
          flushBackslashes(2)
          // push string \" to escape quote
          outString.push("\\\"")
        }
        else {
          // singly end backslash sequence if any
          flushBackslashes(1)
          outString.push(char)
        }
      }
      // flush any remaining backslashes
      flushBackslashes(2)
      // end escape quote
      outString.push("\"")
      out.push(outString.join(''))
    }
    else {
      out.push(command)
    }
  }

  return out.join(' ')
}

function commandJoin(arg) {
  if (typeof arg === 'string') {
    arg = [arg]
  }
  arg = Array.from(arg)
  if (process.platform === 'win32') {
    return joinWin(arg)
  }
  else {
    return joinNix(arg)
  }
}

module.exports = commandJoin
