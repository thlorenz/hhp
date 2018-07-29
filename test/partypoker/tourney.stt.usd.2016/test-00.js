'use strict'

const ROOM = 'partypoker'
const GAME = __dirname.split('/').pop()
const PART = parseInt(__filename.split('-')[1])

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
         [ { lineno: 1
           , raw: '***** Hand History for Game 15414973533 *****' }
         , { lineno: 2
           , raw:
              'NL Texas Hold\'em $1 USD Buy-in  - Sunday, July 24, 19:32:00 CEST 2016' }
         , { lineno: 10, raw: 'Trny: 128487129 Level: 1' }
         , { lineno: 11, raw: 'Blinds(10/20)' } ]
      , handid: '15414973533'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 1
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , year: 2016
      , month: 7
      , day: 24
      , hour: 17
      , min: 32
      , sec: 0
      , timezone: 'GMT'
      , gameno: '128487129'
      , level: '1'
      , sb: 10
      , bb: 20 }
    , table:
      { metadata:
         [ { lineno: 3
           , raw: 'Table $1 Sit & Go Hero (128487129) Table #1 (Real Money)' }
         , { lineno: 4, raw: 'Seat 3 is the button' }
         , { lineno: 5, raw: 'Total number of players : 4/4' } ]
      , table: '$1 Sit & Go Hero'
      , button: 3
      , maxseats: 4 }
    , hero: 'Hero'
    , holecards: { card1: '3h', card2: 'Js' }
    , seats:
      [ { seatno: 4
        , player: 'Hero'
        , chips: 500
        , metadata: { lineno: 6, raw: 'Seat 4: Hero ( 500 )' } }
      , { seatno: 3
        , player: 'Player0'
        , chips: 500
        , metadata: { lineno: 7, raw: 'Seat 3: Player0 ( 500 )' } }
      , { seatno: 2
        , player: 'Player1'
        , chips: 500
        , metadata: { lineno: 8, raw: 'Seat 2: Player1 ( 500 )' } }
      , { seatno: 1
        , player: 'Player2'
        , chips: 500
        , metadata: { lineno: 9, raw: 'Seat 1: Player2 ( 500 )' } } ]
    , posts:
      [ { player: 'Hero'
        , type: 'sb'
        , amount: 10
        , metadata: { lineno: 12, raw: 'Hero posts small blind [10].' } }
      , { player: 'Player2'
        , type: 'bb'
        , amount: 20
        , metadata: { lineno: 13, raw: 'Player2 posts big blind [20].' } } ]
    , preflop:
      [ { player: 'Player1'
        , type: 'raise'
        , raiseTo: 60
        , metadata: { lineno: 16, raw: 'Player1 raises [60]' } }
      , { player: 'Player0'
        , type: 'fold'
        , metadata: { lineno: 17, raw: 'Player0 folds' } }
      , { player: 'Hero'
        , type: 'fold'
        , metadata: { lineno: 18, raw: 'Hero folds' } }
      , { player: 'Player2'
        , type: 'fold'
        , metadata: { lineno: 19, raw: 'Player2 folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'Player1'
        , amount: 90
        , metadata: { lineno: 21, raw: 'Player1 wins 90 chips' } } ]
    , ignored:
      [ { lineno: 0, raw: '#Game No : 15414973533' }
      , { lineno: 22, raw: 'Game #15414973928 starts.' } ] })
  t.end()
})
