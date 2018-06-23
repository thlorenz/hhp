'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../lib/holdem/ignition').create

test('\nIgnition summary: pot, board, winner not show, folder', function(t) {
  const lines = `
Total Pot(60)
Board [Js 8d Ah  ]
Seat+67: UTG+4 60 [Does not show]
Seat+10: UTG+5 Folded on the FLOP
`.split('\n')

  const parser = create([])
  lines.map((x, idx) => parser._readSummary(x, idx))
  spok(t, parser.hand.summary,
    [ { type: 'pot'
     , single: true
     , amount: 60
     , metadata: { lineno: 1, raw: 'Total Pot(60)' } }
    , { type: 'collected'
     , seatno: 67
     , player: 'UTG+4'
     , position: ''
     , amount: 60
     , metadata: { lineno: 3, raw: 'Seat+67: UTG+4 60 [Does not show]' } }
    , { type: 'folded'
     , seatno: 10
     , player: 'UTG+5'
     , position: ''
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 4, raw: 'Seat+10: UTG+5 Folded on the FLOP' } } ])

  spok(t, parser.hand.board,
    { card1: 'Js'
    , card2: '8d'
    , card3: 'Ah'
    , metadata: { lineno: 2, raw: 'Board [Js 8d Ah  ]' } })
  t.end()
})
