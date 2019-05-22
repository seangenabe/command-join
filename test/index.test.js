"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_join_1 = __importDefault(require("../command-join"));
const exec_1 = require("./exec");
const t0_1 = require("t0");
const assert_1 = require("@improved/node/assert");
if (process.platform === 'win32') {
    const commands1 = ['a', 'b.txt', 'c/d', "'e'"];
    const commands2 = ['a\\b', 'a b', 'a\tb', 'a\\\\\\b', 'a"b"c"d"\\"\\',
        'a&<>|;', '%c%', '%D'];
    t0_1.test('should join normally', () => {
        assert_1.equal(command_join_1.default(commands1), "a b.txt c/d 'e'");
    });
    t0_1.test('should exec normally', () => {
        assert_1.equal(exec_1.exec(commands1), commands1.join('\n'));
    });
    t0_1.test('should exec to escape special characters', () => {
        assert_1.equal(exec_1.exec(commands2), commands2.join('\n'));
    });
}
else {
    const commands1 = ['a', 'b', 'c', 'd.txt'];
    const commands2 = ["'a", "b'c", "d\\e", "f\\\\''g", "h i", "' j '", "k?",
        "l[", "m]", "`n`", "$o", "$(p)", "#q", "r & s", "t < u", "v > w", "x'"];
    t0_1.test('should join normally', () => {
        assert_1.equal(command_join_1.default(commands1), 'a b c d.txt');
    });
    t0_1.test('should exec normally', () => {
        assert_1.equal(exec_1.exec(commands1), commands1.join('\n'));
    });
    t0_1.test('should exec string with single quotes', () => {
        assert_1.equal(exec_1.exec(commands2), commands2.join('\n'));
    });
}
t0_1.run();
//# sourceMappingURL=index.test.js.map