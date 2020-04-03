'use strict'

const spok = require('spok')
const test = require('tape')
const { parseHand } = require('../../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, '..', 'fixtures')

/* eslint-disable camelcase */
const holdem_ig = path.join(fixtures, 'holdem', 'ignition')

const txt = fs.readFileSync(path.join(holdem_ig, 'cash.zone.txt'), 'utf8')
const res = parseHand(txt)

test('\nIgnition: sng last hand headsup hero looses, also includes Ante and an Allin raise', function(t) {
  spok(t, res,
    { seats:
      [ { seatno: 1
        , player: 'IgnitionHero'
        , chips: 100
        , metadata: { lineno: 1, raw: 'Seat 1: Big Blind [ME] ($100 in chips)' } }
      , { seatno: 2
        , player: 'Ignition-2'
        , chips: 47.3
        , metadata: { lineno: 2, raw: 'Seat 2: UTG ($47.30 in chips)' } }
      , { seatno: 3
        , player: 'Ignition-3'
        , chips: 98.5
        , metadata: { lineno: 3, raw: 'Seat 3: UTG+1 ($98.50 in chips)' } }
      , { seatno: 4
        , player: 'Ignition-4'
        , chips: 91.65
        , metadata: { lineno: 4, raw: 'Seat 4: UTG+2 ($91.65 in chips)' } }
      , { seatno: 5
        , player: 'Ignition-5'
        , chips: 124.41
        , metadata: { lineno: 5, raw: 'Seat 5: Dealer ($124.41 in chips)' }
        , isbutton: true }
      , { seatno: 6
        , player: 'Ignition-6'
        , chips: 102
        , metadata: { lineno: 6, raw: 'Seat 6: Small Blind ($102 in chips)' } } ]
    , posts:
      [ { player: 'Ignition-6'
        , type: 'sb'
        , amount: 0.5
        , metadata: { lineno: 8, raw: 'Small Blind : Small Blind $0.50' }
        , seatno: 6 }
      , { player: 'IgnitionHero'
        , type: 'bb'
        , amount: 1
        , metadata: { lineno: 9, raw: 'Big Blind [ME] : Big blind $1' }
        , seatno: 1 } ]
    , preflop:
      [ { player: 'Ignition-2'
        , type: 'fold'
        , metadata: { lineno: 17, raw: 'UTG : Folds' }
        , seatno: 2 }
      , { player: 'Ignition-3'
        , type: 'fold'
        , metadata: { lineno: 21, raw: 'UTG+1 : Folds' }
        , seatno: 3 }
      , { player: 'Ignition-4'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'UTG+2 : Folds' }
        , seatno: 4 }
      , { player: 'Ignition-5'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'Dealer : Folds' }
        , seatno: 5 }
      , { player: 'Ignition-6'
        , type: 'fold'
        , metadata: { lineno: 25, raw: 'Small Blind : Folds' }
        , seatno: 6 } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Ignition-2'
        , type: 'reveal'
        , card1: '2h'
        , card2: '5d'
        , metadata: { lineno: 12, raw: 'UTG : Card dealt to a spot [2h 5d]' }
        , seatno: 2 }
      , { player: 'Ignition-3'
        , type: 'reveal'
        , card1: 'Kh'
        , card2: '8c'
        , metadata: { lineno: 13, raw: 'UTG+1 : Card dealt to a spot [Kh 8c]' }
        , seatno: 3 }
      , { player: 'Ignition-4'
        , type: 'reveal'
        , card1: 'Js'
        , card2: '3s'
        , metadata: { lineno: 14, raw: 'UTG+2 : Card dealt to a spot [Js 3s]' }
        , seatno: 4 }
      , { player: 'Ignition-5'
        , type: 'reveal'
        , card1: 'Jc'
        , card2: '9d'
        , metadata: { lineno: 15, raw: 'Dealer : Card dealt to a spot [Jc 9d]' }
        , seatno: 5 }
      , { player: 'Ignition-6'
        , type: 'reveal'
        , card1: '4c'
        , card2: 'Qs'
        , metadata:
           { lineno: 16
           , raw: 'Small Blind : Card dealt to a spot [4c Qs]' }
        , seatno: 6 }
      , { player: 'IgnitionHero'
        , type: 'show'
        , metadata: { lineno: 27, raw: 'Big Blind [ME] : Showdown(High Card)' }
        , desc: 'high card'
        , card1: 'Th'
        , card2: '3c'
        , seatno: 1 }
      , { player: 'IgnitionHero'
        , type: 'collect'
        , amount: 1.5
        , pot: null
        , metadata: { lineno: 28, raw: 'Big Blind [ME] : Hand result $1.50' }
        , seatno: 1 } ]
    , summary:
      [ { type: 'pot'
        , single: true
        , amount: 1.5
        , metadata: { lineno: 37, raw: 'Total Pot($1.50)' } }
      , { type: 'showed'
        , won: true
        , seatno: 1
        , player: 'IgnitionHero'
        , position: 'bb'
        , card1: 'Th'
        , card2: '3c'
        , amount: 1.5
        , description: 'High Card'
        , metadata:
           { lineno: 38
           , raw: 'Seat+1: Big Blind $1.50  with High Card [Th 3c]' } }
      , { type: 'folded'
        , seatno: 2
        , player: 'Ignition-2'
        , position: ''
        , street: 'preflop'
        , bet: true
        , metadata: { lineno: 39, raw: 'Seat+2: UTG Folded before the FLOP' } }
      , { type: 'folded'
        , seatno: 3
        , player: 'Ignition-3'
        , position: ''
        , street: 'preflop'
        , bet: true
        , metadata: { lineno: 40, raw: 'Seat+3: UTG+1 Folded before the FLOP' } }
      , { type: 'showed'
        , won: false
        , seatno: 4
        , player: 'Ignition-4'
        , position: ''
        , card1: 'Js'
        , card2: '3s'
        , description: 'High Card'
        , metadata: { lineno: 41, raw: 'Seat+4: UTG+2 lost with High Card [Js 3s]' } }
      , { type: 'showed'
        , won: false
        , seatno: 5
        , player: 'Ignition-5'
        , position: 'bu'
        , card1: 'Jc'
        , card2: '9d'
        , description: 'High Card'
        , metadata:
           { lineno: 42
           , raw: 'Seat+5: Dealer lost with High Card [Jc 9d]' } }
      , { type: 'folded'
        , seatno: 6
        , player: 'Ignition-6'
        , position: 'sb'
        , street: 'preflop'
        , bet: true
        , metadata:
           { lineno: 43
           , raw: 'Seat+6: Small Blind Folded before the FLOP' } } ]
    , info:
      { room: 'ignition'
      , handid: '3372762461'
      , pokertype: 'holdem'
      , limit: 'nolimit'
      , year: 2016
      , month: 10
      , day: 16
      , hour: 13
      , min: 55
      , sec: 3
      , gametype: 'cashgame'
      , fast: true
      , metadata:
         { lineno: 0
         , raw: 'Ignition Hand #3372762461  Zone Poker ID#875 HOLDEMZonePoker No Limit - 2016-10-16 13:55:35' }
      , currency: '$'
      , sb: 0.5
      , bb: 1 }
    , table: { tableno: '875', maxseats: 6, button: 5 }
    , hero: 'IgnitionHero'
    , holecards:
      { card1: 'Th'
      , card2: '3c'
      , metadata:
         { lineno: 11
         , raw: 'Big Blind [ME] : Card dealt to a spot [Th 3c]' } } })
  t.end()
})
