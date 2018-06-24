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
           , raw: '***** Hand History for Game 15414995953 *****' }
         , { lineno: 2
           , raw:
              'NL Texas Hold\'em $1 USD Buy-in  - Sunday, July 24, 19:40:35 CEST 2016' }
         , { lineno: 8, raw: 'Trny: 128487129 Level: 3' }
         , { lineno: 9, raw: 'Blinds(20/40)' } ]
      , handid: '15414995953'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 1
      , limit: 'nolimit'
      , type: 'holdem'
      , year: 2016
      , month: 7
      , day: 24
      , hour: 17
      , min: 40
      , sec: 35
      , timezone: 'GMT'
      , gameno: '128487129'
      , level: '3'
      , sb: 20
      , bb: 40 }
    , table:
      { metadata:
         [ { lineno: 3
           , raw: 'Table $1 Sit & Go Hero (128487129) Table #1 (Real Money)' }
         , { lineno: 4, raw: 'Seat 4 is the button' }
         , { lineno: 5, raw: 'Total number of players : 2/4' } ]
      , table: '$1 Sit & Go Hero'
      , button: 4
      , maxseats: 4 }
    , hero: 'Hero'
    , holecards: { card1: 'Kc', card2: 'Qh' }
    , seats:
      [ { seatno: 4
        , player: 'Hero'
        , chips: 1740
        , metadata: { lineno: 6, raw: 'Seat 4: Hero ( 1,740 )' } }
      , { seatno: 2
        , player: 'Player1'
        , chips: 260
        , metadata: { lineno: 7, raw: 'Seat 2: Player1 ( 260 )' } } ]
    , posts:
      [ { player: 'Hero'
        , type: 'sb'
        , amount: 20
        , metadata: { lineno: 10, raw: 'Hero posts small blind [20].' } }
      , { player: 'Player1'
        , type: 'bb'
        , amount: 40
        , metadata: { lineno: 11, raw: 'Player1 posts big blind [40].' } } ]
    , preflop:
      [ { player: 'Hero'
        , type: 'raise'
        , raiseTo: 60
        , metadata: { lineno: 15, raw: 'Hero raises [60]' } }
      , { player: 'Player1'
        , type: 'raise'
        , allin: true
        , metadata: { lineno: 16, raw: 'Player1 is all-In  [220]' }
        , raiseTo: 220 }
      , { player: 'Hero'
        , type: 'call'
        , amount: 180
        , allin: false
        , metadata: { lineno: 17, raw: 'Hero calls [180]' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Hero'
        , type: 'show'
        , card1: 'Kc'
        , card2: 'Qh'
        , metadata:
           { lineno: 21
           , raw: 'Hero shows [ Kc, Qh ]two pairs, Kings and Threes.' }
        , desc: 'two pairs, Kings and Threes' }
      , { player: 'Player1'
        , type: 'show'
        , card1: '6c'
        , card2: 'As'
        , metadata:
           { lineno: 22
           , raw: 'Player1 shows [ 6c, As ]two pairs, Sixes and Threes.' }
        , desc: 'two pairs, Sixes and Threes' }
      , { type: 'collect'
        , player: 'Hero'
        , amount: 520
        , metadata:
           { lineno: 23
           , raw:
              'Hero wins 520 chips from the main pot with two pairs, Kings and Threes.' } } ]
    , ignored:
      [ { lineno: 0, raw: '#Game No : 15414995953' }
      , { lineno: 14
        , raw:
           'Your time bank will be activated in 6 secs. If you do not want it to be used, please act now.' }
      , { lineno: 24
        , raw:
           'Congratulations to player Hero for winning tournament $1 Sit & Go Hero' }
      , { lineno: 25, raw: 'Player Player1 finished in 2.' }
      , { lineno: 26
        , raw: 'Player Hero finished in 1 place and received $3 USD' } ]
    , board:
      { card1: '4s'
      , card2: '3d'
      , card3: 'Ks'
      , metadata:
         [ { lineno: 18, raw: '** Dealing Flop ** [ 4s, 3d, Ks ]' }
         , { lineno: 19, raw: '** Dealing Turn ** [ 6h ]' }
         , { lineno: 20, raw: '** Dealing River ** [ 3c ]' } ]
      , card4: '6h'
      , card5: '3c' } })
  t.end()
})
