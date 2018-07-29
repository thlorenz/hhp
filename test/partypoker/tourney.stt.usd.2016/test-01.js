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
           , raw: '***** Hand History for Game 15414977083 *****' }
         , { lineno: 2
           , raw:
              'NL Texas Hold\'em $1 USD Buy-in  - Sunday, July 24, 19:33:33 CEST 2016' }
         , { lineno: 10, raw: 'Trny: 128487129 Level: 1' }
         , { lineno: 11, raw: 'Blinds(10/20)' } ]
      , handid: '15414977083'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 1
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , year: 2016
      , month: 7
      , day: 24
      , hour: 17
      , min: 33
      , sec: 33
      , timezone: 'GMT'
      , gameno: '128487129'
      , level: '1'
      , sb: 10
      , bb: 20 }
    , table:
      { metadata:
         [ { lineno: 3
           , raw: 'Table $1 Sit & Go Hero (128487129) Table #1 (Real Money)' }
         , { lineno: 4, raw: 'Seat 1 is the button' }
         , { lineno: 5, raw: 'Total number of players : 4/4' } ]
      , table: '$1 Sit & Go Hero'
      , button: 1
      , maxseats: 4 }
    , hero: 'Hero'
    , holecards: { card1: '8s', card2: 'Kh' }
    , seats:
      [ { seatno: 4
        , player: 'Hero'
        , chips: 460
        , metadata: { lineno: 6, raw: 'Seat 4: Hero ( 460 )' } }
      , { seatno: 3
        , player: 'Player0'
        , chips: 530
        , metadata: { lineno: 7, raw: 'Seat 3: Player0 ( 530 )' } }
      , { seatno: 2
        , player: 'Player1'
        , chips: 580
        , metadata: { lineno: 8, raw: 'Seat 2: Player1 ( 580 )' } }
      , { seatno: 1
        , player: 'Player2'
        , chips: 430
        , metadata: { lineno: 9, raw: 'Seat 1: Player2 ( 430 )' } } ]
    , posts:
      [ { player: 'Player1'
        , type: 'sb'
        , amount: 10
        , metadata: { lineno: 12, raw: 'Player1 posts small blind [10].' } }
      , { player: 'Player0'
        , type: 'bb'
        , amount: 20
        , metadata: { lineno: 13, raw: 'Player0 posts big blind [20].' } } ]
    , preflop:
      [ { player: 'Hero'
        , type: 'raise'
        , raiseTo: 40
        , metadata: { lineno: 16, raw: 'Hero raises [40]' } }
      , { player: 'Player2'
        , type: 'fold'
        , metadata: { lineno: 17, raw: 'Player2 folds' } }
      , { player: 'Player1'
        , type: 'call'
        , amount: 30
        , allin: false
        , metadata: { lineno: 18, raw: 'Player1 calls [30]' } }
      , { player: 'Player0'
        , type: 'call'
        , amount: 20
        , allin: false
        , metadata: { lineno: 19, raw: 'Player0 calls [20]' } } ]
    , flop:
      [ { player: 'Player1'
        , type: 'bet'
        , amount: 60
        , allin: false
        , metadata: { lineno: 21, raw: 'Player1 bets [60]' } }
      , { player: 'Player0'
        , type: 'call'
        , amount: 60
        , allin: false
        , metadata: { lineno: 22, raw: 'Player0 calls [60]' } }
      , { player: 'Hero'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'Hero folds' } } ]
    , turn:
      [ { player: 'Player1'
        , type: 'check'
        , metadata: { lineno: 25, raw: 'Player1 checks' } }
      , { player: 'Player0'
        , type: 'check'
        , metadata: { lineno: 26, raw: 'Player0 checks' } } ]
    , river:
      [ { player: 'Player1'
        , type: 'bet'
        , amount: 60
        , allin: false
        , metadata: { lineno: 28, raw: 'Player1 bets [60]' } }
      , { player: 'Player0'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'Player0 folds' } } ]
    , showdown:
      [ { type: 'collect'
        , player: 'Player1'
        , amount: 300
        , metadata: { lineno: 31, raw: 'Player1 wins 300 chips' } } ]
    , ignored:
      [ { lineno: 0, raw: '#Game No : 15414977083' }
      , { lineno: 32, raw: 'Game #15414979501 starts.' } ]
    , board:
      { card1: 'As'
      , card2: '5c'
      , card3: '9c'
      , metadata:
         [ { lineno: 20, raw: '** Dealing Flop ** [ As, 5c, 9c ]' }
         , { lineno: 24, raw: '** Dealing Turn ** [ 2d ]' }
         , { lineno: 27, raw: '** Dealing River ** [ 7s ]' } ]
      , card4: '2d'
      , card5: '7s' } })
  t.end()
})
