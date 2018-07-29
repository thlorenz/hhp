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
           , raw: '***** 888poker Hand History for Game 1186521350 *****' }
         , { lineno: 2
           , raw: '$3/$6 Blinds No Limit Holdem - *** 21 06 2018 19:41:18' } ]
      , handid: '1186521350'
      , currency: '$'
      , day: 21
      , month: 6
      , year: 2018
      , hour: 19
      , min: 41
      , sec: 18
      , sb: 3
      , bb: 6
      , limit: 'nolimit'
      , pokertype: 'holdem'
      , gametype: 'cash' }
    , table:
      { metadata:
         [ { lineno: 3, raw: 'Table Goiania 6 Max (Real Money)' }
         , { lineno: 4, raw: 'Seat 4 is the button' }
         , { lineno: 5, raw: 'Total number of players : 4' } ]
      , table: 'Goiania 6 Max'
      , button: 4
      , maxseats: 4 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 1
        , player: 'Kostan88'
        , chips: 600
        , metadata: { lineno: 6, raw: 'Seat 1: Kostan88 ( $600 )' } }
      , { seatno: 2
        , player: 'Born2Disco'
        , chips: 826.51
        , metadata: { lineno: 7, raw: 'Seat 2: Born2Disco ( $826.51 )' } }
      , { seatno: 4
        , player: 'Tercinho390'
        , chips: 360
        , metadata: { lineno: 8, raw: 'Seat 4: Tercinho390 ( $360 )' } }
      , { seatno: 9
        , player: 'SigmFreud'
        , chips: 600
        , metadata: { lineno: 9, raw: 'Seat 9: SigmFreud ( $600 )' } } ]
    , posts:
      [ { player: 'SigmFreud'
        , type: 'sb'
        , amount: 3
        , metadata: { lineno: 10, raw: 'SigmFreud posts small blind [$3]' } }
      , { player: 'Kostan88'
        , type: 'bb'
        , amount: 6
        , metadata: { lineno: 11, raw: 'Kostan88 posts big blind [$6]' } } ]
    , preflop:
      [ { player: 'Born2Disco'
        , type: 'fold'
        , metadata: { lineno: 13, raw: 'Born2Disco folds' } }
      , { player: 'Tercinho390'
        , type: 'call'
        , amount: 6
        , allin: false
        , metadata: { lineno: 14, raw: 'Tercinho390 calls [$6]' } }
      , { player: 'SigmFreud'
        , type: 'fold'
        , metadata: { lineno: 15, raw: 'SigmFreud folds' } }
      , { player: 'Kostan88'
        , type: 'check'
        , metadata: { lineno: 16, raw: 'Kostan88 checks' } } ]
    , flop:
      [ { player: 'Kostan88'
        , type: 'bet'
        , amount: 7.5
        , allin: false
        , metadata: { lineno: 18, raw: 'Kostan88 bets [$7.50]' } }
      , { player: 'Tercinho390'
        , type: 'fold'
        , metadata: { lineno: 19, raw: 'Tercinho390 folds' } } ]
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'Kostan88'
        , amount: 14.25
        , metadata: { lineno: 21, raw: 'Kostan88 collected [ $14.25 ]' } } ]
    , ignored: []
    , board:
      { card1: 'Qc'
      , card2: '6h'
      , card3: '5h'
      , metadata: [ { lineno: 17, raw: '** Dealing flop ** [ Qc, 6h, 5h ]' } ] } })
  t.end()
})
