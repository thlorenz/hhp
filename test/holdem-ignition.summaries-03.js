'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../lib/holdem/ignition').create

test('\nIgnition summary: pot, board, winner, folder, looser, muck', function(t) {
  const lines = `
Total Pot(200)
Board [As 4c 2d 8c 7c]
Seat+67: UTG+3 200  with One pair [2s Th-2s 2d As Th 8c]
Seat+35: Dealer Folded on the FLOP
Seat+6: Small Blind lose with High Card [Ks 3c-As Ks 8c 7c 4c]
Seat+38: Big Blind [Mucked] [Qs Js ]
`.split('\n')

  const parser = create([])
  lines.map((x, idx) => parser._readSummary(x, idx))

  spok(t, parser.hand.summary,
    [ { type: 'pot'
     , single: true
     , amount: 200
     , metadata: { lineno: 1, raw: 'Total Pot(200)' } }
    , { type: 'showed'
     , won: true
     , seatno: 67
     , player: 'UTG+3'
     , position: ''
     , card1: '2s'
     , card2: 'Th'
     , amount: 200
     , description: 'One pair'
     , metadata:
        { lineno: 3
        , raw: 'Seat+67: UTG+3 200  with One pair [2s Th-2s 2d As Th 8c]' } }
    , { type: 'folded'
     , seatno: 35
     , player: 'Dealer'
     , position: 'bu'
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 4, raw: 'Seat+35: Dealer Folded on the FLOP' } }
    , { type: 'showed'
     , won: false
     , seatno: 6
     , player: 'Small Blind'
     , position: 'sb'
     , card1: 'Ks'
     , card2: '3c'
     , description: 'High Card'
     , metadata:
        { lineno: 5
        , raw: 'Seat+6: Small Blind lose with High Card [Ks 3c-As Ks 8c 7c 4c]' } }
    , { type: 'muck'
     , seatno: 38
     , player: 'Big Blind'
     , position: 'bb'
     , card1: 'Qs'
     , card2: 'Js'
     , metadata: { lineno: 6, raw: 'Seat+38: Big Blind [Mucked] [Qs Js ]' } } ])

  spok(t, parser.hand.board,
    { card1: 'As'
    , card2: '4c'
    , card3: '2d'
    , card4: '8c'
    , card5: '7c'
    , metadata: { lineno: 2, raw: 'Board [As 4c 2d 8c 7c]' } })
  t.end()
})
