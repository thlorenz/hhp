const spok = require('spok')
const test = require('tape')
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'sng-split-pot.txt'), 'utf8')
const res = parse(txt)

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\nIgnition: sng bb and sb split pot, checking river collects', function(t) {
  spok(t, res.river,
    [ { player: 'Small Blind'
      , type: 'check'
      , metadata: { lineno: 41, raw: 'Small Blind : Checks' } }
    , { player: 'Big Blind'
      , type: 'check'
      , metadata: { lineno: 42, raw: 'Big Blind : Checks' } }
    , { player: 'Dealer'
      , type: 'check'
      , metadata: { lineno: 43, raw: 'Dealer : Checks' } }
    , { player: 'Small Blind :'
      , type: 'collect'
      , amount: 75
      , metadata: { lineno: 47, raw: 'Small Blind : Hand Result 75' } }
    , { player: 'Big Blind :'
      , type: 'collect'
      , amount: 75
      , metadata: { lineno: 48, raw: 'Big Blind : Hand Result 75' } } ])
  t.end()
})
