'use strict'

const NEEDS_QUOTE = /[\s\\*\?\[\]`$()#]/

function joinNix(arr) {
  let out = []
  for (let command of arr) {
    // whether we need a quote for the current block
    let needsQuote = false
    // collection of quoted strings and escaped single quotes
    let blocks = []
    // string collector
    let currentBlock = []
    let flushCurrentBlock = () => {
      // skip if we don't have anything collected as the current block
      if (!currentBlock.length) { return }
      if (needsQuote) {
        currentBlock.unshift("'")
        currentBlock.push("'")
      }
      blocks.push(currentBlock.join(''))
      currentBlock = []
    }
    for (let char of command) {
      if (char === "'") { // if single quote
        // flush the current block
        flushCurrentBlock()
        // escape a single quote
        blocks.push("\\'")
        continue
      }
      if (NEEDS_QUOTE.test(char)) {
        needsQuote = true
      }
      currentBlock.push(char)
    }
    // flush last block
    flushCurrentBlock()
    let escapedCommand = blocks.join('')
    out.push(escapedCommand)
  }
  return out.join(' ')
}

function joinWin(arr) {
  let out = []

  for (let command of arr) {
    if (!/[\s\\"]/.test(command)) {
      out.push(command)
      continue
    }
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
