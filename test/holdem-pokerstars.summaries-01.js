'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../lib/holdem/pokerstars').create

test('\nPokerStars summary: single pot with showed won,lost, folded with and without bets, and a full board', function(t) {
  const lines = `
Total pot 3111 | Rake 0
Board [Jc Ks 6c 7c 4h]
Seat 1: don.bimbo666 (button) showed [Qc Ac] and won (3111) with a flush, Ace high
Seat 2: Timbo2611 (small blind) folded before Flop
Seat 3: gghhrr (big blind) folded before Flop
Seat 4: filipakee folded before Flop (didn't bet)
Seat 5: Carecanmt folded before Flop (didn't bet)
Seat 6: tixon_pazya folded before Flop (didn't bet)
Seat 7: escalantefre showed [Kh Ah] and lost with a pair of Kings
Seat 8: held folded before Flop
Seat 9: tetewse folded before Flop (didn't bet)
`.split('\n')

  const parser = create([])
  lines.map((x, idx) => parser._readSummary(x, idx))

  spok(t, parser.hand.summary,
    [ { type: 'pot'
     , single: true
     , amount: 3111
     , rake: 0
     , metadata: { lineno: 1, raw: 'Total pot 3111 | Rake 0' } }
    , { type: 'showed'
     , won: true
     , seatno: 1
     , player: 'don.bimbo666'
     , position: 'bu'
     , card1: 'Qc'
     , card2: 'Ac'
     , amount: 3111
     , description: 'a flush, Ace high'
     , metadata:
        { lineno: 3
        , raw: 'Seat 1: don.bimbo666 (button) showed [Qc Ac] and won (3111) with a flush, Ace high' } }
    , { type: 'folded'
     , seatno: 2
     , player: 'Timbo2611'
     , position: 'sb'
     , street: 'preflop'
     , bet: true
     , metadata:
        { lineno: 4
        , raw: 'Seat 2: Timbo2611 (small blind) folded before Flop' } }
    , { type: 'folded'
     , seatno: 3
     , player: 'gghhrr'
     , position: 'bb'
     , street: 'preflop'
     , bet: true
     , metadata:
        { lineno: 5
        , raw: 'Seat 3: gghhrr (big blind) folded before Flop' } }
    , { type: 'folded'
     , seatno: 4
     , player: 'filipakee'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 6
        , raw: 'Seat 4: filipakee folded before Flop (didn\'t bet)' } }
    , { type: 'folded'
     , seatno: 5
     , player: 'Carecanmt'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 7
        , raw: 'Seat 5: Carecanmt folded before Flop (didn\'t bet)' } }
    , { type: 'folded'
     , seatno: 6
     , player: 'tixon_pazya'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 8
        , raw: 'Seat 6: tixon_pazya folded before Flop (didn\'t bet)' } }
    , { type: 'showed'
     , won: false
     , seatno: 7
     , player: 'escalantefre'
     , position: ''
     , card1: 'Kh'
     , card2: 'Ah'
     , description: 'a pair of Kings'
     , metadata:
        { lineno: 9
        , raw: 'Seat 7: escalantefre showed [Kh Ah] and lost with a pair of Kings' } }
    , { type: 'folded'
     , seatno: 8
     , player: 'held'
     , position: ''
     , street: 'preflop'
     , bet: true
     , metadata: { lineno: 10, raw: 'Seat 8: held folded before Flop' } }
    , { type: 'folded'
     , seatno: 9
     , player: 'tetewse'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 11
        , raw: 'Seat 9: tetewse folded before Flop (didn\'t bet)' } } ])

  spok(t, parser.hand.board,
    { card1: 'Jc'
    , card2: 'Ks'
    , card3: '6c'
    , card4: '7c'
    , card5: '4h'
    , metadata: { lineno: 2, raw: 'Board [Jc Ks 6c 7c 4h]' } })
  t.end()
})
