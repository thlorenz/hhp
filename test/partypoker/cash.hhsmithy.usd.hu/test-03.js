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
           , raw: '***** Hand History for Game 199382553 *****' }
         , { lineno: 1
           , raw:
              '$0.50/$1 USD NL Texas Hold\'em - Wednesday, July 04, 23:20:20 EDT 2018' } ]
      , handid: '199382553'
      , gametype: 'cash'
      , currency: '$'
      , sb: 0.5
      , bb: 1
      , limit: 'nolimit'
      , type: 'holdem'
      , year: 2018
      , month: 7
      , day: 5
      , hour: 3
      , min: 20
      , sec: 20
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
        , chips: 103.47
        , metadata: { lineno: 5, raw: 'Seat 2: CopyYou ( $103.47 USD )' } }
      , { seatno: 1
        , player: 'j.perilli7'
        , chips: 47.28
        , metadata: { lineno: 6, raw: 'Seat 1: j.perilli7 ( $47.28 USD )' } } ]
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
        , type: 'check'
        , metadata: { lineno: 11, raw: 'CopyYou checks' } } ]
    , flop:
      [ { player: 'CopyYou'
        , type: 'check'
        , metadata: { lineno: 13, raw: 'CopyYou checks' } }
      , { player: 'j.perilli7'
        , type: 'check'
        , metadata: { lineno: 14, raw: 'j.perilli7 checks' } } ]
    , turn:
      [ { player: 'CopyYou'
        , type: 'check'
        , metadata: { lineno: 16, raw: 'CopyYou checks' } }
      , { player: 'j.perilli7'
        , type: 'bet'
        , amount: 1.89
        , allin: false
        , metadata: { lineno: 17, raw: 'j.perilli7 bets [$1.89 USD]' } }
      , { player: 'CopyYou'
        , type: 'call'
        , amount: 1.89
        , allin: false
        , metadata: { lineno: 18, raw: 'CopyYou calls [$1.89 USD]' } } ]
    , river:
      [ { player: 'CopyYou'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'CopyYou checks' } }
      , { player: 'j.perilli7'
        , type: 'bet'
        , amount: 2.73
        , allin: false
        , metadata: { lineno: 21, raw: 'j.perilli7 bets [$2.73 USD]' } }
      , { player: 'CopyYou'
        , type: 'fold'
        , metadata: { lineno: 22, raw: 'CopyYou folds' } } ]
    , showdown:
      [ { type: 'collect'
        , player: 'j.perilli7'
        , amount: 8.19
        , metadata: { lineno: 24, raw: 'j.perilli7 wins $8.19 USD' } } ]
    , ignored: []
    , board:
      { card1: '2c'
      , card2: '3c'
      , card3: 'Tc'
      , metadata:
         [ { lineno: 12, raw: '** Dealing Flop ** [ 2c, 3c, Tc ]' }
         , { lineno: 15, raw: '** Dealing Turn ** [ Qd ]' }
         , { lineno: 19, raw: '** Dealing River ** [ Kh ]' } ]
      , card4: 'Qd'
      , card5: 'Kh' } })
  t.end()
})
