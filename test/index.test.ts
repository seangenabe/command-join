import join from '../command-join'
import {exec} from './exec'
import { test, run } from "t0"
import { equal } from "@improved/node/assert"

if (process.platform === 'win32') {

  const commands1 = ['a', 'b.txt', 'c/d', "'e'"]
  const commands2 = ['a\\b', 'a b', 'a\tb', 'a\\\\\\b', 'a"b"c"d"\\"\\',
    'a&<>|;', '%c%', '%D']

  test('should join normally', () => {
    equal(join(commands1), "a b.txt c/d 'e'")
  })

  test('should exec normally', () => {
    equal(exec(commands1), commands1.join('\n'))
  })

  test('should exec to escape special characters', () => {
    equal(exec(commands2), commands2.join('\n'))
  })

}
else {

  const commands1 = ['a', 'b', 'c', 'd.txt']
  const commands2 = ["'a", "b'c", "d\\e", "f\\\\''g", "h i", "' j '", "k?",
      "l[", "m]", "`n`", "$o", "$(p)", "#q", "r & s", "t < u", "v > w", "x'"]

  test('should join normally', () => {
    equal(join(commands1), 'a b c d.txt')
  })

  test('should exec normally', () => {
    equal(exec(commands1), commands1.join('\n'))
  })

  test('should exec string with single quotes', () => {
    equal(exec(commands2), commands2.join('\n'))
  })

}

run()
