"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join = require("../command-join");
const child_process_1 = require("child_process");
function exec(args) {
    const args2 = [...args];
    args2.unshift(__filename);
    const joined = join(args2);
    const command = `node ${joined}`;
    const out = child_process_1.execSync(command);
    // trim to remove extra \n appended by cmd
    return String(out).trim();
}
exports.exec = exec;
if (require.main === module) {
    process.stdout.write(process.argv.slice(2).join("\n"));
}
//# sourceMappingURL=exec.js.map