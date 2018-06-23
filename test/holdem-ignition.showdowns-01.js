'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../lib/holdem/ignition').create

test('\nignition showdown: show cards and player finished', function(t) {
  const lines = `
Dealer : Showdown [Ah Ac Js Jh Qs] (Two pair)
UTG : Showdown [Ah Ac Kd Jh 6h] (One pair)
Dealer : Hand Result 30246
UTG : Ranking 54
UTG : Prize Cash [$11.07]
UTG : Stand
`.split('\n')

  const parser = create([])
  parser._sawShowdown = true
  parser.hand.info = {}
  lines.map((x, idx) => parser._readShowdown(x, idx))

  spok(t, parser.hand.showdown,
    [ { player: 'Dealer'
     , type: 'show'
     , metadata:
        { lineno: 1
        , raw: 'Dealer : Showdown [Ah Ac Js Jh Qs] (Two pair)' }
     , desc: 'two pair' }
    , { player: 'UTG'
     , type: 'show'
     , metadata: { lineno: 2, raw: 'UTG : Showdown [Ah Ac Kd Jh 6h] (One pair)' }
     , desc: 'one pair' }
    , { player: 'Dealer'
     , type: 'collect'
     , amount: 30246
     , pot: null
     , metadata: { lineno: 3, raw: 'Dealer : Hand Result 30246' } }
    , { player: 'UTG'
     , type: 'finish'
     , place: 54
     , metadata:
        { lineno: 4
        , raw: 'UTG : Ranking 54\nUTG : Prize Cash [$11.07]' }
     , amount: 11.07 } ])

  t.equal(parser.hand.info.currency, '$', 'adds currency to info')
  t.end()
})
