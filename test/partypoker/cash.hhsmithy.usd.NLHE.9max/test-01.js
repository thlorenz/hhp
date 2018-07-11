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
           , raw: '***** Hand History for Game 198554571 *****' }
         , { lineno: 1
           , raw:
              '$0.10/$0.25 USD NL Texas Hold\'em - Tuesday, June 19, 23:02:26 EDT 2018' } ]
      , handid: '198554571'
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
      , min: 2
      , sec: 26
      , timezone: 'GMT' }
    , table:
      { metadata:
         [ { lineno: 2, raw: 'Table Clifton (Real Money)' }
         , { lineno: 3, raw: 'Seat 3 is the button' }
         , { lineno: 4, raw: 'Total number of players : 8/9' } ]
      , table: 'Clifton'
      , button: 3
      , maxseats: 9 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 2
        , player: 'Chinchilakid'
        , chips: 28.45
        , metadata: { lineno: 5, raw: 'Seat 2: Chinchilakid ( $28.45 USD )' } }
      , { seatno: 4
        , player: 'JohnPat30'
        , chips: 28.38
        , metadata: { lineno: 6, raw: 'Seat 4: JohnPat30 ( $28.38 USD )' } }
      , { seatno: 8
        , player: 'ProfessorH'
        , chips: 25
        , metadata: { lineno: 7, raw: 'Seat 8: ProfessorH ( $25 USD )' } }
      , { seatno: 6
        , player: 'SEOULMAN'
        , chips: 17.92
        , metadata: { lineno: 8, raw: 'Seat 6: SEOULMAN ( $17.92 USD )' } }
      , { seatno: 3
        , player: 'angrydad4999'
        , chips: 34.94
        , metadata: { lineno: 9, raw: 'Seat 3: angrydad4999 ( $34.94 USD )' } }
      , { seatno: 7
        , player: 'marviher'
        , chips: 14.56
        , metadata: { lineno: 10, raw: 'Seat 7: marviher ( $14.56 USD )' } }
      , { seatno: 1
        , player: 'slushfund18'
        , chips: 23.4
        , metadata: { lineno: 11, raw: 'Seat 1: slushfund18 ( $23.40 USD )' } }
      , { seatno: 5
        , player: 'worley'
        , chips: 16.34
        , metadata: { lineno: 12, raw: 'Seat 5: worley ( $16.34 USD )' } } ]
    , posts:
      [ { player: 'JohnPat30'
        , type: 'sb'
        , amount: 0.1
        , metadata:
           { lineno: 13, raw: 'JohnPat30 posts small blind [$0.10 USD].' } }
      , { player: 'worley'
        , type: 'bb'
        , amount: 0.25
        , metadata: { lineno: 14, raw: 'worley posts big blind [$0.25 USD].' } }
      , { player: 'ProfessorH'
        , type: 'bb'
        , amount: 0.25
        , metadata:
           { lineno: 15, raw: 'ProfessorH posts big blind [$0.25 USD].' } } ]
    , preflop:
      [ { player: 'SEOULMAN'
        , type: 'fold'
        , metadata: { lineno: 17, raw: 'SEOULMAN folds' } }
      , { player: 'marviher'
        , type: 'raise'
        , raiseTo: 1.1
        , metadata: { lineno: 18, raw: 'marviher raises [$1.10 USD]' } }
      , { player: 'ProfessorH'
        , type: 'fold'
        , metadata: { lineno: 19, raw: 'ProfessorH folds' } }
      , { player: 'slushfund18'
        , type: 'fold'
        , metadata: { lineno: 20, raw: 'slushfund18 folds' } }
      , { player: 'Chinchilakid'
        , type: 'fold'
        , metadata: { lineno: 21, raw: 'Chinchilakid folds' } }
      , { player: 'angrydad4999'
        , type: 'fold'
        , metadata: { lineno: 22, raw: 'angrydad4999 folds' } }
      , { player: 'JohnPat30'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'JohnPat30 folds' } }
      , { player: 'worley'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'worley folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'marviher'
        , amount: 1.7
        , metadata: { lineno: 26, raw: 'marviher wins $1.70 USD' } } ]
    , ignored: [] })
  t.end()
})
