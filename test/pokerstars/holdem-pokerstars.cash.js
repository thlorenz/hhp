'use strict'

const test = require('tape')
const spok = require('spok')
const { parseHand } = require('../../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, '..', 'fixtures')
/* eslint-disable camelcase */
const holdem_ps = path.join(fixtures, 'holdem', 'pokerstars')

test('\nHoldem.PokerStars: Zoom Cash from 2017', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'cash.zoom.2017.txt'), 'utf8')
  const res = parseHand(txt)

  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'Mr.BinAlik'
        , chips: 0.96
        , metadata: { lineno: 2, raw: 'Seat 1: Mr.BinAlik ($0.96 in chips)' } }
      , { seatno: 2
        , player: 'B0GEYMAN'
        , chips: 23.69
        , metadata: { lineno: 3, raw: 'Seat 2: B0GEYMAN ($23.69 in chips)' } }
      , { seatno: 3
        , player: 'held'
        , chips: 5
        , metadata: { lineno: 4, raw: 'Seat 3: held ($5 in chips)' } }
      , { seatno: 4
        , player: 'pfckfdcrbq'
        , chips: 10
        , metadata: { lineno: 5, raw: 'Seat 4: pfckfdcrbq ($10 in chips)' } }
      , { seatno: 5
        , player: 'Lobster01RUS'
        , chips: 5
        , metadata: { lineno: 6, raw: 'Seat 5: Lobster01RUS ($5 in chips)' } }
      , { seatno: 6
        , player: 'moreno627'
        , chips: 9.61
        , metadata: { lineno: 7, raw: 'Seat 6: moreno627 ($9.61 in chips)' } } ]
    , posts:
      [ { player: 'B0GEYMAN'
        , type: 'sb'
        , amount: 0.02
        , metadata: { lineno: 8, raw: 'B0GEYMAN: posts small blind $0.02' } }
      , { player: 'held'
        , type: 'bb'
        , amount: 0.05
        , metadata: { lineno: 9, raw: 'held: posts big blind $0.05' } } ]
    , preflop:
      [ { player: 'pfckfdcrbq'
        , type: 'fold'
        , metadata: { lineno: 12, raw: 'pfckfdcrbq: folds' } }
      , { player: 'Lobster01RUS'
        , type: 'fold'
        , metadata: { lineno: 13, raw: 'Lobster01RUS: folds' } }
      , { player: 'moreno627'
        , type: 'raise'
        , amount: 0.05
        , raiseTo: 0.1
        , metadata: { lineno: 14, raw: 'moreno627: raises $0.05 to $0.10' } }
      , { player: 'Mr.BinAlik'
        , type: 'call'
        , amount: 0.1
        , metadata: { lineno: 15, raw: 'Mr.BinAlik: calls $0.10' } }
      , { player: 'B0GEYMAN'
        , type: 'fold'
        , metadata: { lineno: 16, raw: 'B0GEYMAN: folds' } }
      , { player: 'held'
        , type: 'call'
        , amount: 0.05
        , metadata: { lineno: 17, raw: 'held: calls $0.05' } } ]
    , flop:
      [ { player: 'held'
        , type: 'check'
        , metadata: { lineno: 19, raw: 'held: checks' } }
      , { player: 'moreno627'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'moreno627: checks' } }
      , { player: 'Mr.BinAlik'
        , type: 'check'
        , metadata: { lineno: 21, raw: 'Mr.BinAlik: checks' } } ]
    , turn:
      [ { player: 'held'
        , type: 'check'
        , metadata: { lineno: 23, raw: 'held: checks' } }
      , { player: 'moreno627'
        , type: 'check'
        , metadata: { lineno: 24, raw: 'moreno627: checks' } }
      , { player: 'Mr.BinAlik'
        , type: 'check'
        , metadata: { lineno: 25, raw: 'Mr.BinAlik: checks' } } ]
    , river:
      [ { player: 'held'
        , type: 'bet'
        , amount: 0.15
        , metadata: { lineno: 27, raw: 'held: bets $0.15' } }
      , { player: 'moreno627'
        , type: 'fold'
        , metadata: { lineno: 28, raw: 'moreno627: folds' } }
      , { player: 'Mr.BinAlik'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'Mr.BinAlik: folds' } }
      , { player: 'held'
        , type: 'bet-returned'
        , amount: 0.15
        , metadata: { lineno: 30, raw: 'Uncalled bet ($0.15) returned to held' } }
      , { player: 'held'
        , type: 'collect'
        , amount: 0.31
        , metadata: { lineno: 31, raw: 'held collected $0.31 from pot' } } ]
    , showdown: []
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 0.32
        , rake: 0.01
        , metadata: { lineno: 34, raw: 'Total pot $0.32 | Rake $0.01' } }
      , { type: 'folded'
        , seatno: 1
        , player: 'Mr.BinAlik'
        , position: 'bu'
        , street: 'river'
        , bet: true
        , metadata:
           { lineno: 36
           , raw: 'Seat 1: Mr.BinAlik (button) folded on the River' } }
      , { type: 'folded'
        , seatno: 2
        , player: 'B0GEYMAN'
        , position: 'sb'
        , street: 'preflop'
        , bet: true
        , metadata:
           { lineno: 37
           , raw: 'Seat 2: B0GEYMAN (small blind) folded before Flop' } }
      , { type: 'collected'
        , seatno: 3
        , player: 'held'
        , position: 'bb'
        , amount: 0.31
        , metadata:
           { lineno: 38
           , raw: 'Seat 3: held (big blind) collected ($0.31)' } }
      , { type: 'folded'
        , seatno: 4
        , player: 'pfckfdcrbq'
        , position: ''
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 39
           , raw: 'Seat 4: pfckfdcrbq folded before Flop (didn\'t bet)' } }
      , { type: 'folded'
        , seatno: 5
        , player: 'Lobster01RUS'
        , position: ''
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 40
           , raw: 'Seat 5: Lobster01RUS folded before Flop (didn\'t bet)' } }
      , { type: 'folded'
        , seatno: 6
        , player: 'moreno627'
        , position: ''
        , street: 'river'
        , bet: true
        , metadata: { lineno: 41, raw: 'Seat 6: moreno627 folded on the River' } } ]
    , info:
      { room: 'pokerstars'
      , handid: '164150709626'
      , currency: '$'
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , sb: 0.02
      , bb: 0.05
      , year: 2017
      , month: 1
      , day: 6
      , hour: 17
      , min: 15
      , sec: 11
      , timezone: 'ET'
      , gametype: 'cashgame'
      , metadata:
         { lineno: 0
         , raw: 'PokerStars Zoom Hand #164150709626:  Hold\'em No Limit ($0.02/$0.05) - 2017/01/06 17:15:11 ET' } }
    , table:
      { tableno: 'Donati'
      , maxseats: 6
      , button: 1
      , metadata:
         { lineno: 1
         , raw: 'Table \'Donati\' 6-max Seat #1 is the button' } }
    , hero: 'held'
    , holecards:
      { card1: 'Ac'
      , card2: '4h'
      , metadata: { lineno: 11, raw: 'Dealt to held [Ac 4h]' } }
    , board:
      { card1: '6c'
      , card2: 'Jd'
      , card3: '6d'
      , card4: '2h'
      , card5: '5d'
      , metadata: { lineno: 35, raw: 'Board [6c Jd 6d 2h 5d]' } } })

  t.end()
})

test('\nHoldem.PokerStars: Cash from 2010', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'cash.2010.txt'), 'utf8')
  const res = parseHand(txt)

  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'I.C.U-2-Win'
        , chips: 16.65
        , metadata: { lineno: 2, raw: 'Seat 1: I.C.U-2-Win ($16.65 in chips)' } }
      , { seatno: 2
        , player: 'Kozlicek_x'
        , chips: 9.85
        , metadata: { lineno: 3, raw: 'Seat 2: Kozlicek_x ($9.85 in chips)' } }
      , { seatno: 3
        , player: 'held'
        , chips: 11.3
        , metadata: { lineno: 4, raw: 'Seat 3: held ($11.30 in chips)' } }
      , { seatno: 4
        , player: 'stefanengel'
        , chips: 2
        , metadata: { lineno: 5, raw: 'Seat 4: stefanengel ($2 in chips)' } }
      , { seatno: 5
        , player: 'glaine 59'
        , chips: 0.75
        , metadata: { lineno: 6, raw: 'Seat 5: glaine 59 ($0.75 in chips)' } }
      , { seatno: 6
        , player: 'AIG 2U'
        , chips: 15.2
        , metadata: { lineno: 7, raw: 'Seat 6: AIG 2U ($15.20 in chips)' } } ]
    , posts:
      [ { player: 'held'
        , type: 'sb'
        , amount: 0.05
        , metadata: { lineno: 8, raw: 'held: posts small blind $0.05' } }
      , { player: 'stefanengel'
        , type: 'bb'
        , amount: 0.1
        , metadata: { lineno: 9, raw: 'stefanengel: posts big blind $0.10' } } ]
    , preflop:
      [ { player: 'glaine 59'
        , type: 'call'
        , amount: 0.1
        , metadata: { lineno: 12, raw: 'glaine 59: calls $0.10' } }
      , { player: 'AIG 2U'
        , type: 'fold'
        , metadata: { lineno: 13, raw: 'AIG 2U: folds' } }
      , { player: 'I.C.U-2-Win'
        , type: 'raise'
        , amount: 0.3
        , raiseTo: 0.4
        , metadata: { lineno: 14, raw: 'I.C.U-2-Win: raises $0.30 to $0.40' } }
      , { player: 'Kozlicek_x'
        , type: 'fold'
        , metadata: { lineno: 15, raw: 'Kozlicek_x: folds' } }
      , { player: 'held'
        , type: 'fold'
        , metadata: { lineno: 16, raw: 'held: folds' } }
      , { player: 'stefanengel'
        , type: 'call'
        , amount: 0.3
        , metadata: { lineno: 17, raw: 'stefanengel: calls $0.30' } }
      , { player: 'glaine 59'
        , type: 'call'
        , amount: 0.3
        , metadata: { lineno: 18, raw: 'glaine 59: calls $0.30' } } ]
    , flop:
      [ { player: 'stefanengel'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'stefanengel: checks' } }
      , { player: 'glaine 59'
        , type: 'bet'
        , amount: 0.1
        , metadata: { lineno: 21, raw: 'glaine 59: bets $0.10' } }
      , { player: 'I.C.U-2-Win'
        , type: 'call'
        , amount: 0.1
        , metadata: { lineno: 22, raw: 'I.C.U-2-Win: calls $0.10' } }
      , { player: 'stefanengel'
        , type: 'raise'
        , amount: 1.3
        , raiseTo: 1.4
        , metadata: { lineno: 23, raw: 'stefanengel: raises $1.30 to $1.40' } }
      , { player: 'glaine 59'
        , type: 'call'
        , amount: 0.25
        , allin: true
        , metadata: { lineno: 24, raw: 'glaine 59: calls $0.25 and is all-in' } }
      , { player: 'I.C.U-2-Win'
        , type: 'fold'
        , metadata: { lineno: 25, raw: 'I.C.U-2-Win: folds' } }
      , { player: 'stefanengel'
        , type: 'bet-returned'
        , amount: 1.05
        , metadata:
           { lineno: 26
           , raw: 'Uncalled bet ($1.05) returned to stefanengel' } } ]
    , turn: []
    , river: []
    , showdown:
      [ { player: 'stefanengel'
        , type: 'show'
        , card1: 'Ac'
        , card2: '9d'
        , metadata:
           { lineno: 30
           , raw: 'stefanengel: shows [Ac 9d] (three of a kind, Nines)' }
        , desc: 'three of a kind, Nines' }
      , { player: 'glaine 59'
        , type: 'muck'
        , metadata: { lineno: 31, raw: 'glaine 59: mucks hand' } }
      , { player: 'stefanengel'
        , type: 'collect'
        , amount: 1.95
        , metadata: { lineno: 32, raw: 'stefanengel collected $1.95 from pot' } } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 2.05
        , rake: 0.1
        , metadata: { lineno: 34, raw: 'Total pot $2.05 | Rake $0.10' } }
      , { type: 'folded'
        , seatno: 1
        , player: 'I.C.U-2-Win'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 36, raw: 'Seat 1: I.C.U-2-Win folded on the Flop' } }
      , { type: 'folded'
        , seatno: 2
        , player: 'Kozlicek_x'
        , position: 'bu'
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 37
           , raw: 'Seat 2: Kozlicek_x (button) folded before Flop (didn\'t bet)' } }
      , { type: 'folded'
        , seatno: 3
        , player: 'held'
        , position: 'sb'
        , street: 'preflop'
        , bet: true
        , metadata:
           { lineno: 38
           , raw: 'Seat 3: held (small blind) folded before Flop' } }
      , { type: 'showed'
        , won: true
        , seatno: 4
        , player: 'stefanengel'
        , position: 'bb'
        , card1: 'Ac'
        , card2: '9d'
        , amount: 1.95
        , description: 'three of a kind, Nines'
        , metadata:
           { lineno: 39
           , raw: 'Seat 4: stefanengel (big blind) showed [Ac 9d] and won ($1.95) with three of a kind, Nines' } }
      , { type: 'muck'
        , seatno: 5
        , player: 'glaine 59'
        , position: ''
        , card1: 'Th'
        , card2: '8h'
        , metadata: { lineno: 40, raw: 'Seat 5: glaine 59 mucked [Th 8h]' } }
      , { type: 'folded'
        , seatno: 6
        , player: 'AIG 2U'
        , position: ''
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 41
           , raw: 'Seat 6: AIG 2U folded before Flop (didn\'t bet)' } } ]
    , info:
      { room: 'pokerstars'
      , handid: '41784027206'
      , currency: '$'
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , sb: 0.05
      , bb: 0.1
      , year: 2010
      , month: 3
      , day: 27
      , hour: 11
      , min: 32
      , sec: 24
      , timezone: 'ET'
      , gametype: 'cashgame'
      , metadata:
         { lineno: 0
         , raw: 'PokerStars Game #41784027206:  Hold\'em No Limit ($0.05/$0.10 USD) - 2010/03/27 11:32:24 ET' } }
    , table:
      { tableno: 'Eunike II'
      , maxseats: 6
      , button: 2
      , metadata:
         { lineno: 1
         , raw: 'Table \'Eunike II\' 6-max Seat #2 is the button' } }
    , hero: 'held'
    , holecards:
      { card1: 'Ad'
      , card2: '7d'
      , metadata: { lineno: 11, raw: 'Dealt to held [Ad 7d]' } }
    , board:
      { card1: '4d'
      , card2: '9h'
      , card3: '9s'
      , card4: 'Qc'
      , card5: '2d'
      , metadata: { lineno: 35, raw: 'Board [4d 9h 9s Qc 2d]' } } })

  t.end()
})

test('\nHoldem.PokerStars: cash mucked cards', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'cash.zoom.2017.muck-cards.txt'), 'utf8')
  const res = parseHand(txt)

  spok(t, res.summary,
    [ { type: 'pot'
     , single: true
     , amount: 0.37
     , rake: 0.02
     , metadata: { lineno: 32, raw: 'Total pot $0.37 | Rake $0.02' } }
    , { type: 'muck'
     , seatno: 1
     , player: 'MATH CULTURE'
     , position: 'bu'
     , card1: '3d'
     , card2: '3c'
     , metadata:
        { lineno: 34
        , raw: 'Seat 1: MATH CULTURE (button) mucked [3d 3c]' } }
    , { type: 'folded'
     , seatno: 2
     , player: 'szatan88'
     , position: 'sb'
     , street: 'preflop'
     , bet: true
     , metadata:
        { lineno: 35
        , raw: 'Seat 2: szatan88 (small blind) folded before Flop' } }
    , { type: 'folded'
     , seatno: 3
     , player: 'held'
     , position: 'bb'
     , street: 'preflop'
     , bet: true
     , metadata:
        { lineno: 36
        , raw: 'Seat 3: held (big blind) folded before Flop' } }
    , { type: 'showed'
     , won: true
     , seatno: 4
     , player: 'pabliq9'
     , position: ''
     , card1: '4c'
     , card2: '4d'
     , amount: 0.35
     , description: 'two pair, Queens and Fours'
     , metadata:
        { lineno: 37
        , raw: 'Seat 4: pabliq9 showed [4c 4d] and won ($0.35) with two pair, Queens and Fours' } }
    , { type: 'folded'
     , seatno: 5
     , player: 'SpicedGoldie'
     , position: ''
     , street: 'preflop'
     , bet: false
     , metadata:
        { lineno: 38
        , raw: 'Seat 5: SpicedGoldie folded before Flop (didn\'t bet)' } } ])
  t.end()
})

test('\nHoldem.PokerStars: playernames have parentheses', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'cash.zoom.2017.parens-in-playername.txt'), 'utf8')
  const res = parseHand(txt)

  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'wwjorge'
        , chips: 3.15
        , metadata: { lineno: 2, raw: 'Seat 1: wwjorge ($3.15 in chips)' } }
      , { seatno: 2
        , player: 'Roni (LBK)'
        , chips: 2.23
        , metadata: { lineno: 3, raw: 'Seat 2: Roni (LBK) ($2.23 in chips)' } }
      , { seatno: 3
        , player: 'MerVit (Added Parens)'
        , chips: 5.24
        , metadata:
           { lineno: 4
           , raw: 'Seat 3: MerVit (Added Parens) ($5.24 in chips)' } }
      , { seatno: 4
        , player: 'drakfiskaren'
        , chips: 5
        , metadata: { lineno: 5, raw: 'Seat 4: drakfiskaren ($5 in chips)' } }
      , { seatno: 5
        , player: 'JohnnyVHS'
        , chips: 6.05
        , metadata: { lineno: 6, raw: 'Seat 5: JohnnyVHS ($6.05 in chips)' } }
      , { seatno: 6
        , player: 'held'
        , chips: 9.92
        , metadata: { lineno: 7, raw: 'Seat 6: held ($9.92 in chips)' } } ]
    , posts:
      [ { player: 'Roni (LBK)'
        , type: 'sb'
        , amount: 0.02
        , metadata: { lineno: 8, raw: 'Roni (LBK): posts small blind $0.02' } }
      , { player: 'MerVit (Added Parens)'
        , type: 'bb'
        , amount: 0.05
        , metadata:
           { lineno: 9
           , raw: 'MerVit (Added Parens): posts big blind $0.05' } } ]
    , preflop:
      [ { player: 'drakfiskaren'
        , type: 'fold'
        , metadata: { lineno: 12, raw: 'drakfiskaren: folds' } }
      , { player: 'JohnnyVHS'
        , type: 'fold'
        , metadata: { lineno: 13, raw: 'JohnnyVHS: folds' } }
      , { player: 'held'
        , type: 'fold'
        , metadata: { lineno: 14, raw: 'held: folds' } }
      , { player: 'wwjorge'
        , type: 'fold'
        , metadata: { lineno: 16, raw: 'wwjorge: folds' } }
      , { player: 'Roni (LBK)'
        , type: 'raise'
        , amount: 0.1
        , raiseTo: 0.15
        , metadata: { lineno: 17, raw: 'Roni (LBK): raises $0.10 to $0.15' } }
      , { player: 'MerVit (Added Parens)'
        , type: 'call'
        , amount: 0.1
        , metadata: { lineno: 18, raw: 'MerVit (Added Parens): calls $0.10' } } ]
    , flop:
      [ { player: 'Roni (LBK)'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'Roni (LBK): checks' } }
      , { player: 'MerVit (Added Parens)'
        , type: 'check'
        , metadata: { lineno: 21, raw: 'MerVit (Added Parens): checks' } } ]
    , turn:
      [ { player: 'Roni (LBK)'
        , type: 'check'
        , metadata: { lineno: 23, raw: 'Roni (LBK): checks' } }
      , { player: 'MerVit (Added Parens)'
        , type: 'check'
        , metadata: { lineno: 24, raw: 'MerVit (Added Parens): checks' } } ]
    , river:
      [ { player: 'Roni (LBK)'
        , type: 'check'
        , metadata: { lineno: 26, raw: 'Roni (LBK): checks' } }
      , { player: 'MerVit (Added Parens)'
        , type: 'check'
        , metadata: { lineno: 27, raw: 'MerVit (Added Parens): checks' } } ]
    , showdown:
      [ { player: 'Roni (LBK)'
        , type: 'show'
        , card1: 'Kd'
        , card2: 'Ac'
        , metadata:
           { lineno: 29
           , raw: 'Roni (LBK): shows [Kd Ac] (a pair of Queens)' }
        , desc: 'a pair of Queens' }
      , { player: 'MerVit (Added Parens)'
        , type: 'muck'
        , metadata: { lineno: 30, raw: 'MerVit (Added Parens): mucks hand' } }
      , { player: 'Roni (LBK)'
        , type: 'collect'
        , amount: 0.29
        , metadata: { lineno: 31, raw: 'Roni (LBK) collected $0.29 from pot' } } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 0.3
        , rake: 0.01
        , metadata: { lineno: 33, raw: 'Total pot $0.30 | Rake $0.01' } }
      , { type: 'folded'
        , seatno: 1
        , player: 'wwjorge'
        , position: 'bu'
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 35
           , raw: 'Seat 1: wwjorge (button) folded before Flop (didn\'t bet)' } }
      , { type: 'showed'
        , won: true
        , seatno: 2
        , player: 'Roni (LBK)'
        , position: 'sb'
        , card1: 'Kd'
        , card2: 'Ac'
        , amount: 0.29
        , description: 'a pair of Queens'
        , metadata:
           { lineno: 36
           , raw: 'Seat 2: Roni (LBK) (small blind) showed [Kd Ac] and won ($0.29) with a pair of Queens' } }
      , { type: 'muck'
        , seatno: 3
        , player: 'MerVit (Added Parens)'
        , position: 'bb'
        , card1: '7d'
        , card2: 'Kc'
        , metadata:
           { lineno: 37
           , raw: 'Seat 3: MerVit (Added Parens) (big blind) mucked [7d Kc]' } }
      , { type: 'folded'
        , seatno: 4
        , player: 'drakfiskaren'
        , position: ''
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 38
           , raw: 'Seat 4: drakfiskaren folded before Flop (didn\'t bet)' } }
      , { type: 'folded'
        , seatno: 5
        , player: 'JohnnyVHS'
        , position: ''
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 39
           , raw: 'Seat 5: JohnnyVHS folded before Flop (didn\'t bet)' } }
      , { type: 'folded'
        , seatno: 6
        , player: 'held'
        , position: ''
        , street: 'preflop'
        , bet: false
        , metadata:
           { lineno: 40
           , raw: 'Seat 6: held folded before Flop (didn\'t bet)' } } ]
    , info:
      { room: 'pokerstars'
      , handid: '164151764888'
      , currency: '$'
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , sb: 0.02
      , bb: 0.05
      , year: 2017
      , month: 1
      , day: 6
      , hour: 17
      , min: 33
      , sec: 19
      , timezone: 'ET'
      , gametype: 'cashgame'
      , fast: true
      , metadata:
         { lineno: 0
         , raw: 'PokerStars Zoom Hand #164151764888:  Hold\'em No Limit ($0.02/$0.05) - 2017/01/06 17:33:19 ET' } }
    , table:
      { tableno: 'Donati'
      , maxseats: 6
      , button: 1
      , metadata:
         { lineno: 1
         , raw: 'Table \'Donati\' 6-max Seat #1 is the button' } }
    , hero: 'held'
    , holecards:
      { card1: '2s'
      , card2: '4h'
      , metadata: { lineno: 11, raw: 'Dealt to held [2s 4h]' } }
    , board:
      { card1: '9d'
      , card2: 'Qh'
      , card3: '4d'
      , card4: 'Qc'
      , card5: 'Jc'
      , metadata: { lineno: 34, raw: 'Board [9d Qh 4d Qc Jc]' } } })
  t.end()
})
