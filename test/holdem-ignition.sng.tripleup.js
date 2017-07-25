const spok = require('spok')
const test = require('tape')
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'sng-tripleup.txt'), 'utf8')
const res = parse(txt)

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\nIgnition: sng tripleup', function(t) {
  spok(t, res,
    { seats:
      [ { seatno: 7
        , player: 'hero'
        , chips: 1460
        , metadata: { lineno: 1, raw: 'Seat 7: Small Blind [ME] (1,460 in chips)' } }
      , { seatno: 9
        , player: 'Big Blind'
        , chips: 1500
        , metadata: { lineno: 2, raw: 'Seat 9: Big Blind (1,500 in chips)' } }
      , { seatno: 1
        , player: 'UTG'
        , chips: 1460
        , metadata: { lineno: 3, raw: 'Seat 1: UTG (1,460 in chips)' } }
      , { seatno: 8
        , player: 'UTG+1'
        , chips: 1500
        , metadata: { lineno: 4, raw: 'Seat 8: UTG+1 (1,500 in chips)' } }
      , { seatno: 6
        , player: 'UTG+2'
        , chips: 1500
        , metadata: { lineno: 5, raw: 'Seat 6: UTG+2 (1,500 in chips)' } }
      , { seatno: 3
        , player: 'UTG+3'
        , chips: 1500
        , metadata: { lineno: 6, raw: 'Seat 3: UTG+3 (1,500 in chips)' } }
      , { seatno: 4
        , player: 'UTG+4'
        , chips: 1460
        , metadata: { lineno: 7, raw: 'Seat 4: UTG+4 (1,460 in chips)' } }
      , { seatno: 2
        , player: 'UTG+5'
        , chips: 1630
        , metadata: { lineno: 8, raw: 'Seat 2: UTG+5 (1,630 in chips)' } }
      , { seatno: 5
        , player: 'Dealer'
        , chips: 1490
        , metadata: { lineno: 9, raw: 'Seat 5: Dealer (1,490 in chips)' } } ]
    , posts:
      [ { player: 'hero'
        , type: 'sb'
        , amount: 10
        , metadata: { lineno: 11, raw: 'Small Blind [ME] : Small blind 10' } }
      , { player: 'Big Blind'
        , type: 'bb'
        , amount: 20
        , metadata: { lineno: 12, raw: 'Big Blind : Big blind 20' } } ]
    , preflop:
      [ { player: 'UTG'
        , type: 'call'
        , amount: 20
        , metadata: { lineno: 24, raw: 'UTG : Call 20' } }
      , { player: 'UTG+1'
        , type: 'fold'
        , metadata: { lineno: 25, raw: 'UTG+1 : Folds' } }
      , { player: 'UTG+2'
        , type: 'call'
        , amount: 20
        , metadata: { lineno: 26, raw: 'UTG+2 : Call 20' } }
      , { player: 'UTG+3'
        , type: 'fold'
        , metadata: { lineno: 27, raw: 'UTG+3 : Folds' } }
      , { player: 'UTG+4'
        , type: 'raise'
        , amount: 60
        , raiseTo: 60
        , metadata: { lineno: 28, raw: 'UTG+4 : Raises 60 to 60' } }
      , { player: 'UTG+5'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'UTG+5 : Folds' } }
      , { player: 'Dealer'
        , type: 'fold'
        , metadata: { lineno: 30, raw: 'Dealer : Folds' } }
      , { player: 'hero'
        , type: 'fold'
        , metadata: { lineno: 31, raw: 'Small Blind [ME] : Folds' } }
      , { player: 'Big Blind'
        , type: 'fold'
        , metadata: { lineno: 32, raw: 'Big Blind : Folds' } }
      , { player: 'UTG'
        , type: 'call'
        , amount: 40
        , metadata: { lineno: 33, raw: 'UTG : Call 40' } }
      , { player: 'UTG+2'
        , type: 'call'
        , amount: 40
        , metadata: { lineno: 34, raw: 'UTG+2 : Call 40' } } ]
    , flop:
      [ { player: 'UTG'
        , type: 'check'
        , metadata: { lineno: 36, raw: 'UTG : Checks' } }
      , { player: 'UTG+2'
        , type: 'check'
        , metadata: { lineno: 37, raw: 'UTG+2 : Checks' } }
      , { player: 'UTG+4'
        , type: 'bet'
        , amount: 100
        , metadata: { lineno: 38, raw: 'UTG+4 : Bets 100' } }
      , { player: 'UTG'
        , type: 'fold'
        , metadata: { lineno: 39, raw: 'UTG : Folds' } }
      , { player: 'UTG+2'
        , type: 'fold'
        , metadata: { lineno: 40, raw: 'UTG+2 : Folds' } }
      , { player: 'UTG+4'
        , type: 'bet-returned'
        , amount: 100
        , metadata:
           { lineno: 41
           , raw: 'UTG+4 : Return uncalled portion of bet 100' } }
      , { player: 'UTG+4 :'
        , type: 'collect'
        , amount: 210
        , metadata: { lineno: 43, raw: 'UTG+4 : Hand Result 210' } } ]
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Big Blind'
        , type: 'reveal'
        , card1: '2d'
        , card2: 'Jd'
        , metadata: { lineno: 15, raw: 'Big Blind : Card dealt to a spot [2d Jd]' } }
      , { player: 'UTG'
        , type: 'reveal'
        , card1: 'Kc'
        , card2: '8c'
        , metadata: { lineno: 16, raw: 'UTG : Card dealt to a spot [Kc 8c]' } }
      , { player: 'UTG+1'
        , type: 'reveal'
        , card1: '5d'
        , card2: 'Qc'
        , metadata: { lineno: 17, raw: 'UTG+1 : Card dealt to a spot [5d Qc]' } }
      , { player: 'UTG+2'
        , type: 'reveal'
        , card1: '4h'
        , card2: '4s'
        , metadata: { lineno: 18, raw: 'UTG+2 : Card dealt to a spot [4h 4s]' } }
      , { player: 'UTG+3'
        , type: 'reveal'
        , card1: '9c'
        , card2: '8s'
        , metadata: { lineno: 19, raw: 'UTG+3 : Card dealt to a spot [9c 8s]' } }
      , { player: 'UTG+4'
        , type: 'reveal'
        , card1: 'Ac'
        , card2: 'Qs'
        , metadata: { lineno: 20, raw: 'UTG+4 : Card dealt to a spot [Ac Qs]' } }
      , { player: 'UTG+5'
        , type: 'reveal'
        , card1: '6c'
        , card2: 'Ks'
        , metadata: { lineno: 21, raw: 'UTG+5 : Card dealt to a spot [6c Ks]' } }
      , { player: 'Dealer'
        , type: 'reveal'
        , card1: '9s'
        , card2: '3c'
        , metadata: { lineno: 22, raw: 'Dealer : Card dealt to a spot [9s 3c]' } } ]
    , info:
      { room: 'ignition'
      , handid: '3548320887'
      , pokertype: 'holdem'
      , sb: 10
      , bb: 20
      , year: 2017
      , month: 7
      , day: 21
      , hour: 13
      , min: 48
      , sec: 1
      , gameno: '18509313'
      , level: '1'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'Ignition Hand #3548320887: HOLDEM Tournament #18509313 TBL#1, Normal- Level 1 (10/20) - 2017-07-21 13:48:15' } }
    , table: { tableno: 1 }
    , hero: 'hero'
    , holecards:
      { card1: '7c'
      , card2: 'Th'
      , metadata:
         { lineno: 14
         , raw: 'Small Blind [ME] : Card dealt to a spot [7c Th]' } }
    , board:
      { card1: 'Qh'
      , card2: '9h'
      , card3: '5c'
      , metadata: { lineno: 46, raw: 'Board [Qh 9h 5c  ]' } } })
  t.end()
})
