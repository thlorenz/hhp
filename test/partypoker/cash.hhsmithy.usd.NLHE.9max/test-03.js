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
  const res = processHand(__dirname, PART, true)
  spok(t, res,
    { info:
      { metadata:
         [ { lineno: 0
           , raw: '***** Hand History for Game 198555577 *****' }
         , { lineno: 1
           , raw:
              '$0.10/$0.25 USD NL Texas Hold\'em - Tuesday, June 19, 23:12:15 EDT 2018' } ]
      , handid: '198555577'
      , gametype: 'cash'
      , currency: '$'
      , sb: 0.1
      , bb: 0.25
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , year: 2018
      , month: 6
      , day: 20
      , hour: 3
      , min: 12
      , sec: 15
      , timezone: 'GMT' }
    , table:
      { metadata:
         [ { lineno: 2, raw: 'Table Clifton (Real Money)' }
         , { lineno: 3, raw: 'Seat 6 is the button' }
         , { lineno: 4, raw: 'Total number of players : 8/9' } ]
      , table: 'Clifton'
      , button: 6
      , maxseats: 9 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 2
        , player: 'Chinchilakid'
        , chips: 26.29
        , metadata: { lineno: 5, raw: 'Seat 2: Chinchilakid ( $26.29 USD )' } }
      , { seatno: 6
        , player: 'SEOULMAN'
        , chips: 18.67
        , metadata: { lineno: 6, raw: 'Seat 6: SEOULMAN ( $18.67 USD )' } }
      , { seatno: 3
        , player: 'angrydad4999'
        , chips: 41.7
        , metadata: { lineno: 7, raw: 'Seat 3: angrydad4999 ( $41.70 USD )' } }
      , { seatno: 9
        , player: 'kakapee123'
        , chips: 13.13
        , metadata: { lineno: 8, raw: 'Seat 9: kakapee123 ( $13.13 USD )' } }
      , { seatno: 8
        , player: 'lilfay'
        , chips: 25
        , metadata: { lineno: 9, raw: 'Seat 8: lilfay ( $25 USD )' } }
      , { seatno: 7
        , player: 'marviher'
        , chips: 14.25
        , metadata: { lineno: 10, raw: 'Seat 7: marviher ( $14.25 USD )' } }
      , { seatno: 1
        , player: 'slushfund18'
        , chips: 20.63
        , metadata: { lineno: 11, raw: 'Seat 1: slushfund18 ( $20.63 USD )' } }
      , { seatno: 5
        , player: 'worley'
        , chips: 14.59
        , metadata: { lineno: 12, raw: 'Seat 5: worley ( $14.59 USD )' } } ]
    , posts:
      [ { player: 'marviher'
        , type: 'sb'
        , amount: 0.1
        , metadata:
           { lineno: 13, raw: 'marviher posts small blind [$0.10 USD].' } }
      , { player: 'lilfay'
        , type: 'bb'
        , amount: 0.25
        , metadata: { lineno: 14, raw: 'lilfay posts big blind [$0.25 USD].' } }
      , { player: 'worley'
        , type: 'bb'
        , amount: 0.35
        , metadata:
           { lineno: 15, raw: 'worley posts big blind + dead [$0.35].' } } ]
    , preflop:
      [ { player: 'kakapee123'
        , type: 'fold'
        , metadata: { lineno: 18, raw: 'kakapee123 folds' } }
      , { player: 'slushfund18'
        , type: 'call'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 19, raw: 'slushfund18 calls [$0.25 USD]' } }
      , { player: 'Chinchilakid'
        , type: 'call'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 20, raw: 'Chinchilakid calls [$0.25 USD]' } }
      , { player: 'angrydad4999'
        , type: 'fold'
        , metadata: { lineno: 21, raw: 'angrydad4999 folds' } }
      , { player: 'worley'
        , type: 'check'
        , metadata: { lineno: 22, raw: 'worley checks' } }
      , { player: 'SEOULMAN'
        , type: 'raise'
        , raiseTo: 1
        , metadata: { lineno: 23, raw: 'SEOULMAN raises [$1 USD]' } }
      , { player: 'marviher'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'marviher folds' } }
      , { player: 'lilfay'
        , type: 'fold'
        , metadata: { lineno: 25, raw: 'lilfay folds' } }
      , { player: 'slushfund18'
        , type: 'call'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 26, raw: 'slushfund18 calls [$0.75 USD]' } }
      , { player: 'Chinchilakid'
        , type: 'fold'
        , metadata: { lineno: 27, raw: 'Chinchilakid folds' } }
      , { player: 'worley'
        , type: 'fold'
        , metadata: { lineno: 28, raw: 'worley folds' } } ]
    , flop:
      [ { player: 'slushfund18'
        , type: 'bet'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 30, raw: 'slushfund18 bets [$0.25 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'call'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 31, raw: 'SEOULMAN calls [$0.25 USD]' } } ]
    , turn:
      [ { player: 'slushfund18'
        , type: 'bet'
        , amount: 1.5
        , allin: false
        , metadata: { lineno: 33, raw: 'slushfund18 bets [$1.50 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'raise'
        , raiseTo: 4
        , metadata: { lineno: 34, raw: 'SEOULMAN raises [$4 USD]' } }
      , { player: 'slushfund18'
        , type: 'call'
        , amount: 2.5
        , allin: false
        , metadata: { lineno: 35, raw: 'slushfund18 calls [$2.50 USD]' } } ]
    , river:
      [ { player: 'slushfund18'
        , type: 'bet'
        , amount: 3
        , allin: false
        , metadata: { lineno: 37, raw: 'slushfund18 bets [$3 USD]' } }
      , { player: 'SEOULMAN'
        , type: 'call'
        , amount: 3
        , allin: false
        , metadata: { lineno: 38, raw: 'SEOULMAN calls [$3 USD]' } } ]
    , showdown:
      [ { player: 'slushfund18'
        , type: 'show'
        , card1: 'Qd'
        , card2: 'Ac'
        , metadata:
           { lineno: 39
           , raw: 'slushfund18 shows [ Qd, Ac ]two pairs, Queens and Fours.' }
        , desc: 'two pairs, Queens and Fours' }
      , { player: 'SEOULMAN'
        , type: 'show'
        , card1: 'Ad'
        , card2: 'Qh'
        , metadata:
           { lineno: 40
           , raw: 'SEOULMAN shows [ Ad, Qh ]two pairs, Queens and Fours.' }
        , desc: 'two pairs, Queens and Fours' }
      , { type: 'collect'
        , player: 'slushfund18'
        , amount: 8.25
        , metadata:
           { lineno: 41
           , raw:
              'slushfund18 wins $8.25 USD from the main pot with two pairs, Queens and Fours.' } }
      , { type: 'collect'
        , player: 'SEOULMAN'
        , amount: 8.24
        , metadata:
           { lineno: 42
           , raw:
              'SEOULMAN wins $8.24 USD from the main pot with two pairs, Queens and Fours.' } } ]
    , ignored: []
    , board:
      { card1: '2c'
      , card2: '4h'
      , card3: 'Qs'
      , metadata:
         [ { lineno: 29, raw: '** Dealing Flop ** [ 2c, 4h, Qs ]' }
         , { lineno: 32, raw: '** Dealing Turn ** [ 7h ]' }
         , { lineno: 36, raw: '** Dealing River ** [ 4s ]' } ]
      , card4: '7h'
      , card5: '4s' } })
  t.end()
})
