const spok = require('spok')
const test = require('tape')
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'sng-winning-last.txt'), 'utf8')
const res = parse(txt)

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
/* eslint-ensable no-unused-vars */

test('\nIgnition: sng last hand headsup hero looses, also includes Ante and an Allin raise', function(t) {
  spok(t, res,
    { seats:
      [ { seatno: 3
        , player: 'Big Blind'
        , chips: 11900
        , metadata: { lineno: 1, raw: 'Seat 3: Big Blind (11,900 in chips)' } }
      , { seatno: 2
        , player: 'hero'
        , chips: 1600
        , metadata: { lineno: 2, raw: 'Seat 2: Dealer [ME] (1,600 in chips)' } } ]
    , posts:
      [ { player: 'Big Blind'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 4, raw: 'Big Blind : Ante chip 50' } }
      , { player: 'hero'
        , type: 'ante'
        , amount: 50
        , metadata: { lineno: 5, raw: 'Dealer [ME] : Ante chip 50' } }
      , { player: 'hero'
        , type: 'sb'
        , amount: 250
        , metadata: { lineno: 6, raw: 'Dealer [ME] : Small blind 250' } }
      , { player: 'Big Blind'
        , type: 'bb'
        , amount: 500
        , metadata: { lineno: 7, raw: 'Big Blind : Big blind 500' } } ]
    , preflop:
      [ { player: 'hero'
        , type: 'raise'
        , amount: 1300
        , raiseTo: 1550
        , allin: true
        , metadata: { lineno: 11, raw: 'Dealer [ME] : All-in(raise) 1300 to 1550' } }
      , { player: 'Big Blind'
        , type: 'call'
        , amount: 1050
        , metadata: { lineno: 12, raw: 'Big Blind : Call 1050' } } ]
    , flop: []
    , turn: []
    , river:
      [ { player: 'Big Blind :'
        , type: 'collect'
        , amount: 3200
        , metadata: { lineno: 18, raw: 'Big Blind : Hand Result 3200' } } ]
    , showdown:
      [ { player: 'Big Blind'
        , type: 'reveal'
        , card1: 'Tc'
        , card2: 'As'
        , metadata: { lineno: 9, raw: 'Big Blind : Card dealt to a spot [Tc As]' } } ]
    , info:
      { room: 'ignition'
      , handid: '3549255643'
      , pokertype: 'holdem'
      , sb: 250
      , bb: 500
      , year: 2017
      , month: 7
      , day: 23
      , hour: 21
      , min: 54
      , sec: 3
      , gameno: '18534183'
      , level: '9'
      , gametype: 'tournament'
      , metadata:
         { lineno: 0
         , raw: 'Ignition Hand #3549255643: HOLDEM Tournament #18534183 TBL#1, Normal- Level 9 (250/500) - 2017-07-23 21:54:37' }
      , ante: 50 }
    , table: { tableno: 1 }
    , hero: 'hero'
    , holecards:
      { card1: '9s'
      , card2: 'Qd'
      , metadata:
         { lineno: 10
         , raw: 'Dealer [ME] : Card dealt to a spot [9s Qd]' } }
    , board:
      { card1: '2d'
      , card2: 'Td'
      , card3: '5s'
      , card4: '5d'
      , card5: '3c'
      , metadata: { lineno: 27, raw: 'Board [2d Td 5s 5d 3c]' } } })
  t.end()
})
