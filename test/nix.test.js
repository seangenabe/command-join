'use strict'

const join = require('..')
const expect = require('chai').expect
const exec = require('./exec')

describe('nix tests', function() {

  if (process.platform === 'win32') { return }

  const commands1 = ['a', 'b', 'c', 'd.txt']
  const commands2 = ["'a", "b'c", "d'"]

  it('should join normally', function() {
    expect(join(commands1)).to.equal('a b c d.txt')
  })

  it('should exec normally', function() {
    expect(exec(commands1)).to.equal(commands1.join('#'))
  })

  it('should escape single quotes', function() {
    expect(join(commands)).to.equal("\'a b'\''c d'\'")
  })

  it('should exec string with single quotes', function() {
    expect(exec(commands)).to.equal(commands2.join('#'))
  })

})
