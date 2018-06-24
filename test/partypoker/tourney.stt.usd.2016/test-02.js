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
           , raw: '***** Hand History for Game 15414980530 *****' }
         , { lineno: 2
           , raw:
              'NL Texas Hold\'em $1 USD Buy-in  - Sunday, July 24, 19:34:33 CEST 2016' }
         , { lineno: 10, raw: 'Trny: 128487129 Level: 1' }
         , { lineno: 11, raw: 'Blinds(10/20)' } ]
      , handid: '15414980530'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 1
      , limit: 'nolimit'
      , type: 'holdem'
      , year: 2016
      , month: 7
      , day: 24
      , hour: 17
      , min: 34
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
         , { lineno: 4, raw: 'Seat 3 is the button' }
         , { lineno: 5, raw: 'Total number of players : 4/4' } ]
      , table: '$1 Sit & Go Hero'
      , button: 3
      , maxseats: 4 }
    , hero: 'Hero'
    , holecards: { card1: '6s', card2: '7h' }
    , seats:
      [ { seatno: 4
        , player: 'Hero'
        , chips: 400
        , metadata: { lineno: 6, raw: 'Seat 4: Hero ( 400 )' } }
      , { seatno: 3
        , player: 'Player0'
        , chips: 420
        , metadata: { lineno: 7, raw: 'Seat 3: Player0 ( 420 )' } }
      , { seatno: 2
        , player: 'Player1'
        , chips: 720
        , metadata: { lineno: 8, raw: 'Seat 2: Player1 ( 720 )' } }
      , { seatno: 1
        , player: 'Player2'
        , chips: 460
        , metadata: { lineno: 9, raw: 'Seat 1: Player2 ( 460 )' } } ]
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
        , type: 'call'
        , amount: 60
        , allin: false
        , metadata: { lineno: 17, raw: 'Player0 calls [60]' } }
      , { player: 'Hero'
        , type: 'fold'
        , metadata: { lineno: 19, raw: 'Hero folds' } }
      , { player: 'Player2'
        , type: 'fold'
        , metadata: { lineno: 20, raw: 'Player2 folds' } } ]
    , flop:
      [ { player: 'Player1'
        , type: 'bet'
        , amount: 60
        , allin: false
        , metadata: { lineno: 22, raw: 'Player1 bets [60]' } }
      , { player: 'Player0'
        , type: 'call'
        , amount: 60
        , allin: false
        , metadata: { lineno: 23, raw: 'Player0 calls [60]' } } ]
    , turn:
      [ { player: 'Player1'
        , type: 'bet'
        , amount: 60
        , allin: false
        , metadata: { lineno: 25, raw: 'Player1 bets [60]' } }
      , { player: 'Player0'
        , type: 'call'
        , amount: 60
        , allin: false
        , metadata: { lineno: 26, raw: 'Player0 calls [60]' } } ]
    , river:
      [ { player: 'Player1'
        , type: 'bet'
        , amount: 80
        , allin: false
        , metadata: { lineno: 28, raw: 'Player1 bets [80]' } }
      , { player: 'Player0'
        , type: 'call'
        , amount: 80
        , allin: false
        , metadata: { lineno: 29, raw: 'Player0 calls [80]' } } ]
    , showdown:
      [ { player: 'Player1'
        , type: 'show'
        , card1: '2c'
        , card2: 'Ad'
        , metadata:
           { lineno: 30
           , raw: 'Player1 shows [ 2c, Ad ]a pair of Threes with Ace kicker.' }
        , desc: 'a pair of Threes with Ace kicker' }
      , { player: 'Player0'
        , type: 'muck'
        , card1: 'Kh'
        , card2: '6h'
        , metadata:
           { lineno: 31
           , raw: 'Player0 doesn\'t show [ Kh, 6h ]a pair of Threes.' }
        , desc: 'a pair of Threes' }
      , { type: 'collect'
        , player: 'Player1'
        , amount: 550
        , metadata:
           { lineno: 32
           , raw:
              'Player1 wins 550 chips from the main pot with a pair of Threes with Ace kicker.' } } ]
    , ignored:
      [ { lineno: 0, raw: '#Game No : 15414980530' }
      , { lineno: 18
        , raw:
           'Your time bank will be activated in 6 secs. If you do not want it to be used, please act now.' }
      , { lineno: 33, raw: 'Game #15414982283 starts.' } ]
    , board:
      { card1: '3s'
      , card2: '9s'
      , card3: '3h'
      , metadata:
         [ { lineno: 21, raw: '** Dealing Flop ** [ 3s, 9s, 3h ]' }
         , { lineno: 24, raw: '** Dealing Turn ** [ Qh ]' }
         , { lineno: 27, raw: '** Dealing River ** [ 7d ]' } ]
      , card4: 'Qh'
      , card5: '7d' } })
  t.end()
})
