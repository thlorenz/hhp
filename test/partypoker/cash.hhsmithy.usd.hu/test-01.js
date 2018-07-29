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
           , raw: '***** Hand History for Game 199382461 *****' }
         , { lineno: 1
           , raw:
              '$0.50/$1 USD NL Texas Hold\'em - Wednesday, July 04, 23:19:02 EDT 2018' } ]
      , handid: '199382461'
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
      , min: 19
      , sec: 2
      , timezone: 'GMT' }
    , table:
      { metadata:
         [ { lineno: 2, raw: 'Table Union (Real Money)' }
         , { lineno: 3, raw: 'Seat 1 is the button' }
         , { lineno: 4, raw: 'Total number of players : 2/2' } ]
      , table: 'Union'
      , button: 1
      , maxseats: 2 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 2
        , player: 'CopyYou'
        , chips: 97.9
        , metadata: { lineno: 5, raw: 'Seat 2: CopyYou ( $97.90 USD )' } }
      , { seatno: 1
        , player: 'j.perilli7'
        , chips: 53.84
        , metadata: { lineno: 6, raw: 'Seat 1: j.perilli7 ( $53.84 USD )' } } ]
    , posts:
      [ { player: 'j.perilli7'
        , type: 'sb'
        , amount: 0.5
        , metadata:
           { lineno: 7, raw: 'j.perilli7 posts small blind [$0.50 USD].' } }
      , { player: 'CopyYou'
        , type: 'bb'
        , amount: 1
        , metadata: { lineno: 8, raw: 'CopyYou posts big blind [$1 USD].' } } ]
    , preflop:
      [ { player: 'j.perilli7'
        , type: 'call'
        , amount: 0.5
        , allin: false
        , metadata: { lineno: 10, raw: 'j.perilli7 calls [$0.50 USD]' } }
      , { player: 'CopyYou'
        , type: 'raise'
        , raiseTo: 2
        , metadata: { lineno: 11, raw: 'CopyYou raises [$2 USD]' } }
      , { player: 'j.perilli7'
        , type: 'call'
        , amount: 2
        , allin: false
        , metadata: { lineno: 12, raw: 'j.perilli7 calls [$2 USD]' } } ]
    , flop:
      [ { player: 'CopyYou'
        , type: 'bet'
        , amount: 4.25
        , allin: false
        , metadata: { lineno: 14, raw: 'CopyYou bets [$4.25 USD]' } }
      , { player: 'j.perilli7'
        , type: 'fold'
        , metadata: { lineno: 15, raw: 'j.perilli7 folds' } } ]
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'CopyYou'
        , amount: 9.92
        , metadata: { lineno: 17, raw: 'CopyYou wins $9.92 USD' } } ]
    , ignored: []
    , board:
      { card1: '5h'
      , card2: 'Tc'
      , card3: '3s'
      , metadata: [ { lineno: 13, raw: '** Dealing Flop ** [ 5h, Tc, 3s ]' } ] } })
  t.end()
})
