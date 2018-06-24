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
           , raw: '***** Hand History for Game 199382505 *****' }
         , { lineno: 1
           , raw:
              '$0.50/$1 USD NL Texas Hold\'em - Wednesday, July 04, 23:19:38 EDT 2018' } ]
      , handid: '199382505'
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
      , min: 19
      , sec: 38
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
        , chips: 102.35
        , metadata: { lineno: 5, raw: 'Seat 2: CopyYou ( $102.35 USD )' } }
      , { seatno: 1
        , player: 'j.perilli7'
        , chips: 48.84
        , metadata: { lineno: 6, raw: 'Seat 1: j.perilli7 ( $48.84 USD )' } } ]
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
        , type: 'check'
        , metadata: { lineno: 17, raw: 'j.perilli7 checks' } } ]
    , river:
      [ { player: 'CopyYou'
        , type: 'check'
        , metadata: { lineno: 19, raw: 'CopyYou checks' } }
      , { player: 'j.perilli7'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'j.perilli7 checks' } } ]
    , showdown:
      [ { player: 'CopyYou'
        , type: 'show'
        , card1: '5s'
        , card2: '8c'
        , metadata:
           { lineno: 21, raw: 'CopyYou shows [ 5s, 8c ]a pair of Sixes.' }
        , desc: 'a pair of Sixes' }
      , { player: 'j.perilli7'
        , type: 'show'
        , card1: '4s'
        , card2: '5h'
        , metadata:
           { lineno: 22
           , raw: 'j.perilli7 shows [ 4s, 5h ]a pair of Sixes.' }
        , desc: 'a pair of Sixes' }
      , { type: 'collect'
        , player: 'j.perilli7'
        , amount: 0.94
        , metadata:
           { lineno: 23
           , raw:
              'j.perilli7 wins $0.94 USD from the main pot with a pair of Sixes.' } }
      , { type: 'collect'
        , player: 'CopyYou'
        , amount: 0.95
        , metadata:
           { lineno: 24
           , raw:
              'CopyYou wins $0.95 USD from the main pot with a pair of Sixes.' } } ]
    , ignored: []
    , board:
      { card1: 'Jd'
      , card2: 'Ad'
      , card3: '6d'
      , metadata:
         [ { lineno: 12, raw: '** Dealing Flop ** [ Jd, Ad, 6d ]' }
         , { lineno: 15, raw: '** Dealing Turn ** [ Td ]' }
         , { lineno: 18, raw: '** Dealing River ** [ 6h ]' } ]
      , card4: 'Td'
      , card5: '6h' } })
  t.end()
})
