'use strict'

const join = require('../')
const expect = require('chai').expect
const exec = require('./exec')

describe('win32 tests', function() {

  if (process.platform !== 'win32') { return }

  const commands1 = ['a', 'b.txt', 'c/d', "'e'"]
  const commands2 = ['a\\b', 'a b', 'a\tb', 'a\\\\\\b', 'a"b"c"d"\\"\\',
    'a&<>|;', '%c%', '%D']

  it('should join normally', function() {
    expect(join(commands1)).to.equal("a b.txt c/d 'e'")
  })

  if (typeof exec === 'function') {
    it('should exec normally', function() {
        expect(exec(commands1)).to.equal(commands1.join('\n'))
    })

    it('should exec to escape special characters', function() {
        expect(exec(commands2)).to.equal(commands2.join('\n'))
    })
  }

})
