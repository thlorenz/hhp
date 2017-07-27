const spok = require('spok')
const test = require('tape')
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'sng-split-pot.txt'), 'utf8')
const res = parse(txt)

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\nIgnition: sng bb and sb split pot, check river and showdown collects', function(t) {
  spok(t, res,
    { seats:
      [ { seatno: 2
        , player: 'Ignition-5'
        , chips: 1440
        , metadata: { lineno: 1, raw: 'Seat 5: UTG+2 (1,440 in chips)' } }
      , { seatno: 3
        , player: 'Ignition-8'
        , chips: 1500
        , metadata: { lineno: 2, raw: 'Seat 8: UTG+3 (1,500 in chips)' } }
      , { seatno: 4
        , player: 'Ignition-9'
        , chips: 1480
        , metadata: { lineno: 3, raw: 'Seat 9: UTG+4 (1,480 in chips)' } }
      , { seatno: 5
        , player: 'Ignition-7'
        , chips: 1500
        , metadata: { lineno: 4, raw: 'Seat 7: UTG+5 (1,500 in chips)' } }
      , { seatno: 6
        , player: 'Ignition-6'
        , chips: 1600
        , metadata: { lineno: 5, raw: 'Seat 6: Dealer (1,600 in chips)' }
        , isbutton: true }
      , { seatno: 7
        , player: 'Ignition-4'
        , chips: 1480
        , metadata: { lineno: 6, raw: 'Seat 4: Small Blind (1,480 in chips)' } }
      , { seatno: 8
        , player: 'Ignition-3'
        , chips: 1500
        , metadata: { lineno: 7, raw: 'Seat 3: Big Blind (1,500 in chips)' } }
      , { seatno: 9
        , player: 'Ignition-1'
        , chips: 1500
        , metadata: { lineno: 8, raw: 'Seat 1: UTG (1,500 in chips)' } }
      , { seatno: 1
        , player: 'IgnitionHero'
        , chips: 1500
        , metadata: { lineno: 9, raw: 'Seat 2: UTG+1 [ME] (1,500 in chips)' } } ]
    , posts:
      [ { player: 'Ignition-4'
        , type: 'sb'
        , amount: 10
        , metadata: { lineno: 11, raw: 'Small Blind : Small blind 10' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'bb'
        , amount: 20
        , metadata: { lineno: 12, raw: 'Big Blind : Big blind 20' }
        , seatno: 8 } ]
    , preflop:
      [ { player: 'Ignition-1'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'UTG : Folds' }
        , seatno: 9 }
      , { player: 'IgnitionHero'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'UTG+1 [ME] : Folds' }
        , seatno: 1 }
      , { player: 'Ignition-5'
        , type: 'fold'
        , metadata: { lineno: 25, raw: 'UTG+2 : Folds' }
        , seatno: 2 }
      , { player: 'Ignition-8'
        , type: 'fold'
        , metadata: { lineno: 26, raw: 'UTG+3 : Folds' }
        , seatno: 3 }
      , { player: 'Ignition-9'
        , type: 'fold'
        , metadata: { lineno: 27, raw: 'UTG+4 : Folds' }
        , seatno: 4 }
      , { player: 'Ignition-7'
        , type: 'fold'
        , metadata: { lineno: 28, raw: 'UTG+5 : Folds' }
        , seatno: 5 }
      , { player: 'Ignition-6'
        , type: 'call'
        , amount: 20
        , metadata: { lineno: 29, raw: 'Dealer : Call 20' }
        , seatno: 6 }
      , { player: 'Ignition-4'
        , type: 'call'
        , amount: 10
        , metadata: { lineno: 30, raw: 'Small Blind : Call 10' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'check'
        , metadata: { lineno: 31, raw: 'Big Blind : Checks' }
        , seatno: 8 } ]
    , flop:
      [ { player: 'Ignition-4'
        , type: 'bet'
        , amount: 30
        , metadata: { lineno: 33, raw: 'Small Blind : Bets 30' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'call'
        , amount: 30
        , metadata: { lineno: 34, raw: 'Big Blind : Call 30' }
        , seatno: 8 }
      , { player: 'Ignition-6'
        , type: 'call'
        , amount: 30
        , metadata: { lineno: 35, raw: 'Dealer : Call 30' }
        , seatno: 6 } ]
    , turn:
      [ { player: 'Ignition-4'
        , type: 'check'
        , metadata: { lineno: 37, raw: 'Small Blind : Checks' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'check'
        , metadata: { lineno: 38, raw: 'Big Blind : Checks' }
        , seatno: 8 }
      , { player: 'Ignition-6'
        , type: 'check'
        , metadata: { lineno: 39, raw: 'Dealer : Checks' }
        , seatno: 6 } ]
    , river:
      [ { player: 'Ignition-4'
        , type: 'check'
        , metadata: { lineno: 41, raw: 'Small Blind : Checks' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'check'
        , metadata: { lineno: 42, raw: 'Big Blind : Checks' }
        , seatno: 8 }
      , { player: 'Ignition-6'
        , type: 'check'
        , metadata: { lineno: 43, raw: 'Dealer : Checks' }
        , seatno: 6 } ]
    , showdown:
      [ { player: 'Ignition-5'
        , type: 'reveal'
        , card1: '3c'
        , card2: 'Jc'
        , metadata: { lineno: 14, raw: 'UTG+2 : Card dealt to a spot [3c Jc]' }
        , seatno: 2 }
      , { player: 'Ignition-8'
        , type: 'reveal'
        , card1: '6c'
        , card2: '5d'
        , metadata: { lineno: 15, raw: 'UTG+3 : Card dealt to a spot [6c 5d]' }
        , seatno: 3 }
      , { player: 'Ignition-9'
        , type: 'reveal'
        , card1: 'Jd'
        , card2: 'Qh'
        , metadata: { lineno: 16, raw: 'UTG+4 : Card dealt to a spot [Jd Qh]' }
        , seatno: 4 }
      , { player: 'Ignition-7'
        , type: 'reveal'
        , card1: '5s'
        , card2: '9d'
        , metadata: { lineno: 17, raw: 'UTG+5 : Card dealt to a spot [5s 9d]' }
        , seatno: 5 }
      , { player: 'Ignition-6'
        , type: 'reveal'
        , card1: '6s'
        , card2: '6d'
        , metadata: { lineno: 18, raw: 'Dealer : Card dealt to a spot [6s 6d]' }
        , seatno: 6 }
      , { player: 'Ignition-4'
        , type: 'reveal'
        , card1: 'Kh'
        , card2: '2h'
        , metadata:
           { lineno: 19
           , raw: 'Small Blind : Card dealt to a spot [Kh 2h]' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'reveal'
        , card1: 'Kd'
        , card2: '8d'
        , metadata: { lineno: 20, raw: 'Big Blind : Card dealt to a spot [Kd 8d]' }
        , seatno: 8 }
      , { player: 'Ignition-1'
        , type: 'reveal'
        , card1: 'Kc'
        , card2: '4h'
        , metadata: { lineno: 21, raw: 'UTG : Card dealt to a spot [Kc 4h]' }
        , seatno: 9 }
      , { player: 'Ignition-4'
        , type: 'show'
        , metadata:
           { lineno: 44
           , raw: 'Small Blind : Showdown [Ks Kh 7h 7c As] (Two pair)' }
        , desc: 'two pair'
        , card1: 'Kh'
        , card2: '2h'
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'show'
        , metadata:
           { lineno: 45
           , raw: 'Big Blind : Showdown [Ks Kd 7h 7c As] (Two pair)' }
        , desc: 'two pair'
        , card1: 'Kd'
        , card2: '8d'
        , seatno: 8 }
      , { player: 'Ignition-6'
        , type: 'muck'
        , metadata: { lineno: 46, raw: 'Dealer : Mucks [6s 6d] (Two pair)' }
        , card1: '6s'
        , card2: '6d'
        , desc: 'two pair'
        , seatno: 6 }
      , { player: 'Ignition-4'
        , type: 'collect'
        , amount: 75
        , pot: null
        , metadata: { lineno: 47, raw: 'Small Blind : Hand Result 75' }
        , seatno: 7 }
      , { player: 'Ignition-3'
        , type: 'collect'
        , amount: 75
        , pot: null
        , metadata: { lineno: 48, raw: 'Big Blind : Hand Result 75' }
        , seatno: 8 } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 150
        , metadata: { lineno: 50, raw: 'Total Pot(150)' } }
      , { type: 'folded'
        , seatno: 2
        , player: 'Ignition-5'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 52, raw: 'Seat+5: UTG+2 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 3
        , player: 'Ignition-8'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 53, raw: 'Seat+8: UTG+3 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 4
        , player: 'Ignition-9'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 54, raw: 'Seat+9: UTG+4 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 5
        , player: 'Ignition-7'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 55, raw: 'Seat+7: UTG+5 Folded on the FLOP' } }
      , { type: 'muck'
        , seatno: 6
        , player: 'Ignition-6'
        , position: 'bu'
        , card1: '6s'
        , card2: '6d'
        , metadata: { lineno: 56, raw: 'Seat+6: Dealer [Mucked] [6s 6d ]' } }
      , { type: 'showed'
        , won: true
        , seatno: 7
        , player: 'Ignition-4'
        , position: 'sb'
        , card1: 'Kh'
        , card2: '2h'
        , amount: 75
        , description: 'Two pair'
        , metadata:
           { lineno: 57
           , raw: 'Seat+4: Small Blind 75  with Two pair [Kh 2h-Ks Kh 7h 7c As]' } }
      , { type: 'showed'
        , won: true
        , seatno: 8
        , player: 'Ignition-3'
        , position: 'bb'
        , card1: 'Kd'
        , card2: '8d'
        , amount: 75
        , description: 'Two pair'
        , metadata:
           { lineno: 58
           , raw: 'Seat+3: Big Blind 75  with Two pair [Kd 8d-Ks Kd 7h 7c As]' } }
      , { type: 'folded'
        , seatno: 9
        , player: 'Ignition-1'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 59, raw: 'Seat+1: UTG Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 1
        , player: 'IgnitionHero'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 60, raw: 'Seat+2: UTG+1 Folded on the FLOP' } } ]
    , info:
      { room: 'ignition'
      , handid: '3549213216'
      , pokertype: 'holdem'
      , sb: 10
      , bb: 20
      , year: 2017
      , month: 7
      , day: 23
      , hour: 20
      , min: 32
      , sec: 3
      , gameno: '18534183'
      , level: '1'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'Ignition Hand #3549213216: HOLDEM Tournament #18534183 TBL#1, Normal- Level 1 (10/20) - 2017-07-23 20:32:37' } }
    , table: { tableno: 1, maxseats: 9, button: 6 }
    , hero: 'IgnitionHero'
    , holecards:
      { card1: '2d'
      , card2: '3s'
      , metadata: { lineno: 22, raw: 'UTG+1 [ME] : Card dealt to a spot [2d 3s]' } }
    , board:
      { card1: '7c'
      , card2: 'As'
      , card3: 'Ks'
      , card4: 'Qs'
      , card5: '7h'
      , metadata: { lineno: 51, raw: 'Board [7c As Ks Qs 7h]' } } })
  t.end()
})
