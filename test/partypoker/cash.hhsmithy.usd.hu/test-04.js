'use strict'

const path = require('path')
const ROOM = 'partypoker'
const GAME = __dirname.split('/').pop()
const PART = parseInt(path.basename(__filename).split('-')[1])

const test = require('tape')
const processHand = require('../../util/process-hand')
// eslint-disable-next-line no-unused-vars
const ocat = require('ocat').applyRes5Opts()
const spok = require('spok')

test(`${ROOM}: ${GAME} - ${PART}`, function(t) {
  const res = processHand(__dirname, PART)
  spok(t, res,
    { info:
      { metadata:
         [ { lineno: 0
           , raw: '***** Hand History for Game 199382575 *****' }
         , { lineno: 1
           , raw:
              '$0.50/$1 USD NL Texas Hold\'em - Wednesday, July 04, 23:20:42 EDT 2018' } ]
      , handid: '199382575'
      , gametype: 'cash'
      , currency: '$'
      , sb: 0.5
      , bb: 1
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , year: 2018
      , month: 7
      , day: 5
      , hour: 3
      , min: 20
      , sec: 42
      , timezone: 'GMT' }
    , table:
      { metadata:
         [ { lineno: 2, raw: 'Table Union (Real Money)' }
         , { lineno: 3, raw: 'Seat 2 is the button' }
         , { lineno: 4, raw: 'Total number of players : 2/2' } ]
      , table: 'Union'
      , button: 2
      , maxseats: 2 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 2
        , player: 'CopyYou'
        , chips: 100.58
        , metadata: { lineno: 5, raw: 'Seat 2: CopyYou ( $100.58 USD )' } }
      , { seatno: 1
        , player: 'j.perilli7'
        , chips: 49.85
        , metadata: { lineno: 6, raw: 'Seat 1: j.perilli7 ( $49.85 USD )' } } ]
    , posts:
      [ { player: 'CopyYou'
        , type: 'sb'
        , amount: 0.5
        , metadata: { lineno: 7, raw: 'CopyYou posts small blind [$0.50 USD].' } }
      , { player: 'j.perilli7'
        , type: 'bb'
        , amount: 1
        , metadata: { lineno: 8, raw: 'j.perilli7 posts big blind [$1 USD].' } } ]
    , preflop:
      [ { player: 'CopyYou'
        , type: 'raise'
        , raiseTo: 2.5
        , metadata: { lineno: 10, raw: 'CopyYou raises [$2.50 USD]' } }
      , { player: 'j.perilli7'
        , type: 'raise'
        , raiseTo: 9
        , metadata: { lineno: 11, raw: 'j.perilli7 raises [$9 USD]' } }
      , { player: 'CopyYou'
        , type: 'raise'
        , allin: true
        , metadata: { lineno: 12, raw: 'CopyYou is all-In  [$97.58 USD]' }
        , raiseTo: 97.58 }
      , { player: 'j.perilli7'
        , type: 'call'
        , amount: 39.85
        , allin: true
        , metadata: { lineno: 13, raw: 'j.perilli7 is all-In  [$39.85 USD]' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'j.perilli7'
        , type: 'show'
        , card1: '9s'
        , card2: 'As'
        , metadata:
           { lineno: 17
           , raw: 'j.perilli7 shows [ 9s, As ]two pairs, Aces and Jacks.' }
        , desc: 'two pairs, Aces and Jacks' }
      , { player: 'CopyYou'
        , type: 'show'
        , card1: '7h'
        , card2: '7c'
        , metadata:
           { lineno: 18
           , raw: 'CopyYou shows [ 7h, 7c ]two pairs, Jacks and Sevens.' }
        , desc: 'two pairs, Jacks and Sevens' }
      , { type: 'collect'
        , player: 'CopyYou'
        , amount: 50.73
        , metadata:
           { lineno: 19
           , raw:
              'CopyYou wins $50.73 USD from the side pot 1 with two pairs, Jacks and Sevens.' } }
      , { type: 'collect'
        , player: 'j.perilli7'
        , amount: 99.2
        , metadata:
           { lineno: 20
           , raw:
              'j.perilli7 wins $99.20 USD from the main pot with two pairs, Aces and Jacks.' } } ]
    , ignored: []
    , board:
      { card1: 'Jh'
      , card2: 'Ac'
      , card3: 'Jd'
      , metadata:
         [ { lineno: 14, raw: '** Dealing Flop ** [ Jh, Ac, Jd ]' }
         , { lineno: 15, raw: '** Dealing Turn ** [ 8d ]' }
         , { lineno: 16, raw: '** Dealing River ** [ Ks ]' } ]
      , card4: '8d'
      , card5: 'Ks' } })
  t.end()
})
