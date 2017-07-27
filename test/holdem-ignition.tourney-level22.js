
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
      [ { seatno: 8
        , player: 'Ignition-297'
        , chips: 87396
        , metadata: { lineno: 1, raw: 'Seat 297: Dealer (87,396 in chips)' }
        , isbutton: true }
      , { seatno: 1
        , player: 'IgnitionHero'
        , chips: 82680
        , metadata:
           { lineno: 2
           , raw: 'Seat 38: Small Blind [ME] (82,680 in chips)' } }
      , { seatno: 2
        , player: 'Ignition-169'
        , chips: 75938
        , metadata: { lineno: 3, raw: 'Seat 169: Big Blind (75,938 in chips)' } }
      , { seatno: 3
        , player: 'Ignition-133'
        , chips: 66964
        , metadata: { lineno: 4, raw: 'Seat 133: UTG (66,964 in chips)' } }
      , { seatno: 4
        , player: 'Ignition-321'
        , chips: 82712
        , metadata: { lineno: 5, raw: 'Seat 321: UTG+1 (82,712 in chips)' } }
      , { seatno: 5
        , player: 'Ignition-177'
        , chips: 35471
        , metadata: { lineno: 6, raw: 'Seat 177: UTG+2 (35,471 in chips)' } }
      , { seatno: 6
        , player: 'Ignition-317'
        , chips: 31770
        , metadata: { lineno: 7, raw: 'Seat 317: UTG+3 (31,770 in chips)' } }
      , { seatno: 7
        , player: 'Ignition-184'
        , chips: 117612
        , metadata: { lineno: 8, raw: 'Seat 184: UTG+4 (117,612 in chips)' } } ]
    , posts:
      [ { player: 'Ignition-297'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 10, raw: 'Dealer : Ante chip 600' }
        , seatno: 8 }
      , { player: 'IgnitionHero'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 11, raw: 'Small Blind [ME] : Ante chip 600' }
        , seatno: 1 }
      , { player: 'Ignition-169'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 12, raw: 'Big Blind : Ante chip 600' }
        , seatno: 2 }
      , { player: 'Ignition-133'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 13, raw: 'UTG : Ante chip 600' }
        , seatno: 3 }
      , { player: 'Ignition-321'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 14, raw: 'UTG+1 : Ante chip 600' }
        , seatno: 4 }
      , { player: 'Ignition-177'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 15, raw: 'UTG+2 : Ante chip 600' }
        , seatno: 5 }
      , { player: 'Ignition-317'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 16, raw: 'UTG+3 : Ante chip 600' }
        , seatno: 6 }
      , { player: 'Ignition-184'
        , type: 'ante'
        , amount: 600
        , metadata: { lineno: 17, raw: 'UTG+4 : Ante chip 600' }
        , seatno: 7 }
      , { player: 'IgnitionHero'
        , type: 'sb'
        , amount: 3000
        , metadata: { lineno: 18, raw: 'Small Blind [ME] : Small blind 3000' }
        , seatno: 1 }
      , { player: 'Ignition-169'
        , type: 'bb'
        , amount: 6000
        , metadata: { lineno: 19, raw: 'Big Blind : Big blind 6000' }
        , seatno: 2 } ]
    , preflop:
      [ { player: 'Ignition-133'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'UTG : Folds' }
        , seatno: 3 }
      , { player: 'Ignition-321'
        , type: 'fold'
        , metadata: { lineno: 30, raw: 'UTG+1 : Folds' }
        , seatno: 4 }
      , { player: 'Ignition-177'
        , type: 'fold'
        , metadata: { lineno: 31, raw: 'UTG+2 : Folds' }
        , seatno: 5 }
      , { player: 'Ignition-317'
        , type: 'fold'
        , metadata: { lineno: 32, raw: 'UTG+3 : Folds' }
        , seatno: 6 }
      , { player: 'Ignition-184'
        , type: 'fold'
        , metadata: { lineno: 33, raw: 'UTG+4 : Folds' }
        , seatno: 7 }
      , { player: 'Ignition-297'
        , type: 'raise'
        , amount: 12000
        , raiseTo: 12000
        , metadata: { lineno: 34, raw: 'Dealer : Raises 12000 to 12000' }
        , seatno: 8 }
      , { player: 'IgnitionHero'
        , type: 'fold'
        , metadata: { lineno: 35, raw: 'Small Blind [ME] : Folds' }
        , seatno: 1 }
      , { player: 'Ignition-169'
        , type: 'fold'
        , metadata: { lineno: 36, raw: 'Big Blind : Folds' }
        , seatno: 2 }
      , { player: 'Ignition-297'
        , type: 'bet-returned'
        , amount: 6000
        , metadata:
           { lineno: 37
           , raw: 'Dealer : Return uncalled portion of bet 6000' }
        , seatno: 8 }
      , { player: 'Ignition-297'
        , type: 'collect'
        , amount: 19800
        , pot: null
        , metadata: { lineno: 39, raw: 'Dealer : Hand Result 19800' }
        , seatno: 8 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Ignition-297'
        , type: 'reveal'
        , card1: '8h'
        , card2: 'Th'
        , metadata: { lineno: 21, raw: 'Dealer : Card dealt to a spot [8h Th]' }
        , seatno: 8 }
      , { player: 'Ignition-169'
        , type: 'reveal'
        , card1: 'Jh'
        , card2: '3c'
        , metadata: { lineno: 23, raw: 'Big Blind : Card dealt to a spot [Jh 3c]' }
        , seatno: 2 }
      , { player: 'Ignition-133'
        , type: 'reveal'
        , card1: '6s'
        , card2: 'Kd'
        , metadata: { lineno: 24, raw: 'UTG : Card dealt to a spot [6s Kd]' }
        , seatno: 3 }
      , { player: 'Ignition-321'
        , type: 'reveal'
        , card1: '4d'
        , card2: '3d'
        , metadata: { lineno: 25, raw: 'UTG+1 : Card dealt to a spot [4d 3d]' }
        , seatno: 4 }
      , { player: 'Ignition-177'
        , type: 'reveal'
        , card1: '6d'
        , card2: '8c'
        , metadata: { lineno: 26, raw: 'UTG+2 : Card dealt to a spot [6d 8c]' }
        , seatno: 5 }
      , { player: 'Ignition-317'
        , type: 'reveal'
        , card1: '9h'
        , card2: 'Qs'
        , metadata: { lineno: 27, raw: 'UTG+3 : Card dealt to a spot [9h Qs]' }
        , seatno: 6 }
      , { player: 'Ignition-184'
        , type: 'reveal'
        , card1: '5c'
        , card2: 'Jc'
        , metadata: { lineno: 28, raw: 'UTG+4 : Card dealt to a spot [5c Jc]' }
        , seatno: 7 } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 19800
        , metadata: { lineno: 41, raw: 'Total Pot(19800)' } }
      , { type: 'collected'
        , seatno: 8
        , player: 'Ignition-297'
        , position: 'bu'
        , amount: 19800
        , metadata: { lineno: 42, raw: 'Seat+297: Dealer 19800 [Does not show]' } }
      , { type: 'folded'
        , seatno: 1
        , player: 'IgnitionHero'
        , position: 'sb'
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 43, raw: 'Seat+38: Small Blind Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 2
        , player: 'Ignition-169'
        , position: 'bb'
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 44, raw: 'Seat+169: Big Blind Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 3
        , player: 'Ignition-133'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 45, raw: 'Seat+133: UTG Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 4
        , player: 'Ignition-321'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 46, raw: 'Seat+321: UTG+1 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 5
        , player: 'Ignition-177'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 47, raw: 'Seat+177: UTG+2 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 6
        , player: 'Ignition-317'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 48, raw: 'Seat+317: UTG+3 Folded on the FLOP' } }
      , { type: 'folded'
        , seatno: 7
        , player: 'Ignition-184'
        , position: ''
        , street: 'flop'
        , bet: true
        , metadata: { lineno: 49, raw: 'Seat+184: UTG+4 Folded on the FLOP' } } ]
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
    , table: { tableno: 34, maxseats: 9, button: 8 }
    , hero: 'IgnitionHero'
    , holecards:
      { card1: '2d'
      , card2: '8s'
      , metadata:
         { lineno: 22
         , raw: 'Small Blind [ME] : Card dealt to a spot [2d 8s]' } } })
  t.end()
})
