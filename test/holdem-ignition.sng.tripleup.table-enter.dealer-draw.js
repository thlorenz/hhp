'use strict'

const spok = require('spok')
const test = require('tape')
const { parseHand } = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'sng-tripleup.table-enter.dealer-draw.txt'), 'utf8')
const res = parseHand(txt)

test('\nIgnition: sng tripleup, not tripped up by table enters and drawing for dealer (first hand)', function(t) {
  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'IgnitionHero'
        , chips: 1500
        , metadata: { lineno: 1, raw: 'Seat 7: Big Blind [ME] (1,500 in chips)' } }
      , { seatno: 2
        , player: 'Ignition-9'
        , chips: 1500
        , metadata: { lineno: 2, raw: 'Seat 9: UTG (1,500 in chips)' } }
      , { seatno: 3
        , player: 'Ignition-1'
        , chips: 1500
        , metadata: { lineno: 3, raw: 'Seat 1: UTG+1 (1,500 in chips)' } }
      , { seatno: 4
        , player: 'Ignition-8'
        , chips: 1500
        , metadata: { lineno: 4, raw: 'Seat 8: UTG+2 (1,500 in chips)' } }
      , { seatno: 5
        , player: 'Ignition-6'
        , chips: 1500
        , metadata: { lineno: 5, raw: 'Seat 6: UTG+3 (1,500 in chips)' } }
      , { seatno: 6
        , player: 'Ignition-3'
        , chips: 1500
        , metadata: { lineno: 6, raw: 'Seat 3: UTG+4 (1,500 in chips)' } }
      , { seatno: 7
        , player: 'Ignition-4'
        , chips: 1500
        , metadata: { lineno: 7, raw: 'Seat 4: UTG+5 (1,500 in chips)' } }
      , { seatno: 8
        , player: 'Ignition-2'
        , chips: 1500
        , metadata: { lineno: 8, raw: 'Seat 2: Dealer (1,500 in chips)' }
        , isbutton: true }
      , { seatno: 9
        , player: 'Ignition-5'
        , chips: 1500
        , metadata: { lineno: 9, raw: 'Seat 5: Small Blind (1,500 in chips)' } } ]
    , posts:
      [ { player: 'Ignition-5'
        , type: 'sb'
        , amount: 10
        , metadata: { lineno: 29, raw: 'Small Blind : Small blind 10' }
        , seatno: 9 }
      , { player: 'IgnitionHero'
        , type: 'bb'
        , amount: 20
        , metadata: { lineno: 30, raw: 'Big Blind [ME] : Big blind 20' }
        , seatno: 1 } ]
    , preflop:
      [ { player: 'Ignition-9'
        , type: 'fold'
        , metadata: { lineno: 41, raw: 'UTG : Folds' }
        , seatno: 2 }
      , { player: 'Ignition-1'
        , type: 'raise'
        , amount: 40
        , raiseTo: 40
        , metadata: { lineno: 42, raw: 'UTG+1 : Raises 40 to 40' }
        , seatno: 3 }
      , { player: 'Ignition-8'
        , type: 'fold'
        , metadata: { lineno: 43, raw: 'UTG+2 : Folds' }
        , seatno: 4 }
      , { player: 'Ignition-6'
        , type: 'fold'
        , metadata: { lineno: 44, raw: 'UTG+3 : Folds' }
        , seatno: 5 }
      , { player: 'Ignition-3'
        , type: 'fold'
        , metadata: { lineno: 46, raw: 'UTG+4 : Folds(timeout)' }
        , seatno: 6 }
      , { player: 'Ignition-4'
        , type: 'call'
        , amount: 40
        , metadata: { lineno: 47, raw: 'UTG+5 : Call 40' }
        , seatno: 7 }
      , { player: 'Ignition-2'
        , type: 'call'
        , amount: 40
        , metadata: { lineno: 48, raw: 'Dealer : Call 40' }
        , seatno: 8 }
      , { player: 'Ignition-5'
        , type: 'fold'
        , metadata: { lineno: 49, raw: 'Small Blind : Folds' }
        , seatno: 9 }
      , { player: 'IgnitionHero'
        , type: 'call'
        , amount: 20
        , metadata: { lineno: 50, raw: 'Big Blind [ME] : Call 20' }
        , seatno: 1 } ]
    , flop:
      [ { player: 'IgnitionHero'
        , type: 'check'
        , metadata: { lineno: 52, raw: 'Big Blind [ME] : Checks' }
        , seatno: 1 }
      , { player: 'Ignition-1'
        , type: 'check'
        , metadata: { lineno: 53, raw: 'UTG+1 : Checks' }
        , seatno: 3 }
      , { player: 'Ignition-4'
        , type: 'check'
        , metadata: { lineno: 54, raw: 'UTG+5 : Checks' }
        , seatno: 7 }
      , { player: 'Ignition-2'
        , type: 'check'
        , metadata: { lineno: 55, raw: 'Dealer : Checks' }
        , seatno: 8 } ]
    , turn:
      [ { player: 'IgnitionHero'
        , type: 'check'
        , metadata: { lineno: 57, raw: 'Big Blind [ME] : Checks' }
        , seatno: 1 }
      , { player: 'Ignition-1'
        , type: 'check'
        , metadata: { lineno: 58, raw: 'UTG+1 : Checks' }
        , seatno: 3 }
      , { player: 'Ignition-4'
        , type: 'check'
        , metadata: { lineno: 59, raw: 'UTG+5 : Checks' }
        , seatno: 7 }
      , { player: 'Ignition-2'
        , type: 'check'
        , metadata: { lineno: 60, raw: 'Dealer : Checks' }
        , seatno: 8 } ]
    , river:
      [ { player: 'IgnitionHero'
        , type: 'check'
        , metadata: { lineno: 62, raw: 'Big Blind [ME] : Checks' }
        , seatno: 1 }
      , { player: 'Ignition-1'
        , type: 'check'
        , metadata: { lineno: 63, raw: 'UTG+1 : Checks' }
        , seatno: 3 }
      , { player: 'Ignition-4'
        , type: 'check'
        , metadata: { lineno: 64, raw: 'UTG+5 : Checks' }
        , seatno: 7 }
      , { player: 'Ignition-2'
        , type: 'bet'
        , amount: 120
        , metadata: { lineno: 65, raw: 'Dealer : Bets 120' }
        , seatno: 8 }
      , { player: 'IgnitionHero'
        , type: 'fold'
        , metadata: { lineno: 66, raw: 'Big Blind [ME] : Folds' }
        , seatno: 1 }
      , { player: 'Ignition-1'
        , type: 'fold'
        , metadata: { lineno: 67, raw: 'UTG+1 : Folds' }
        , seatno: 3 }
      , { player: 'Ignition-4'
        , type: 'fold'
        , metadata: { lineno: 68, raw: 'UTG+5 : Folds' }
        , seatno: 7 }
      , { player: 'Ignition-2'
        , type: 'bet-returned'
        , amount: 120
        , metadata:
           { lineno: 69
           , raw: 'Dealer : Return uncalled portion of bet 120' }
        , seatno: 8 }
      , { player: 'Ignition-2'
        , type: 'collect'
        , amount: 170
        , pot: null
        , metadata: { lineno: 71, raw: 'Dealer : Hand Result 170' }
        , seatno: 8 } ]
    , showdown:
      [ { player: 'Ignition-9'
        , type: 'reveal'
        , card1: 'Ac'
        , card2: '4d'
        , metadata: { lineno: 33, raw: 'UTG : Card dealt to a spot [Ac 4d]' }
        , seatno: 2 }
      , { player: 'Ignition-1'
        , type: 'reveal'
        , card1: 'Ah'
        , card2: 'Kc'
        , metadata: { lineno: 34, raw: 'UTG+1 : Card dealt to a spot [Ah Kc]' }
        , seatno: 3 }
      , { player: 'Ignition-8'
        , type: 'reveal'
        , card1: 'Kh'
        , card2: '3c'
        , metadata: { lineno: 35, raw: 'UTG+2 : Card dealt to a spot [Kh 3c]' }
        , seatno: 4 }
      , { player: 'Ignition-6'
        , type: 'reveal'
        , card1: '7d'
        , card2: '3s'
        , metadata: { lineno: 36, raw: 'UTG+3 : Card dealt to a spot [7d 3s]' }
        , seatno: 5 }
      , { player: 'Ignition-3'
        , type: 'reveal'
        , card1: 'Js'
        , card2: '7h'
        , metadata: { lineno: 37, raw: 'UTG+4 : Card dealt to a spot [Js 7h]' }
        , seatno: 6 }
      , { player: 'Ignition-4'
        , type: 'reveal'
        , card1: 'Ks'
        , card2: 'As'
        , metadata: { lineno: 38, raw: 'UTG+5 : Card dealt to a spot [Ks As]' }
        , seatno: 7 }
      , { player: 'Ignition-2'
        , type: 'reveal'
        , card1: 'Ad'
        , card2: 'Qc'
        , metadata: { lineno: 39, raw: 'Dealer : Card dealt to a spot [Ad Qc]' }
        , seatno: 8 }
      , { player: 'Ignition-5'
        , type: 'reveal'
        , card1: '4h'
        , card2: 'Qd'
        , metadata:
           { lineno: 40
           , raw: 'Small Blind : Card dealt to a spot [4h Qd]' }
        , seatno: 9 } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 170
        , metadata: { lineno: 73, raw: 'Total Pot(170)' } }
      , { type: 'folded'
        , seatno: 1
        , player: 'IgnitionHero'
        , position: 'bb'
        , street: 'river'
        , bet: true
        , metadata: { lineno: 75, raw: 'Seat+7: Big Blind Folded on the RIVER' } }
      , { type: 'folded'
        , seatno: 2
        , player: 'Ignition-9'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 76, raw: 'Seat+9: UTG Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 3
        , player: 'Ignition-1'
        , position: ''
        , street: 'river'
        , bet: true
        , metadata: { lineno: 77, raw: 'Seat+1: UTG+1 Folded on the RIVER' } }
      , { type: 'folded'
        , seatno: 4
        , player: 'Ignition-8'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 78, raw: 'Seat+8: UTG+2 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 5
        , player: 'Ignition-6'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 79, raw: 'Seat+6: UTG+3 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 6
        , player: 'Ignition-3'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 80, raw: 'Seat+3: UTG+4 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 7
        , player: 'Ignition-4'
        , position: ''
        , street: 'river'
        , bet: true
        , metadata: { lineno: 81, raw: 'Seat+4: UTG+5 Folded on the RIVER' } }
      , { type: 'collected'
        , seatno: 8
        , player: 'Ignition-2'
        , position: 'bu'
        , amount: 170
        , metadata: { lineno: 82, raw: 'Seat+2: Dealer 170 [Does not show]' } }
      , { type: 'folded'
        , seatno: 9
        , player: 'Ignition-5'
        , position: 'sb'
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 83, raw: 'Seat+5: Small Blind Folded on the FLOP' } } ]
    , info:
      { room: 'ignition'
      , handid: '3548320503'
      , pokertype: 'holdem'
      , sb: 10
      , bb: 20
      , year: 2017
      , month: 7
      , day: 21
      , hour: 13
      , min: 46
      , sec: 0
      , gameno: '18509313'
      , level: '1'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'Ignition Hand #3548320503: HOLDEM Tournament #18509313 TBL#1, Normal- Level 1 (10/20) - 2017-07-21 13:46:03' } }
    , table: { tableno: 1, maxseats: 9, button: 8 }
    , hero: 'IgnitionHero'
    , holecards:
      { card1: 'Ts'
      , card2: '6h'
      , metadata:
         { lineno: 32
         , raw: 'Big Blind [ME] : Card dealt to a spot [Ts 6h]' } }
    , board:
      { card1: '9d'
      , card2: '6d'
      , card3: '2d'
      , card4: '5s'
      , card5: 'Td'
      , metadata: { lineno: 74, raw: 'Board [9d 6d 2d 5s Td]' } } })
  t.end()
})
