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
           , raw: '***** Hand History for Game 198554437 *****' }
         , { lineno: 1
           , raw:
              '$0.10/$0.25 USD NL Texas Hold\'em - Tuesday, June 19, 23:00:41 EDT 2018' } ]
      , handid: '198554437'
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
      , min: 0
      , sec: 41
      , timezone: 'GMT' }
    , table:
      { metadata:
         [ { lineno: 2, raw: 'Table Clifton (Real Money)' }
         , { lineno: 3, raw: 'Seat 2 is the button' }
         , { lineno: 4, raw: 'Total number of players : 7/9' } ]
      , table: 'Clifton'
      , button: 2
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
        , chips: 28.63
        , metadata: { lineno: 6, raw: 'Seat 4: JohnPat30 ( $28.63 USD )' } }
      , { seatno: 6
        , player: 'SEOULMAN'
        , chips: 19.52
        , metadata: { lineno: 7, raw: 'Seat 6: SEOULMAN ( $19.52 USD )' } }
      , { seatno: 3
        , player: 'angrydad4999'
        , chips: 35.79
        , metadata: { lineno: 8, raw: 'Seat 3: angrydad4999 ( $35.79 USD )' } }
      , { seatno: 7
        , player: 'marviher'
        , chips: 9.07
        , metadata: { lineno: 9, raw: 'Seat 7: marviher ( $9.07 USD )' } }
      , { seatno: 1
        , player: 'slushfund18'
        , chips: 25
        , metadata: { lineno: 10, raw: 'Seat 1: slushfund18 ( $25 USD )' } }
      , { seatno: 5
        , player: 'worley'
        , chips: 17.94
        , metadata: { lineno: 11, raw: 'Seat 5: worley ( $17.94 USD )' } } ]
    , posts:
      [ { player: 'angrydad4999'
        , type: 'sb'
        , amount: 0.1
        , metadata:
           { lineno: 12
           , raw: 'angrydad4999 posts small blind [$0.10 USD].' } }
      , { player: 'JohnPat30'
        , type: 'bb'
        , amount: 0.25
        , metadata:
           { lineno: 13, raw: 'JohnPat30 posts big blind [$0.25 USD].' } }
      , { player: 'slushfund18'
        , type: 'bb'
        , amount: 0.25
        , metadata:
           { lineno: 14, raw: 'slushfund18 posts big blind [$0.25 USD].' } } ]
    , preflop:
      [ { player: 'worley'
        , type: 'call'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 16, raw: 'worley calls [$0.25 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'raise'
        , raiseTo: 0.5
        , metadata: { lineno: 17, raw: 'SEOULMAN raises [$0.50 USD]' } }
      , { player: 'marviher'
        , type: 'raise'
        , raiseTo: 0.85
        , metadata: { lineno: 18, raw: 'marviher raises [$0.85 USD]' } }
      , { player: 'slushfund18'
        , type: 'call'
        , amount: 0.6
        , allin: false
        , metadata: { lineno: 19, raw: 'slushfund18 calls [$0.60 USD]' } }
      , { player: 'Chinchilakid'
        , type: 'fold'
        , metadata: { lineno: 20, raw: 'Chinchilakid folds' } }
      , { player: 'angrydad4999'
        , type: 'call'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 22, raw: 'angrydad4999 calls [$0.75 USD]' } }
      , { player: 'JohnPat30'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'JohnPat30 folds' } }
      , { player: 'worley'
        , type: 'call'
        , amount: 0.6
        , allin: false
        , metadata: { lineno: 24, raw: 'worley calls [$0.60 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'call'
        , amount: 0.35
        , allin: false
        , metadata: { lineno: 25, raw: 'SEOULMAN calls [$0.35 USD]' } } ]
    , flop:
      [ { player: 'angrydad4999'
        , type: 'check'
        , metadata: { lineno: 27, raw: 'angrydad4999 checks' } }
      , { player: 'worley'
        , type: 'check'
        , metadata: { lineno: 28, raw: 'worley checks' } }
      , { player: 'SEOULMAN'
        , type: 'check'
        , metadata: { lineno: 29, raw: 'SEOULMAN checks' } }
      , { player: 'marviher'
        , type: 'check'
        , metadata: { lineno: 30, raw: 'marviher checks' } }
      , { player: 'slushfund18'
        , type: 'bet'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 31, raw: 'slushfund18 bets [$0.75 USD]' } }
      , { player: 'angrydad4999'
        , type: 'fold'
        , metadata: { lineno: 32, raw: 'angrydad4999 folds' } }
      , { player: 'worley'
        , type: 'call'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 33, raw: 'worley calls [$0.75 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'call'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 34, raw: 'SEOULMAN calls [$0.75 USD]' } }
      , { player: 'marviher'
        , type: 'call'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 35, raw: 'marviher calls [$0.75 USD]' } } ]
    , turn:
      [ { player: 'worley'
        , type: 'check'
        , metadata: { lineno: 37, raw: 'worley checks' } }
      , { player: 'SEOULMAN'
        , type: 'check'
        , metadata: { lineno: 38, raw: 'SEOULMAN checks' } }
      , { player: 'marviher'
        , type: 'check'
        , metadata: { lineno: 39, raw: 'marviher checks' } }
      , { player: 'slushfund18'
        , type: 'check'
        , metadata: { lineno: 40, raw: 'slushfund18 checks' } } ]
    , river:
      [ { player: 'worley'
        , type: 'check'
        , metadata: { lineno: 42, raw: 'worley checks' } }
      , { player: 'SEOULMAN'
        , type: 'check'
        , metadata: { lineno: 43, raw: 'SEOULMAN checks' } }
      , { player: 'marviher'
        , type: 'bet'
        , amount: 7.09
        , allin: false
        , metadata: { lineno: 44, raw: 'marviher bets [$7.09 USD]' } }
      , { player: 'slushfund18'
        , type: 'fold'
        , metadata: { lineno: 45, raw: 'slushfund18 folds' } }
      , { player: 'worley'
        , type: 'fold'
        , metadata: { lineno: 46, raw: 'worley folds' } }
      , { player: 'SEOULMAN'
        , type: 'fold'
        , metadata: { lineno: 47, raw: 'SEOULMAN folds' } } ]
    , showdown:
      [ { type: 'collect'
        , player: 'marviher'
        , amount: 14.18
        , metadata: { lineno: 49, raw: 'marviher wins $14.18 USD' } } ]
    , ignored:
      [ { lineno: 21, raw: 'ProfessorH has joined the table.' }
      , { lineno: 48, raw: 'marviher does not show cards.' } ]
    , board:
      { card1: '4c'
      , card2: '3s'
      , card3: '7c'
      , metadata:
         [ { lineno: 26, raw: '** Dealing Flop ** [ 4c, 3s, 7c ]' }
         , { lineno: 36, raw: '** Dealing Turn ** [ 2s ]' }
         , { lineno: 41, raw: '** Dealing River ** [ Qs ]' } ]
      , card4: '2s'
      , card5: 'Qs' } })
  t.end()
})
