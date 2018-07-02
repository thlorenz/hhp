'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../../lib/holdem/pokerstars').create

test('\nshowdown: player finished ITM two players collect from pot', function(t) {
  const lines = `
KESHA04: shows [Kd Kc] (two pair, Kings and Nines)
young usama: shows [Qd Qc] (two pair, Queens and Nines)
KESHA04 collected 28466 from side pot
renniweg: shows [Ad Ah] (two pair, Aces and Nines)
renniweg collected 233328 from main pot
young usama finished the tournament in 124th place and received $12.51.
`.split('\n')

  const parser = create([])
  parser._sawShowdown = true
  lines.map((x, idx) => parser._readShowdown(x, idx))
  spok(t, parser.hand.showdown,
    [ { player: 'KESHA04'
     , type: 'show'
     , card1: 'Kd'
     , card2: 'Kc'
     , metadata:
        { lineno: 1
        , raw: 'KESHA04: shows [Kd Kc] (two pair, Kings and Nines)' }
     , desc: 'two pair, Kings and Nines' }
    , { player: 'young usama'
     , type: 'show'
     , card1: 'Qd'
     , card2: 'Qc'
     , metadata:
        { lineno: 2
        , raw: 'young usama: shows [Qd Qc] (two pair, Queens and Nines)' }
     , desc: 'two pair, Queens and Nines' }
    , { player: 'KESHA04'
     , type: 'collect'
     , amount: 28466
     , pot: 'side'
     , metadata: { lineno: 3, raw: 'KESHA04 collected 28466 from side pot' } }
    , { player: 'renniweg'
     , type: 'show'
     , card1: 'Ad'
     , card2: 'Ah'
     , metadata:
        { lineno: 4
        , raw: 'renniweg: shows [Ad Ah] (two pair, Aces and Nines)' }
     , desc: 'two pair, Aces and Nines' }
    , { player: 'renniweg'
     , type: 'collect'
     , amount: 233328
     , pot: 'main'
     , metadata: { lineno: 5, raw: 'renniweg collected 233328 from main pot' } }
    , { player: 'young usama'
     , type: 'finish'
     , place: 124
     , amount: 12.51
     , metadata:
        { lineno: 6
        , raw: 'young usama finished the tournament in 124th place and received $12.51.' } } ])
  t.end()
})
