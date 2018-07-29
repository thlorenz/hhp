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
           , raw: '***** Hand History for Game 15414982283 *****' }
         , { lineno: 2
           , raw:
              'NL Texas Hold\'em $1 USD Buy-in  - Sunday, July 24, 19:35:09 CEST 2016' }
         , { lineno: 10, raw: 'Trny: 128487129 Level: 2' }
         , { lineno: 11, raw: 'Blinds(15/30)' } ]
      , handid: '15414982283'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 1
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , year: 2016
      , month: 7
      , day: 24
      , hour: 17
      , min: 35
      , sec: 9
      , timezone: 'GMT'
      , gameno: '128487129'
      , level: '2'
      , sb: 15
      , bb: 30 }
    , table:
      { metadata:
         [ { lineno: 3
           , raw: 'Table $1 Sit & Go Hero (128487129) Table #1 (Real Money)' }
         , { lineno: 4, raw: 'Seat 4 is the button' }
         , { lineno: 5, raw: 'Total number of players : 4/4' } ]
      , table: '$1 Sit & Go Hero'
      , button: 4
      , maxseats: 4 }
    , hero: 'Hero'
    , holecards: { card1: '5s', card2: '2h' }
    , seats:
      [ { seatno: 4
        , player: 'Hero'
        , chips: 390
        , metadata: { lineno: 6, raw: 'Seat 4: Hero ( 390 )' } }
      , { seatno: 3
        , player: 'Player0'
        , chips: 160
        , metadata: { lineno: 7, raw: 'Seat 3: Player0 ( 160 )' } }
      , { seatno: 2
        , player: 'Player1'
        , chips: 1010
        , metadata: { lineno: 8, raw: 'Seat 2: Player1 ( 1,010 )' } }
      , { seatno: 1
        , player: 'Player2'
        , chips: 440
        , metadata: { lineno: 9, raw: 'Seat 1: Player2 ( 440 )' } } ]
    , posts:
      [ { player: 'Player2'
        , type: 'sb'
        , amount: 15
        , metadata: { lineno: 12, raw: 'Player2 posts small blind [15].' } }
      , { player: 'Player1'
        , type: 'bb'
        , amount: 30
        , metadata: { lineno: 13, raw: 'Player1 posts big blind [30].' } } ]
    , preflop:
      [ { player: 'Player0'
        , type: 'fold'
        , metadata: { lineno: 16, raw: 'Player0 folds' } }
      , { player: 'Hero'
        , type: 'fold'
        , metadata: { lineno: 17, raw: 'Hero folds' } }
      , { player: 'Player2'
        , type: 'bet'
        , amount: 425
        , allin: true
        , metadata: { lineno: 18, raw: 'Player2 is all-In  [425]' } }
      , { player: 'Player1'
        , type: 'call'
        , amount: 410
        , allin: false
        , metadata: { lineno: 19, raw: 'Player1 calls [410]' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Player2'
        , type: 'show'
        , card1: 'Qh'
        , card2: 'Ah'
        , metadata:
           { lineno: 23, raw: 'Player2 shows [ Qh, Ah ]a pair of Jacks.' }
        , desc: 'a pair of Jacks' }
      , { player: 'Player1'
        , type: 'show'
        , card1: '4c'
        , card2: 'As'
        , metadata:
           { lineno: 24
           , raw: 'Player1 shows [ 4c, As ]two pairs, Jacks and Fours.' }
        , desc: 'two pairs, Jacks and Fours' }
      , { type: 'collect'
        , player: 'Player1'
        , amount: 880
        , metadata:
           { lineno: 25
           , raw:
              'Player1 wins 880 chips from the main pot with two pairs, Jacks and Fours.' } } ]
    , ignored:
      [ { lineno: 0, raw: '#Game No : 15414982283' }
      , { lineno: 26, raw: 'Player Player2 finished in 4.' }
      , { lineno: 27, raw: 'Game #15414983078 starts.' } ]
    , board:
      { card1: 'Kc'
      , card2: '4h'
      , card3: '9h'
      , metadata:
         [ { lineno: 20, raw: '** Dealing Flop ** [ Kc, 4h, 9h ]' }
         , { lineno: 21, raw: '** Dealing Turn ** [ Jd ]' }
         , { lineno: 22, raw: '** Dealing River ** [ Js ]' } ]
      , card4: 'Jd'
      , card5: 'Js' } })
  t.end()
})
