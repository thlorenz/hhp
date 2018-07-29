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
  // Doesn't specify timezone, therefore local one is assumed which is why
  // we'll allow a range for day and hour
  spok(t, res,
    { info:
      { metadata:
         [ { lineno: 1
           , raw: '***** Hand History for Game 13165152578 *****' }
         , { lineno: 2
           , raw:
              'NL Texas Hold\'em $ 530 USD Buy-in Trny:3282980 Level:18  Blinds-Antes(1,250/2,500 -250) - Sunday, July 28, 21:01:39  2013' }
         , { lineno: 14, raw: 'Trny:3282980 Level:18' }
         , { lineno: 15, raw: 'Blinds-Antes(1,250/2,500 -250)' } ]
      , handid: '13165152578'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 530
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , year: 2013
      , month: 7
      , day: spok.range(28, 29)
      , hour: spok.range(0, 23)
      , min: 1
      , sec: 39
      , timezone: 'GMT'
      , gameno: '3282980'
      , level: '18'
      , sb: 1250
      , bb: 2500
      , ante: 250 }
    , table:
      { metadata:
         [ { lineno: 3
           , raw:
              'Table $100,000 Gtd High Roller (3282980) Table #7 (Real Money)' }
         , { lineno: 4, raw: 'Seat 2 is the button' }
         , { lineno: 5, raw: 'Total number of players : 8/10' } ]
      , table: '$100,000 Gtd High Roller'
      , button: 2
      , maxseats: 10 }
    , hero: 'Hero'
    , holecards: { card1: '2h', card2: '5s' }
    , seats:
      [ { seatno: 9
        , player: 'Player0'
        , chips: 86425
        , metadata: { lineno: 6, raw: 'Seat 9: Player0 ( 86,425 )' } }
      , { seatno: 7
        , player: 'Player1'
        , chips: 191706
        , metadata: { lineno: 7, raw: 'Seat 7: Player1 ( 191,706 )' } }
      , { seatno: 3
        , player: 'Player2'
        , chips: 65173
        , metadata: { lineno: 8, raw: 'Seat 3: Player2 ( 65,173 )' } }
      , { seatno: 5
        , player: 'Player3'
        , chips: 76467
        , metadata: { lineno: 9, raw: 'Seat 5: Player3 ( 76,467 )' } }
      , { seatno: 10
        , player: 'Player4'
        , chips: 51166
        , metadata: { lineno: 10, raw: 'Seat 10: Player4 ( 51,166 )' } }
      , { seatno: 4
        , player: 'Hero'
        , chips: 172173
        , metadata: { lineno: 11, raw: 'Seat 4: Hero ( 172,173 )' } }
      , { seatno: 8
        , player: 'Player5'
        , chips: 169642
        , metadata: { lineno: 12, raw: 'Seat 8: Player5 ( 169,642 )' } }
      , { seatno: 2
        , player: 'Player6'
        , chips: 92248
        , metadata: { lineno: 13, raw: 'Seat 2: Player6 ( 92,248 )' } } ]
    , posts:
      [ { player: 'Player6'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 16, raw: 'Player6 posts ante [250]' } }
      , { player: 'Player2'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 17, raw: 'Player2 posts ante [250]' } }
      , { player: 'Hero'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 18, raw: 'Hero posts ante [250]' } }
      , { player: 'Player3'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 19, raw: 'Player3 posts ante [250]' } }
      , { player: 'Player1'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 20, raw: 'Player1 posts ante [250]' } }
      , { player: 'Player5'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 21, raw: 'Player5 posts ante [250]' } }
      , { player: 'Player0'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 22, raw: 'Player0 posts ante [250]' } }
      , { player: 'Player4'
        , type: 'ante'
        , amount: 250
        , metadata: { lineno: 23, raw: 'Player4 posts ante [250]' } } ]
    , preflop:
      [ { player: 'Player3'
        , type: 'fold'
        , metadata: { lineno: 26, raw: 'Player3 folds' } }
      , { player: 'Player1'
        , type: 'fold'
        , metadata: { lineno: 27, raw: 'Player1 folds' } }
      , { player: 'Player5'
        , type: 'raise'
        , raiseTo: 5000
        , metadata: { lineno: 28, raw: 'Player5 raises [5,000]' } }
      , { player: 'Player0'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'Player0 folds' } }
      , { player: 'Player4'
        , type: 'fold'
        , metadata: { lineno: 30, raw: 'Player4 folds' } }
      , { player: 'Player6'
        , type: 'fold'
        , metadata: { lineno: 31, raw: 'Player6 folds' } }
      , { player: 'Player2'
        , type: 'fold'
        , metadata: { lineno: 32, raw: 'Player2 folds' } }
      , { player: 'Hero'
        , type: 'fold'
        , metadata: { lineno: 33, raw: 'Hero folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'Player5'
        , amount: 10750
        , metadata: { lineno: 35, raw: 'Player5 wins 10,750 chips' } } ]
    , ignored:
      [ { lineno: 0, raw: '#Game No : 13165152578' } ] })

  t.end()
})
