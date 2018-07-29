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

test(`${ROOM}: ${GAME} - ${PART}`, function(t) {
  const res = processHand(__dirname, PART)
  spok(t, res,
    { info:
      { metadata:
         [ { lineno: 1
           , raw: '***** 888poker Hand History for Game 1186521899 *****' }
         , { lineno: 2
           , raw: '$3/$6 Blinds No Limit Holdem - *** 21 06 2018 19:45:05' } ]
      , handid: '1186521899'
      , currency: '$'
      , day: 21
      , month: 6
      , year: 2018
      , hour: 19
      , min: 45
      , sec: 5
      , sb: 3
      , bb: 6
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , gametype: 'cash' }
    , table:
      { metadata:
         [ { lineno: 3, raw: 'Table Goiania 6 Max (Real Money)' }
         , { lineno: 4, raw: 'Seat 9 is the button' }
         , { lineno: 5, raw: 'Total number of players : 3' } ]
      , table: 'Goiania 6 Max'
      , button: 9
      , maxseats: 3 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 2
        , player: 'Born2Disco'
        , chips: 811.51
        , metadata: { lineno: 6, raw: 'Seat 2: Born2Disco ( $811.51 )' } }
      , { seatno: 6
        , player: 'xFlake'
        , chips: 973.07
        , metadata: { lineno: 7, raw: 'Seat 6: xFlake ( $973.07 )' } }
      , { seatno: 9
        , player: 'SigmFreud'
        , chips: 621
        , metadata: { lineno: 8, raw: 'Seat 9: SigmFreud ( $621 )' } } ]
    , posts:
      [ { player: 'Born2Disco'
        , type: 'sb'
        , amount: 3
        , metadata: { lineno: 9, raw: 'Born2Disco posts small blind [$3]' } } ]
    , preflop:
      [ { player: 'xFlake'
        , type: 'fold'
        , metadata: { lineno: 11, raw: 'xFlake folds' } }
      , { player: 'SigmFreud'
        , type: 'fold'
        , metadata: { lineno: 12, raw: 'SigmFreud folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'Born2Disco'
        , amount: 3
        , metadata: { lineno: 15, raw: 'Born2Disco collected [ $3 ]' } } ]
    , ignored: [] })

  t.end()
})
