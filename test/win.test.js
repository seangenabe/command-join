'use strict'

const join = require('..')
const expect = require('chai').expect
const exec = require('./exec')

describe('win32 tests', function() {

  if (process.platform !== 'win32') { return }

  const commands1 = ['a', 'b.txt', 'c/d', "'e'"]
  const commands2 = ['a\\b', 'a b', 'a\tb', 'a\\\\\\b', 'a"b"c"d"\\"\\']

  it('should join normally', function() {
    expect(join(commands1)).to.equal("a b.txt c/d 'e'")
  })

  it('should exec normally', function() {
    expect(exec(commands1)).to.equal(commands1.join('#'))
  })

  it('should exec to escape backslashes etc.', function() {
    expect(exec(commands2)).to.equal(commands2.join('#'))
  })

  it('should not escape win32 shell operators', function() {
    expect(join(['a', 'b', '&', '&&', '<', '>', '|', '||'])).to
      .equal('a b & && < > | ||')
  })
})
