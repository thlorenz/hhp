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
           , raw: '***** 888poker Hand History for Game 503663104 *****' }
         , { lineno: 2
           , raw:
              '$0.06/$0.12 Blinds Fix Limit Holdem - *** 17 06 2018 20:29:50' } ]
      , handid: '503663104'
      , gametype: 'cash'
      , currency: '$'
      , day: 17
      , month: 6
      , year: 2018
      , hour: 20
      , min: 29
      , sec: 50
      , sb: 0.06
      , bb: 0.12
      , limit: 'fixedlimit'
      , pokertype: 'holdem' }
    , table:
      { metadata:
         [ { lineno: 3, raw: 'Table Embu 10 Max (Real Money)' }
         , { lineno: 4, raw: 'Seat 7 is the button' }
         , { lineno: 5, raw: 'Total number of players : 2' } ]
      , table: 'Embu 10 Max'
      , button: 7
      , maxseats: 2 }
    , hero: null
    , holecards: null
    , seats:
      [ { seatno: 5
        , player: 'uyangau'
        , chips: 4.31
        , metadata: { lineno: 6, raw: 'Seat 5: uyangau ( $4.31 )' } }
      , { seatno: 7
        , player: 'Chillwill184'
        , chips: 1.7
        , metadata: { lineno: 7, raw: 'Seat 7: Chillwill184 ( $1.70 )' } } ]
    , posts:
      [ { player: 'Chillwill184'
        , type: 'sb'
        , amount: 0.06
        , metadata: { lineno: 8, raw: 'Chillwill184 posts small blind [$0.06]' } }
      , { player: 'uyangau'
        , type: 'bb'
        , amount: 0.12
        , metadata: { lineno: 9, raw: 'uyangau posts big blind [$0.12]' } } ]
    , preflop:
      [ { player: 'Chillwill184'
        , type: 'call'
        , amount: 0.06
        , allin: false
        , metadata: { lineno: 11, raw: 'Chillwill184 calls [$0.06]' } }
      , { player: 'uyangau'
        , type: 'raise'
        , raiseTo: 0.12
        , metadata: { lineno: 12, raw: 'uyangau raises [$0.12]' } }
      , { player: 'Chillwill184'
        , type: 'call'
        , amount: 0.12
        , allin: false
        , metadata: { lineno: 13, raw: 'Chillwill184 calls [$0.12]' } } ]
    , flop:
      [ { player: 'uyangau'
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
      [ { player: 'uyangau'
        , type: 'bet'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 18, raw: 'uyangau bets [$0.25]' } }
      , { player: 'Chillwill184'
        , type: 'call'
        , amount: 0.25
        , allin: false
        , metadata: { lineno: 19, raw: 'Chillwill184 calls [$0.25]' } } ]
    , river:
      [ { player: 'uyangau'
        , type: 'check'
        , metadata: { lineno: 21, raw: 'uyangau checks' } }
      , { player: 'Chillwill184'
        , type: 'check'
        , metadata: { lineno: 22, raw: 'Chillwill184 checks' } } ]
    , showdown:
      [ { player: 'uyangau'
        , type: 'show'
        , card1: 'Ac'
        , card2: '5s'
        , metadata: { lineno: 24, raw: 'uyangau shows [ Ac, 5s ]' } }
      , { player: 'Chillwill184'
        , type: 'muck'
        , card1: '9s'
        , card2: 'Ks'
        , metadata: { lineno: 25, raw: 'Chillwill184 mucks [ 9s, Ks ]' } }
      , { type: 'collect'
        , player: 'uyangau'
        , amount: 1.16
        , metadata: { lineno: 26, raw: 'uyangau collected [ $1.16 ]' } } ]
    , ignored: []
    , board:
      { card1: '2h'
      , card2: 'Ad'
      , card3: '5d'
      , metadata:
         [ { lineno: 14, raw: '** Dealing flop ** [ 2h, Ad, 5d ]' }
         , { lineno: 17, raw: '** Dealing turn ** [ Jc ]' }
         , { lineno: 20, raw: '** Dealing river ** [ Td ]' } ]
      , card4: 'Jc'
      , card5: 'Td' } })

  t.end()
})
