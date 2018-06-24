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
         [ { lineno: 0
           , raw: '***** Hand History for Game 198555531 *****' }
         , { lineno: 1
           , raw:
              '$0.10/$0.25 USD NL Texas Hold\'em - Tuesday, June 19, 23:11:43 EDT 2018' } ]
      , handid: '198555531'
      , gametype: 'cash'
      , currency: '$'
      , sb: 0.1
      , bb: 0.25
      , limit: 'nolimit'
      , type: 'holdem'
      , year: 2018
      , month: 6
      , day: 20
      , hour: 3
      , min: 11
      , sec: 43
      , timezone: 'GMT' }
    , table:
      { metadata:
         [ { lineno: 2, raw: 'Table Clifton (Real Money)' }
         , { lineno: 3, raw: 'Seat 3 is the button' }
         , { lineno: 4, raw: 'Total number of players : 9/9' } ]
      , table: 'Clifton'
      , button: 3
      , maxseats: 9 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 2
        , player: 'Chinchilakid'
        , chips: 26.29
        , metadata: { lineno: 5, raw: 'Seat 2: Chinchilakid ( $26.29 USD )' } }
      , { seatno: 4
        , player: 'JohnPat30'
        , chips: 28.28
        , metadata: { lineno: 6, raw: 'Seat 4: JohnPat30 ( $28.28 USD )' } }
      , { seatno: 6
        , player: 'SEOULMAN'
        , chips: 18.77
        , metadata: { lineno: 7, raw: 'Seat 6: SEOULMAN ( $18.77 USD )' } }
      , { seatno: 3
        , player: 'angrydad4999'
        , chips: 41.35
        , metadata: { lineno: 8, raw: 'Seat 3: angrydad4999 ( $41.35 USD )' } }
      , { seatno: 9
        , player: 'kakapee123'
        , chips: 13.13
        , metadata: { lineno: 9, raw: 'Seat 9: kakapee123 ( $13.13 USD )' } }
      , { seatno: 8
        , player: 'lilfay'
        , chips: 25
        , metadata: { lineno: 10, raw: 'Seat 8: lilfay ( $25 USD )' } }
      , { seatno: 7
        , player: 'marviher'
        , chips: 14.5
        , metadata: { lineno: 11, raw: 'Seat 7: marviher ( $14.50 USD )' } }
      , { seatno: 1
        , player: 'slushfund18'
        , chips: 20.63
        , metadata: { lineno: 12, raw: 'Seat 1: slushfund18 ( $20.63 USD )' } }
      , { seatno: 5
        , player: 'worley'
        , chips: 14.59
        , metadata: { lineno: 13, raw: 'Seat 5: worley ( $14.59 USD )' } } ]
    , posts:
      [ { player: 'SEOULMAN'
        , type: 'sb'
        , amount: 0.1
        , metadata:
           { lineno: 14, raw: 'SEOULMAN posts small blind [$0.10 USD].' } }
      , { player: 'marviher'
        , type: 'bb'
        , amount: 0.25
        , metadata: { lineno: 15, raw: 'marviher posts big blind [$0.25 USD].' } } ]
    , preflop:
      [ { player: 'kakapee123'
        , type: 'fold'
        , metadata: { lineno: 18, raw: 'kakapee123 folds' } }
      , { player: 'slushfund18'
        , type: 'fold'
        , metadata: { lineno: 19, raw: 'slushfund18 folds' } }
      , { player: 'Chinchilakid'
        , type: 'fold'
        , metadata: { lineno: 20, raw: 'Chinchilakid folds' } }
      , { player: 'angrydad4999'
        , type: 'raise'
        , raiseTo: 0.75
        , metadata: { lineno: 21, raw: 'angrydad4999 raises [$0.75 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'fold'
        , metadata: { lineno: 22, raw: 'SEOULMAN folds' } }
      , { player: 'marviher'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'marviher folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'angrydad4999'
        , amount: 1.1
        , metadata: { lineno: 25, raw: 'angrydad4999 wins $1.10 USD' } } ]
    , ignored:
      [ { lineno: 17, raw: 'JohnPat30 has left the table.' }
      , { lineno: 24, raw: 'angrydad4999 does not show cards.' } ] })
  t.end()
})
