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
  ocat.log(res)
  spok(t, res, 
    { info:
      { metadata:
         [ { lineno: 1
           , raw: '***** 888poker Hand History for Game 1186521416 *****' }
         , { lineno: 2
           , raw: '$3/$6 Blinds No Limit Holdem - *** 21 06 2018 19:41:46' } ]
      , handid: '1186521416'
      , currency: '$'
      , day: 21
      , month: 6
      , year: 2018
      , hour: 19
      , min: 41
      , sec: 46
      , sb: 3
      , bb: 6
      , limit: 'nolimit'
      , type: 'holdem'
      , gametype: 'cash' }
    , table:
      { metadata:
         [ { lineno: 3, raw: 'Table Goiania 6 Max (Real Money)' }
         , { lineno: 4, raw: 'Seat 9 is the button' }
         , { lineno: 5, raw: 'Total number of players : 4' } ]
      , table: 'Goiania 6 Max'
      , button: 9
      , maxseats: 4 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 1
        , player: 'Kostan88'
        , chips: 608.25
        , metadata: { lineno: 6, raw: 'Seat 1: Kostan88 ( $608.25 )' } }
      , { seatno: 2
        , player: 'Born2Disco'
        , chips: 826.51
        , metadata: { lineno: 7, raw: 'Seat 2: Born2Disco ( $826.51 )' } }
      , { seatno: 4
        , player: 'Tercinho390'
        , chips: 354
        , metadata: { lineno: 8, raw: 'Seat 4: Tercinho390 ( $354 )' } }
      , { seatno: 9
        , player: 'SigmFreud'
        , chips: 600
        , metadata: { lineno: 9, raw: 'Seat 9: SigmFreud ( $600 )' } } ]
    , posts:
      [ { player: 'Kostan88'
        , type: 'sb'
        , amount: 3
        , metadata: { lineno: 10, raw: 'Kostan88 posts small blind [$3]' } }
      , { player: 'Born2Disco'
        , type: 'bb'
        , amount: 6
        , metadata: { lineno: 11, raw: 'Born2Disco posts big blind [$6]' } } ]
    , preflop:
      [ { player: 'Tercinho390'
        , type: 'call'
        , amount: 6
        , allin: false
        , metadata: { lineno: 13, raw: 'Tercinho390 calls [$6]' } }
      , { player: 'SigmFreud'
        , type: 'call'
        , amount: 6
        , allin: false
        , metadata: { lineno: 14, raw: 'SigmFreud calls [$6]' } }
      , { player: 'Kostan88'
        , type: 'call'
        , amount: 3
        , allin: false
        , metadata: { lineno: 15, raw: 'Kostan88 calls [$3]' } }
      , { player: 'Born2Disco'
        , type: 'check'
        , metadata: { lineno: 16, raw: 'Born2Disco checks' } } ]
    , flop:
      [ { player: 'Kostan88'
        , type: 'check'
        , metadata: { lineno: 18, raw: 'Kostan88 checks' } }
      , { player: 'Born2Disco'
        , type: 'check'
        , metadata: { lineno: 19, raw: 'Born2Disco checks' } }
      , { player: 'Tercinho390'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'Tercinho390 checks' } }
      , { player: 'SigmFreud'
        , type: 'bet'
        , amount: 8
        , allin: false
        , metadata: { lineno: 21, raw: 'SigmFreud bets [$8]' } }
      , { player: 'Kostan88'
        , type: 'fold'
        , metadata: { lineno: 22, raw: 'Kostan88 folds' } }
      , { player: 'Born2Disco'
        , type: 'fold'
        , metadata: { lineno: 23, raw: 'Born2Disco folds' } }
      , { player: 'Tercinho390'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'Tercinho390 folds' } } ]
    , turn: []
    , river: []
    , showdown:
      [ { type: 'collect'
        , player: 'SigmFreud'
        , amount: 22.8
        , metadata: { lineno: 26, raw: 'SigmFreud collected [ $22.80 ]' } } ]
    , ignored: []
    , board:
      { card1: '8h'
      , card2: 'Kd'
      , card3: '4c'
      , metadata: [ { lineno: 17, raw: '** Dealing flop ** [ 8h, Kd, 4c ]' } ] } })

  t.end()
})
