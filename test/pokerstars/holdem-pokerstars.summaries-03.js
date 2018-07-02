'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../../lib/holdem/pokerstars').create

test('\nsummary: cash single pot with rake, won, lost, folded with and without bets, mucked and a full board', function(t) {
  const lines = `
Total pot $2.08 | Rake $0.09
Board [4s 6h 7s 3c Td]
Seat 1: renniweg (button) folded before Flop (didn't bet)
Seat 2: Luettefee (small blind) folded before Flop
Seat 3: Wrek86 (big blind) showed [Ah 7c] and lost with a pair of Sevens
Seat 4: racsou2012 folded before Flop (didn't bet)
Seat 5: foxen8 showed [Kc Ks] and won ($1.99) with a pair of Kings
Seat 6: AyJayJayyy folded on the Flop
`.split('\n')

  const parser = create([])
  lines.map((x, idx) => parser._readSummary(x, idx))

  spok(t, parser.hand.summary,
    [ { type: 'pot'
     , single: true
     , amount: 2.08
     , rake: 0.09
     , metadata: { lineno: 1, raw: 'Total pot $2.08 | Rake $0.09' } }
    , { type: 'folded'
     , seatno: 1
     , player: 'renniweg'
     , position: 'bu'
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 3
        , raw: 'Seat 1: renniweg (button) folded before Flop (didn\'t bet)' } }
    , { type: 'folded'
     , seatno: 2
     , player: 'Luettefee'
     , position: 'sb'
     , street: 'preflop'
     , bet: true
     , metadata:
        { lineno: 4
        , raw: 'Seat 2: Luettefee (small blind) folded before Flop' } }
    , { type: 'showed'
     , won: false
     , seatno: 3
     , player: 'Wrek86'
     , position: 'bb'
     , card1: 'Ah'
     , card2: '7c'
     , description: 'a pair of Sevens'
     , metadata:
        { lineno: 5
        , raw: 'Seat 3: Wrek86 (big blind) showed [Ah 7c] and lost with a pair of Sevens' } }
    , { type: 'folded'
     , seatno: 4
     , player: 'racsou2012'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 6
        , raw: 'Seat 4: racsou2012 folded before Flop (didn\'t bet)' } }
    , { type: 'showed'
     , won: true
     , seatno: 5
     , player: 'foxen8'
     , position: ''
     , card1: 'Kc'
     , card2: 'Ks'
     , amount: 1.99
     , description: 'a pair of Kings'
     , metadata:
        { lineno: 7
        , raw: 'Seat 5: foxen8 showed [Kc Ks] and won ($1.99) with a pair of Kings' } }
    , { type: 'folded'
     , seatno: 6
     , player: 'AyJayJayyy'
     , position: ''
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 8, raw: 'Seat 6: AyJayJayyy folded on the Flop' } } ])

  spok(t, parser.hand.board,
    { card1: '4s'
    , card2: '6h'
    , card3: '7s'
    , card4: '3c'
    , card5: 'Td'
    , metadata: { lineno: 2, raw: 'Board [4s 6h 7s 3c Td]' } })

  t.end()
})
