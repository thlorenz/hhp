const spok = require('spok')
const test = require('tape')
const create = require('../lib/holdem/ignition').create

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\nignition showdown: ', function(t) {
  const lines = `
Dealer : Showdown [4s 4d 2s 2h Ks] (Two pair)
Big Blind : Mucks [Qd 9s] (One pair)
Dealer : Hand Result 510
`.split('\n')

  const parser = create([])
  parser._sawShowdown = true
  lines.map((x, idx) => parser._readShowdown(x, idx))

  spok(t, parser.hand.showdown,
    [ { player: 'Dealer'
     , type: 'show'
     , metadata:
        { lineno: 1
        , raw: 'Dealer : Showdown [4s 4d 2s 2h Ks] (Two pair)' }
     , desc: 'two pair' }
    , { player: 'Big Blind'
     , type: 'muck'
     , metadata: { lineno: 2, raw: 'Big Blind : Mucks [Qd 9s] (One pair)' }
     , card1: 'Qd'
     , card2: '9s'
     , desc: 'one pair' }
    , { player: 'Dealer'
     , type: 'collect'
     , amount: 510
     , pot: null
     , metadata: { lineno: 3, raw: 'Dealer : Hand Result 510' } } ])

  t.end()
})
