'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../lib/holdem/ignition').create

test('\nIgnition summary: pot, board, winner, folders, one muck', function(t) {
  const lines = `
Total Pot(510)
Board [2h 9d 3c Ks 4d]
Seat+67: Dealer 510  with Two pair [2s 4s-4s 4d 2s 2h Ks]
Seat+10: Small Blind Folded on the FLOP
Seat+65: Big Blind [Mucked] [Qd 9s ]
Seat+35: UTG Folded on the FLOP
Seat+6: UTG+1 Folded on the FLOP
`.split('\n')

  const parser = create([])
  lines.map((x, idx) => parser._readSummary(x, idx))

  spok(t, parser.hand.summary,
    [ { type: 'pot'
     , single: true
     , amount: 510
     , metadata: { lineno: 1, raw: 'Total Pot(510)' } }
    , { type: 'showed'
     , won: true
     , seatno: 67
     , player: 'Dealer'
     , position: 'bu'
     , card1: '2s'
     , card2: '4s'
     , amount: 510
     , description: 'Two pair'
     , metadata:
        { lineno: 3
        , raw: 'Seat+67: Dealer 510  with Two pair [2s 4s-4s 4d 2s 2h Ks]' } }
    , { type: 'folded'
     , seatno: 10
     , player: 'Small Blind'
     , position: 'sb'
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 4, raw: 'Seat+10: Small Blind Folded on the FLOP' } }
    , { type: 'muck'
     , seatno: 65
     , player: 'Big Blind'
     , position: 'bb'
     , card1: 'Qd'
     , card2: '9s'
     , metadata: { lineno: 5, raw: 'Seat+65: Big Blind [Mucked] [Qd 9s ]' } }
    , { type: 'folded'
     , seatno: 35
     , player: 'UTG'
     , position: ''
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 6, raw: 'Seat+35: UTG Folded on the FLOP' } }
    , { type: 'folded'
     , seatno: 6
     , player: 'UTG+1'
     , position: ''
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 7, raw: 'Seat+6: UTG+1 Folded on the FLOP' } } ])

  spok(t, parser.hand.board,
    { card1: '2h'
    , card2: '9d'
    , card3: '3c'
    , card4: 'Ks'
    , card5: '4d'
    , metadata: { lineno: 2, raw: 'Board [2h 9d 3c Ks 4d]' } })
  t.end()
})
