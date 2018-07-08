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
           , raw: '***** 888poker Hand History for Game 503663069 *****' }
         , { lineno: 2
           , raw:
              '$0.06/$0.12 Blinds Fix Limit Holdem - *** 17 06 2018 20:28:21' } ]
      , handid: '503663069'
      , gametype: 'cash'
      , currency: '$'
      , day: 17
      , month: 6
      , year: 2018
      , hour: 20
      , min: 28
      , sec: 21
      , sb: 0.06
      , bb: 0.12
      , limit: 'fixedlimit'
      , type: 'holdem' }
    , table:
      { metadata:
         [ { lineno: 3, raw: 'Table Embu 10 Max (Real Money)' }
         , { lineno: 4, raw: 'Seat 5 is the button' }
         , { lineno: 5, raw: 'Total number of players : 2' } ]
      , table: 'Embu 10 Max'
      , button: 5
      , maxseats: 2 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 5
        , player: 'uyangau'
        , chips: 4.8
        , metadata: { lineno: 6, raw: 'Seat 5: uyangau ( $4.80 )' } }
      , { seatno: 7
        , player: 'Chillwill184'
        , chips: 1.25
        , metadata: { lineno: 7, raw: 'Seat 7: Chillwill184 ( $1.25 )' } } ]
    , posts:
      [ { player: 'uyangau'
        , type: 'sb'
        , amount: 0.06
        , metadata: { lineno: 8, raw: 'uyangau posts small blind [$0.06]' } }
      , { player: 'Chillwill184'
        , type: 'bb'
        , amount: 0.12
        , metadata: { lineno: 9, raw: 'Chillwill184 posts big blind [$0.12]' } } ]
    , preflop:
      [ { player: 'uyangau'
        , type: 'call'
        , amount: 0.06
        , allin: false
        , metadata: { lineno: 11, raw: 'uyangau calls [$0.06]' } }
      , { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 12, raw: 'Chillwill184 checks' } } ]
    , flop:
      [ { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 14, raw: 'Chillwill184 checks' } }
      , { player: 'uyangau'
        , type: 'bet'
        , amount: 0.12
        , allin: false
        , metadata: { lineno: 15, raw: 'uyangau bets [$0.12]' } }
      , { player: 'Chillwill184'
        , type: 'call'
        , amount: 0.12
        , allin: false
        , metadata: { lineno: 16, raw: 'Chillwill184 calls [$0.12]' } } ]
    , turn:
      [ { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 18, raw: 'Chillwill184 checks' } }
      , { player: 'uyangau'
        , type: 'bet'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 19, raw: 'uyangau bets [$0.25]' } }
      , { player: 'Chillwill184'
        , type: 'call'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 20, raw: 'Chillwill184 calls [$0.25]' } } ]
    , river:
      [ { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 22, raw: 'Chillwill184 checks' } }
      , { player: 'uyangau'
        , type: 'check'
        , metadata: { lineno: 23, raw: 'uyangau checks' } } ]
    , showdown:
      [ { player: 'Chillwill184'
        , type: 'show'
        , card1: 'Kh'
        , card2: '7h'
        , metadata: { lineno: 25, raw: 'Chillwill184 shows [ Kh, 7h ]' } }
      , { player: 'uyangau'
        , type: 'muck'
        , card1: '9c'
        , card2: '8s'
        , metadata: { lineno: 26, raw: 'uyangau mucks [ 9c, 8s ]' } }
      , { type: 'collect'
        , player: 'Chillwill184'
        , amount: 0.94
        , metadata: { lineno: 27, raw: 'Chillwill184 collected [ $0.94 ]' } } ]
    , ignored: []
    , board:
      { card1: '7c'
      , card2: 'Tc'
      , card3: '7d'
      , metadata:
         [ { lineno: 13, raw: '** Dealing flop ** [ 7c, Tc, 7d ]' }
         , { lineno: 17, raw: '** Dealing turn ** [ 2c ]' }
         , { lineno: 21, raw: '** Dealing river ** [ Ts ]' } ]
      , card4: '2c'
      , card5: 'Ts' } })
  t.end()
})
