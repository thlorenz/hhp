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
           , raw: '***** Hand History for Game 198563653 *****' }
         , { lineno: 1
           , raw:
              '$0.10/$0.25 USD NL Texas Hold\'em - Wednesday, June 20, 01:34:15 EDT 2018' } ]
      , handid: '198563653'
      , gametype: 'cash'
      , currency: '$'
      , sb: 0.1
      , bb: 0.25
      , limit: 'nolimit'
      , type: 'holdem'
      , year: 2018
      , month: 6
      , day: 20
      , hour: 5
      , min: 34
      , sec: 15
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
      [ { seatno: 3
        , player: 'Bub242'
        , chips: 44.15
        , metadata: { lineno: 5, raw: 'Seat 3: Bub242 ( $44.15 USD )' } }
      , { seatno: 5
        , player: 'DJHOOKS'
        , chips: 27.13
        , metadata: { lineno: 6, raw: 'Seat 5: DJHOOKS ( $27.13 USD )' } }
      , { seatno: 7
        , player: 'DirtyJerzey'
        , chips: 17.85
        , metadata: { lineno: 7, raw: 'Seat 7: DirtyJerzey ( $17.85 USD )' } }
      , { seatno: 2
        , player: 'Fatwhite26'
        , chips: 34.12
        , metadata: { lineno: 8, raw: 'Seat 2: Fatwhite26 ( $34.12 USD )' } }
      , { seatno: 6
        , player: 'Kahstonezz'
        , chips: 15.68
        , metadata: { lineno: 9, raw: 'Seat 6: Kahstonezz ( $15.68 USD )' } }
      , { seatno: 1
        , player: 'Kellymf1989'
        , chips: 17.16
        , metadata: { lineno: 10, raw: 'Seat 1: Kellymf1989 ( $17.16 USD )' } }
      , { seatno: 9
        , player: 'MusicGuru'
        , chips: 15
        , metadata: { lineno: 11, raw: 'Seat 9: MusicGuru ( $15 USD )' } }
      , { seatno: 8
        , player: 'dmehmet'
        , chips: 25.58
        , metadata: { lineno: 12, raw: 'Seat 8: dmehmet ( $25.58 USD )' } }
      , { seatno: 4
        , player: 'missmoose'
        , chips: 14.76
        , metadata: { lineno: 13, raw: 'Seat 4: missmoose ( $14.76 USD )' } } ]
    , posts:
      [ { player: 'missmoose'
        , type: 'sb'
        , amount: 0.1
        , metadata:
           { lineno: 14, raw: 'missmoose posts small blind [$0.10 USD].' } }
      , { player: 'Kahstonezz'
        , type: 'bb'
        , amount: 0.25
        , metadata:
           { lineno: 16, raw: 'Kahstonezz posts big blind [$0.25 USD].' } } ]
    , preflop:
      [ { player: 'DirtyJerzey'
        , type: 'fold'
        , metadata: { lineno: 18, raw: 'DirtyJerzey folds' } }
      , { player: 'dmehmet'
        , type: 'raise'
        , raiseTo: 1
        , metadata: { lineno: 19, raw: 'dmehmet raises [$1 USD]' } }
      , { player: 'Kellymf1989'
        , type: 'fold'
        , metadata: { lineno: 20, raw: 'Kellymf1989 folds' } }
      , { player: 'Fatwhite26'
        , type: 'fold'
        , metadata: { lineno: 21, raw: 'Fatwhite26 folds' } }
      , { player: 'Bub242'
        , type: 'fold'
        , metadata: { lineno: 22, raw: 'Bub242 folds' } }
      , { player: 'missmoose'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'missmoose folds' } }
      , { player: 'Kahstonezz'
        , type: 'raise'
        , raiseTo: 1.5
        , metadata: { lineno: 24, raw: 'Kahstonezz raises [$1.50 USD]' } }
      , { player: 'dmehmet'
        , type: 'call'
        , amount: 0.75
        , allin: false
        , metadata: { lineno: 25, raw: 'dmehmet calls [$0.75 USD]' } } ]
    , flop:
      [ { player: 'Kahstonezz'
        , type: 'check'
        , metadata: { lineno: 27, raw: 'Kahstonezz checks' } }
      , { player: 'dmehmet'
        , type: 'check'
        , metadata: { lineno: 28, raw: 'dmehmet checks' } } ]
    , turn:
      [ { player: 'Kahstonezz'
        , type: 'check'
        , metadata: { lineno: 30, raw: 'Kahstonezz checks' } }
      , { player: 'dmehmet'
        , type: 'check'
        , metadata: { lineno: 31, raw: 'dmehmet checks' } } ]
    , river:
      [ { player: 'Kahstonezz'
        , type: 'bet'
        , amount: 3.75
        , allin: false
        , metadata: { lineno: 33, raw: 'Kahstonezz bets [$3.75 USD]' } }
      , { player: 'dmehmet'
        , type: 'call'
        , amount: 3.75
        , allin: false
        , metadata: { lineno: 34, raw: 'dmehmet calls [$3.75 USD]' } } ]
    , showdown:
      [ { player: 'Kahstonezz'
        , type: 'show'
        , card1: '7c'
        , card2: 'Ah'
        , metadata:
           { lineno: 35
           , raw: 'Kahstonezz shows [ 7c, Ah ]two pairs, Aces and Sevens.' }
        , desc: 'two pairs, Aces and Sevens' }
      , { player: 'dmehmet'
        , type: 'muck'
        , card1: 'Qd'
        , card2: 'Qs'
        , metadata:
           { lineno: 36
           , raw: 'dmehmet doesn\'t show [ Qd, Qs ]a pair of Queens.' }
        , desc: 'a pair of Queens' }
      , { type: 'collect'
        , player: 'Kahstonezz'
        , amount: 10.49
        , metadata:
           { lineno: 37
           , raw:
              'Kahstonezz wins $10.49 USD from the main pot with two pairs, Aces and Sevens.' } } ]
    , ignored: [ { lineno: 15, raw: 'DJHOOKS is sitting out' } ]
    , board:
      { card1: 'Jd'
      , card2: 'Kh'
      , card3: '3d'
      , metadata:
         [ { lineno: 26, raw: '** Dealing Flop ** [ Jd, Kh, 3d ]' }
         , { lineno: 29, raw: '** Dealing Turn ** [ Ac ]' }
         , { lineno: 32, raw: '** Dealing River ** [ 7d ]' } ]
      , card4: 'Ac'
      , card5: '7d' } })
  t.end()
})
