const NEEDS_QUOTE = /[\s\\*\?\[\]`$()#<>|&;]/

export function joinNix(arr: readonly string[]) {
  const out: string[] = []
  for (const command of arr) {
    // if it is an empty string then append an empty string indicator
    if (command.length === 0) {
      out.push("''")
      continue
    }

    // whether we need a quote for the current block
    let needsQuote = false
    // collection of quoted strings and escaped single quotes
    const blocks: string[] = []
    // string collector
    let currentBlock: string[] = []
    const flushCurrentBlock = () => {
      // skip if we don't have anything collected as the current block
      if (!currentBlock.length) { return }
      if (needsQuote) {
        currentBlock.unshift("'")
        currentBlock.push("'")
      }
      blocks.push(currentBlock.join(''))
      currentBlock = []
    }
    for (const char of command) {
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
    const escapedCommand = blocks.join('')
    out.push(escapedCommand)
  }
  return out.join(' ')
}

export function joinWin(arr: readonly string[]) {
  const out: string[] = []

  for (const command of arr) {
    // if it is an empty string then append an empty string indicator
    if (command.length === 0) {
      out.push('""')
      continue
    }

    if (!/[\s\\"<>|&]/.test(command)) {
      out.push(command)
      continue
    }
    let backslashes = 0
    // start escape quote
    const outString: string[] = ["\""]
    const flushBackslashes = (n: number) => {
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
    let escapedCommand = outString.join('')
    // escape some special characters
    escapedCommand = escapedCommand.replace(/[&|<>;%^]/g, match => `^${match}`)
    out.push(escapedCommand)
  }

  return out.join(' ')
}

export function commandJoin(arg: string | readonly string[]): string {
  if (typeof arg === 'string') {
    arg = [arg] as readonly string[]
  }
  arg = Array.from(arg)
  if (process.platform === 'win32') {
    return joinWin(arg)
  }
  else {
    return joinNix(arg)
  }
}
