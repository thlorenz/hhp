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
         [ { lineno: 0
           , raw: '***** 888poker Hand History for Game 655462938 *****' }
         , { lineno: 1
           , raw: '$100/$200 Blinds No Limit Holdem - *** 08 08 2016 23:03:27' }
         , { lineno: 2
           , raw:
              'Tournament #83728678 $18.30 + $1.70 - Table #1 9 Max (Real Money)' } ]
      , handid: '655462938'
      , currency: '$'
      , day: 8
      , month: 8
      , year: 2016
      , hour: 23
      , min: 3
      , sec: 27
      , sb: 100
      , bb: 200
      , limit: 'nolimit'
      , type: 'holdem'
      , gametype: 'tournament'
      , gameno: 83728678
      , donation: 18.3
      , rake: 1.7
      , buyin: 20
      , ante: 20 }
    , table:
      { metadata:
         [ { lineno: 2
           , raw:
              'Tournament #83728678 $18.30 + $1.70 - Table #1 9 Max (Real Money)' }
         , { lineno: 3, raw: 'Seat 5 is the button' }
         , { lineno: 4, raw: 'Total number of players : 5' } ]
      , table: '#1 9 Max'
      , button: 5
      , maxseats: 5 }
    , hero: 'DiggErr555'
    , holecards: { card1: '8c', card2: 'Qs' }
    , seats:
      [ { seatno: 1
        , player: 'Mr.Tatt00'
        , chips: 3548
        , metadata: { lineno: 5, raw: 'Seat 1: Mr.Tatt00 ( $3,548 )' } }
      , { seatno: 5
        , player: 'bilguun0226'
        , chips: 1614
        , metadata: { lineno: 6, raw: 'Seat 5: bilguun0226 ( $1,614 )' } }
      , { seatno: 7
        , player: 'DiggErr555'
        , chips: 4886
        , metadata: { lineno: 7, raw: 'Seat 7: DiggErr555 ( $4,886 )' } }
      , { seatno: 9
        , player: 'MatjeP'
        , chips: 1058
        , metadata: { lineno: 8, raw: 'Seat 9: MatjeP ( $1,058 )' } }
      , { seatno: 10
        , player: 'CerealRobber'
        , chips: 2394
        , metadata: { lineno: 9, raw: 'Seat 10: CerealRobber ( $2,394 )' } } ]
    , posts:
      [ { player: 'Mr.Tatt00'
        , type: 'ante'
        , amount: 20
        , metadata: { lineno: 10, raw: 'Mr.Tatt00 posts ante [$20]' } }
      , { player: 'CerealRobber'
        , type: 'ante'
        , amount: 20
        , metadata: { lineno: 11, raw: 'CerealRobber posts ante [$20]' } }
      , { player: 'MatjeP'
        , type: 'ante'
        , amount: 20
        , metadata: { lineno: 12, raw: 'MatjeP posts ante [$20]' } }
      , { player: 'bilguun0226'
        , type: 'ante'
        , amount: 20
        , metadata: { lineno: 13, raw: 'bilguun0226 posts ante [$20]' } }
      , { player: 'DiggErr555'
        , type: 'ante'
        , amount: 20
        , metadata: { lineno: 14, raw: 'DiggErr555 posts ante [$20]' } }
      , { player: 'DiggErr555'
        , type: 'sb'
        , amount: 100
        , metadata: { lineno: 15, raw: 'DiggErr555 posts small blind [$100]' } }
      , { player: 'MatjeP'
        , type: 'bb'
        , amount: 200
        , metadata: { lineno: 16, raw: 'MatjeP posts big blind [$200]' } } ]
    , preflop:
      [ { player: 'CerealRobber'
        , type: 'raise'
        , raiseTo: 400
        , metadata: { lineno: 19, raw: 'CerealRobber raises [$400]' } }
      , { player: 'Mr.Tatt00'
        , type: 'fold'
        , metadata: { lineno: 20, raw: 'Mr.Tatt00 folds' } }
      , { player: 'bilguun0226'
        , type: 'raise'
        , raiseTo: 1594
        , metadata: { lineno: 21, raw: 'bilguun0226 raises [$1,594]' }
        , allin: true }
      , { player: 'DiggErr555'
        , type: 'fold'
        , metadata: { lineno: 22, raw: 'DiggErr555 folds' } }
      , { player: 'MatjeP'
        , type: 'call'
        , amount: 838
        , allin: true
        , metadata: { lineno: 23, raw: 'MatjeP calls [$838]' } }
      , { player: 'CerealRobber'
        , type: 'fold'
        , metadata: { lineno: 24, raw: 'CerealRobber folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'bilguun0226'
        , type: 'show'
        , card1: 'Qd'
        , card2: 'Js'
        , metadata: { lineno: 29, raw: 'bilguun0226 shows [ Qd, Js ]' } }
      , { player: 'MatjeP'
        , type: 'show'
        , card1: 'Ac'
        , card2: 'Ad'
        , metadata: { lineno: 30, raw: 'MatjeP shows [ Ac, Ad ]' } }
      , { type: 'collect'
        , player: 'MatjeP'
        , amount: 2676
        , metadata: { lineno: 31, raw: 'MatjeP collected [ $2,676 ]' } } ]
    , ignored: []
    , board:
      { card1: '6d'
      , card2: '7s'
      , card3: 'Kd'
      , metadata:
         [ { lineno: 25, raw: '** Dealing flop ** [ 6d, 7s, Kd ]' }
         , { lineno: 26, raw: '** Dealing turn ** [ 5c ]' }
         , { lineno: 27, raw: '** Dealing river ** [ 8d ]' } ]
      , card4: '5c'
      , card5: '8d' } })
  t.end()
})
