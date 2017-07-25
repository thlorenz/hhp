
const spok = require('spok')
const test = require('tape')
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'tourney-level22.txt'), 'utf8')
const res = parse(txt)

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\nIgnition: tourney at level 22', function(t) {
  spok(t, res,
    { seats:
      [ { seatno: 297
        , player: 'Dealer'
        , chips: 87396
        , metadata: { lineno: 1, raw: 'Seat 297: Dealer (87,396 in chips)' } }
      , { seatno: 38
        , player: 'hero'
        , chips: 82680
        , metadata:
           { lineno: 2
           , raw: 'Seat 38: Small Blind [ME] (82,680 in chips)' } }
      , { seatno: 169
        , player: 'Big Blind'
        , chips: 75938
        , metadata: { lineno: 3, raw: 'Seat 169: Big Blind (75,938 in chips)' } }
      , { seatno: 133
        , player: 'UTG'
        , chips: 66964
        , metadata: { lineno: 4, raw: 'Seat 133: UTG (66,964 in chips)' } }
      , { seatno: 321
        , player: 'UTG+1'
        , chips: 82712
        , metadata: { lineno: 5, raw: 'Seat 321: UTG+1 (82,712 in chips)' } }
      , { seatno: 177
        , player: 'UTG+2'
        , chips: 35471
        , metadata: { lineno: 6, raw: 'Seat 177: UTG+2 (35,471 in chips)' } }
      , { seatno: 317
        , player: 'UTG+3'
        , chips: 31770
        , metadata: { lineno: 7, raw: 'Seat 317: UTG+3 (31,770 in chips)' } }
      , { seatno: 184
        , player: 'UTG+4'
        , chips: 117612
        , metadata: { lineno: 8, raw: 'Seat 184: UTG+4 (117,612 in chips)' } } ]
    , posts:
      [ { player: 'Dealer'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 10, raw: 'Dealer : Ante chip 600' } }
      , { player: 'hero'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 11, raw: 'Small Blind [ME] : Ante chip 600' } }
      , { player: 'Big Blind'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 12, raw: 'Big Blind : Ante chip 600' } }
      , { player: 'UTG'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 13, raw: 'UTG : Ante chip 600' } }
      , { player: 'UTG+1'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 14, raw: 'UTG+1 : Ante chip 600' } }
      , { player: 'UTG+2'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 15, raw: 'UTG+2 : Ante chip 600' } }
      , { player: 'UTG+3'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 16, raw: 'UTG+3 : Ante chip 600' } }
      , { player: 'UTG+4'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 17, raw: 'UTG+4 : Ante chip 600' } }
      , { player: 'hero'
        , type: 'sb'
        , amount: 3000
        , metadata: { lineno: 18, raw: 'Small Blind [ME] : Small blind 3000' } }
      , { player: 'Big Blind'
        , type: 'bb'
        , amount: 6000
        , metadata: { lineno: 19, raw: 'Big Blind : Big blind 6000' } } ]
    , preflop:
      [ { player: 'UTG'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'UTG : Folds' } }
      , { player: 'UTG+1'
        , type: 'fold'
        , metadata: { lineno: 30, raw: 'UTG+1 : Folds' } }
      , { player: 'UTG+2'
        , type: 'fold'
        , metadata: { lineno: 31, raw: 'UTG+2 : Folds' } }
      , { player: 'UTG+3'
        , type: 'fold'
        , metadata: { lineno: 32, raw: 'UTG+3 : Folds' } }
      , { player: 'UTG+4'
        , type: 'fold'
        , metadata: { lineno: 33, raw: 'UTG+4 : Folds' } }
      , { player: 'Dealer'
        , type: 'raise'
        , amount: 12000
        , raiseTo: 12000
        , metadata: { lineno: 34, raw: 'Dealer : Raises 12000 to 12000' } }
      , { player: 'hero'
        , type: 'fold'
        , metadata: { lineno: 35, raw: 'Small Blind [ME] : Folds' } }
      , { player: 'Big Blind'
        , type: 'fold'
        , metadata: { lineno: 36, raw: 'Big Blind : Folds' } }
      , { player: 'Dealer'
        , type: 'bet-returned'
        , amount: 6000
        , metadata:
           { lineno: 37
           , raw: 'Dealer : Return uncalled portion of bet 6000' } }
      , { player: 'Dealer :'
        , type: 'collect'
        , amount: 19800
        , metadata: { lineno: 39, raw: 'Dealer : Hand Result 19800' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Dealer'
        , type: 'reveal'
        , card1: '8h'
        , card2: 'Th'
        , metadata: { lineno: 21, raw: 'Dealer : Card dealt to a spot [8h Th]' } }
      , { player: 'Big Blind'
        , type: 'reveal'
        , card1: 'Jh'
        , card2: '3c'
        , metadata: { lineno: 23, raw: 'Big Blind : Card dealt to a spot [Jh 3c]' } }
      , { player: 'UTG'
        , type: 'reveal'
        , card1: '6s'
        , card2: 'Kd'
        , metadata: { lineno: 24, raw: 'UTG : Card dealt to a spot [6s Kd]' } }
      , { player: 'UTG+1'
        , type: 'reveal'
        , card1: '4d'
        , card2: '3d'
        , metadata: { lineno: 25, raw: 'UTG+1 : Card dealt to a spot [4d 3d]' } }
      , { player: 'UTG+2'
        , type: 'reveal'
        , card1: '6d'
        , card2: '8c'
        , metadata: { lineno: 26, raw: 'UTG+2 : Card dealt to a spot [6d 8c]' } }
      , { player: 'UTG+3'
        , type: 'reveal'
        , card1: '9h'
        , card2: 'Qs'
        , metadata: { lineno: 27, raw: 'UTG+3 : Card dealt to a spot [9h Qs]' } }
      , { player: 'UTG+4'
        , type: 'reveal'
        , card1: '5c'
        , card2: 'Jc'
        , metadata: { lineno: 28, raw: 'UTG+4 : Card dealt to a spot [5c Jc]' } } ]
    , info:
      { room: 'ignition'
      , handid: '3549325520'
      , pokertype: 'holdem'
      , sb: 3000
      , bb: 6000
      , year: 2017
      , month: 7
      , day: 24
      , hour: 0
      , min: 26
      , sec: 1
      , gameno: '18094253'
      , level: '22'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'Ignition Hand #3549325520: HOLDEM Tournament #18094253 TBL#34, Normal- Level 22 (3000/6000) - 2017-07-24 00:26:10' }
      , ante: 600 }
    , table: { tableno: 34 }
    , hero: 'hero'
    , holecards:
      { card1: '2d'
      , card2: '8s'
      , metadata:
         { lineno: 22
         , raw: 'Small Blind [ME] : Card dealt to a spot [2d 8s]' } } })
  t.end()
})
