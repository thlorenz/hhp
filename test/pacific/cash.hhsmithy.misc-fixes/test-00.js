'use strict'

const path = require('path')
const ROOM = 'pacific'
const GAME = __dirname.split('/').pop()
const PART = parseInt(path.basename(__filename).split('-')[1])

const test = require('tape')
const processHand = require('../../util/process-hand')
// eslint-disable-next-line no-unused-vars
const ocat = require('ocat').applyRes5Opts()
const spok = require('spok')

test(`${ROOM}: ${GAME} - ${PART} - fixes "dead blind" and "folds" before preflop`, function(t) {
  const res = processHand(__dirname, PART)
  spok(t, res,
    { info:
      { metadata:
         [ { lineno: 1
           , raw: '***** 888poker Hand History for Game 499222502 *****' }
         , { lineno: 2
           , raw:
              '$0.01/$0.02 Blinds No Limit Holdem - *** 01 07 2018 12:32:18' } ]
      , handid: '499222502'
      , currency: '$'
      , day: 1
      , month: 7
      , year: 2018
      , hour: 12
      , min: 32
      , sec: 18
      , sb: 0.01
      , bb: 0.02
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , gametype: 'cash' }
    , table:
      { metadata:
         [ { lineno: 3, raw: 'Table Goiania 6 Max (Real Money)' }
         , { lineno: 4, raw: 'Seat 9 is the button' }
         , { lineno: 5, raw: 'Total number of players : 6' } ]
      , table: 'Goiania 6 Max'
      , button: 9
      , maxseats: 6 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 1
        , player: 'ChesterJ28'
        , chips: 3.15
        , metadata: { lineno: 6, raw: 'Seat 1: ChesterJ28 ( $3.15 )' } }
      , { seatno: 2
        , player: 'Aprel16'
        , chips: 1.59
        , metadata: { lineno: 7, raw: 'Seat 2: Aprel16 ( $1.59 )' } }
      , { seatno: 4
        , player: 'RockyWarr777'
        , chips: 1.18
        , metadata: { lineno: 8, raw: 'Seat 4: RockyWarr777 ( $1.18 )' } }
      , { seatno: 6
        , player: 'KroyBogdan7'
        , chips: 1.19
        , metadata: { lineno: 9, raw: 'Seat 6: KroyBogdan7 ( $1.19 )' } }
      , { seatno: 7
        , player: 'Flanx'
        , chips: 0.67
        , metadata: { lineno: 10, raw: 'Seat 7: Flanx ( $0.67 )' } }
      , { seatno: 9
        , player: 'Filosov000'
        , chips: 0.35
        , metadata: { lineno: 11, raw: 'Seat 9: Filosov000 ( $0.35 )' } } ]
    , posts:
      [ { player: 'ChesterJ28'
        , type: 'sb'
        , amount: 0.01
        , metadata: { lineno: 12, raw: 'ChesterJ28 posts small blind [$0.01]' } }
      , { player: 'RockyWarr777'
        , type: 'bb'
        , amount: 0.02
        , metadata: { lineno: 14, raw: 'RockyWarr777 posts big blind [$0.02]' } }
      , { player: 'Flanx'
        , type: 'blind'
        , amount: 0.03
        , metadata:
           { lineno: 15, raw: 'Flanx posts dead blind [$0.01 + $0.02]' } } ]
    , preflop:
      [ { player: 'Aprel16'
        , type: 'fold'
        , metadata: { lineno: 13, raw: 'Aprel16 folds' } }
      , { player: 'KroyBogdan7'
        , type: 'raise'
        , raiseTo: 0.06
        , metadata: { lineno: 17, raw: 'KroyBogdan7 raises [$0.06]' } }
      , { player: 'Flanx'
        , type: 'fold'
        , metadata: { lineno: 18, raw: 'Flanx folds' } }
      , { player: 'Filosov000'
        , type: 'call'
        , amount: 0.06
        , allin: false
        , metadata: { lineno: 19, raw: 'Filosov000 calls [$0.06]' } }
      , { player: 'ChesterJ28'
        , type: 'call'
        , amount: 0.05
        , allin: false
        , metadata: { lineno: 20, raw: 'ChesterJ28 calls [$0.05]' } }
      , { player: 'RockyWarr777'
        , type: 'fold'
        , metadata: { lineno: 21, raw: 'RockyWarr777 folds' } } ]
    , flop:
      [ { player: 'ChesterJ28'
        , type: 'bet'
        , amount: 0.23
        , allin: false
        , metadata: { lineno: 23, raw: 'ChesterJ28 bets [$0.23]' } }
      , { player: 'KroyBogdan7'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'KroyBogdan7 folds' } }
      , { player: 'Filosov000'
        , type: 'fold'
        , metadata: { lineno: 25, raw: 'Filosov000 folds' } } ]
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'ChesterJ28'
        , amount: 0.22
        , metadata: { lineno: 28, raw: 'ChesterJ28 collected [ $0.22 ]' } } ]
    , ignored: []
    , board:
      { card1: '6c'
      , card2: 'Kh'
      , card3: '5s'
      , metadata: [ { lineno: 22, raw: '** Dealing flop ** [ 6c, Kh, 5s ]' } ] } })
  t.end()
})
