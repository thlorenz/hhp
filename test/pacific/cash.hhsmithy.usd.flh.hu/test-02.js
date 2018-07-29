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
           , raw: '***** 888poker Hand History for Game 503663140 *****' }
         , { lineno: 2
           , raw:
              '$0.06/$0.12 Blinds Fix Limit Holdem - *** 17 06 2018 20:31:02' } ]
      , handid: '503663140'
      , gametype: 'cash'
      , currency: '$'
      , day: 17
      , month: 6
      , year: 2018
      , hour: 20
      , min: 31
      , sec: 2
      , sb: 0.06
      , bb: 0.12
      , limit: 'fixedlimit'
      , pokertype: 'holdem' }
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
        , chips: 4.86
        , metadata: { lineno: 6, raw: 'Seat 5: uyangau ( $4.86 )' } }
      , { seatno: 7
        , player: 'Chillwill184'
        , chips: 1.09
        , metadata: { lineno: 7, raw: 'Seat 7: Chillwill184 ( $1.09 )' } } ]
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
        , type: 'check'
        , metadata: { lineno: 15, raw: 'uyangau checks' } } ]
    , turn:
      [ { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 17, raw: 'Chillwill184 checks' } }
      , { player: 'uyangau'
        , type: 'check'
        , metadata: { lineno: 18, raw: 'uyangau checks' } } ]
    , river:
      [ { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 20, raw: 'Chillwill184 checks' } }
      , { player: 'uyangau'
        , type: 'check'
        , metadata: { lineno: 21, raw: 'uyangau checks' } } ]
    , showdown:
      [ { player: 'Chillwill184'
        , type: 'show'
        , card1: '9d'
        , card2: '3h'
        , metadata: { lineno: 23, raw: 'Chillwill184 shows [ 9d, 3h ]' } }
      , { player: 'uyangau'
        , type: 'show'
        , card1: '2s'
        , card2: 'Jc'
        , metadata: { lineno: 24, raw: 'uyangau shows [ 2s, Jc ]' } }
      , { type: 'collect'
        , player: 'uyangau'
        , amount: 0.23
        , metadata: { lineno: 25, raw: 'uyangau collected [ $0.23 ]' } } ]
    , ignored: []
    , board:
      { card1: 'Ah'
      , card2: '4d'
      , card3: '6d'
      , metadata:
         [ { lineno: 13, raw: '** Dealing flop ** [ Ah, 4d, 6d ]' }
         , { lineno: 16, raw: '** Dealing turn ** [ As ]' }
         , { lineno: 19, raw: '** Dealing river ** [ 7h ]' } ]
      , card4: 'As'
      , card5: '7h' } })

  t.end()
})
