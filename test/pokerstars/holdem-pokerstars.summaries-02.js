'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../../lib/holdem/pokerstars').create

test('\nsummary: single pot with showed won, folded with and without bets, mucked and a flop', function(t) {
  const lines = `
Total pot 217 | Rake 0
Board [4d 7c Jh]
Seat 1: [GPH]Philipp folded on the Flop
Seat 2: bittenks folded before Flop (didn't bet)
Seat 3: wellfrederic (button) folded before Flop (didn't bet)
Seat 4: Andrey HV (small blind) folded before Flop
Seat 5: Patoo25 (big blind) showed [8s Jc] and won (217) with two pair, Jacks and Sevens
Seat 6: MARINHO-IGT folded before Flop (didn't bet)
Seat 7: renniweg folded before Flop (didn't bet)
Seat 8: komar7777 mucked [Ah 4s]
Seat 9: DyoReis folded before Flop (didn't bet)
`.split('\n')

  const parser = create([])
  lines.map((x, idx) => parser._readSummary(x, idx))

  spok(t, parser.hand.summary,
    [ { type: 'pot'
     , single: true
     , amount: 217
     , rake: 0
     , metadata: { lineno: 1, raw: 'Total pot 217 | Rake 0' } }
    , { type: 'folded'
     , seatno: 1
     , player: '[GPH]Philipp'
     , position: ''
     , street: 'flop'
     , bet: true
     , metadata: { lineno: 3, raw: 'Seat 1: [GPH]Philipp folded on the Flop' } }
    , { type: 'folded'
     , seatno: 2
     , player: 'bittenks'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 4
        , raw: 'Seat 2: bittenks folded before Flop (didn\'t bet)' } }
    , { type: 'folded'
     , seatno: 3
     , player: 'wellfrederic'
     , position: 'bu'
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 5
        , raw: 'Seat 3: wellfrederic (button) folded before Flop (didn\'t bet)' } }
    , { type: 'folded'
     , seatno: 4
     , player: 'Andrey HV'
     , position: 'sb'
     , street: 'preflop'
     , bet: true
     , metadata:
        { lineno: 6
        , raw: 'Seat 4: Andrey HV (small blind) folded before Flop' } }
    , { type: 'showed'
     , won: true
     , seatno: 5
     , player: 'Patoo25'
     , position: 'bb'
     , card1: '8s'
     , card2: 'Jc'
     , amount: 217
     , description: 'two pair, Jacks and Sevens'
     , metadata:
        { lineno: 7
        , raw: 'Seat 5: Patoo25 (big blind) showed [8s Jc] and won (217) with two pair, Jacks and Sevens' } }
    , { type: 'folded'
     , seatno: 6
     , player: 'MARINHO-IGT'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 8
        , raw: 'Seat 6: MARINHO-IGT folded before Flop (didn\'t bet)' } }
    , { type: 'folded'
     , seatno: 7
     , player: 'renniweg'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 9
        , raw: 'Seat 7: renniweg folded before Flop (didn\'t bet)' } }
    , { type: 'muck'
     , seatno: 8
     , player: 'komar7777'
     , position: ''
     , card1: 'Ah'
     , card2: '4s'
     , metadata: { lineno: 10, raw: 'Seat 8: komar7777 mucked [Ah 4s]' } }
    , { type: 'folded'
     , seatno: 9
     , player: 'DyoReis'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 11
        , raw: 'Seat 9: DyoReis folded before Flop (didn\'t bet)' } } ])

  spok(t, parser.hand.board,
    { card1: '4d'
    , card2: '7c'
    , card3: 'Jh'
    , metadata: { lineno: 2, raw: 'Board [4d 7c Jh]' } })
  t.end()
})
