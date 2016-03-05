/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const stringUtil = require('./lib/util/string')

const holdem_ps = require('./lib/holdem/pokerstars')

function getLines (txt) {
  const trimmed = txt.split('\n').map(stringUtil.trimLine)
  while (trimmed[0] && !trimmed[0].length) trimmed.shift()
  return trimmed
}

module.exports = function parse (txt) {
  const lines = getLines(txt)
  if (holdem_ps.canParse(lines)) return holdem_ps.parse(lines)
}

// Test

function inspect (obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

if (!module.parent && typeof window === 'undefined') {
  // const name = 'allin-preflop'
  const name = 'actiononall'
  const fs = require('fs')
  const path = require('path')
  const fixtures = path.join(__dirname, 'test', 'fixtures', 'holdem')
  const hha_fixtures = path.join(__dirname, '..', 'hha', 'test', 'fixtures', 'holdem')
  const txt = fs.readFileSync(path.join(fixtures, 'pokerstars', name + '.txt'), 'utf8')

  const res = module.exports(txt)
  inspect(res)
  fs.writeFileSync(path.join(hha_fixtures, name + '.json'),
                   JSON.stringify(res, null, 2),
                   'utf8')
}
