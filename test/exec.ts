import join = require("../command-join")
import { execSync } from "child_process"

export function exec(args: string[]) {
  const args2 = [...args]
  args2.unshift(__filename)
  const joined = join(args2)
  const command = `node ${joined}`
  const out = execSync(command)
  // trim to remove extra \n appended by cmd
  return String(out).trim()
}

if (require.main === module) {
  process.stdout.write(process.argv.slice(2).join("\n"))
}
