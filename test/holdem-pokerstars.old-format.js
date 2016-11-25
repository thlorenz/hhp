'use strict'

const test = require('tape')
const spok = require('spok')
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')
const holdem_ps = path.join(fixtures, 'holdem', 'pokerstars')

/* eslint-disable no-unused-vars */
const ocat = require('./util/ocat')
function insp(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 10, false))
}
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}
const save = require('./util/save')
/* eslint-ensable no-unused-vars */

test('\nparses 2008 tournament', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, '2008-tournament.txt'), 'utf8')
  const res = parse(txt)

  spok(t, res.info,
    { $topic: 'hand info'
    , room: 'pokerstars'
    , handid: '23371891311'
    , gametype: 'tournament'
    , gameno: '130326981'
    , currency: '$'
    , donation: 10
    , rake: 1
    , buyin: 11
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , level: 'i '
    , sb: 10
    , bb: 20
    , year: 2008
    , month: 12
    , day: 29
    , hour: 14
    , min: 33
    , sec: 21
    , timezone: 'ET'
    , metadata:
      { lineno: 0
      , raw: 'PokerStars Game #23371891311: Tournament #130326981, $10+$1 Hold\'em No Limit - Level I (10/20) - 2008/12/29 14:33:21 ET' } })

  spok(t, res.seats[0],
    { $topic: 'first seat'
    , seatno: 1
    , player: 'held'
    , chips: 1500
    , metadata: { lineno: 2, raw: 'Seat 1: held (1500 in chips)' } })

  spok(t, res.seats[1],
    { $topic: 'second seat'
    , seatno: 2
    , player: 'Riverratt66'
    , chips: 1500
    , metadata: { lineno: 3, raw: 'Seat 2: Riverratt66 (1500 in chips)' } })

  spok(t, res.preflop[0],
    { $topic: 'first preflop action'
    , player: 'sloanecurtis'
    , type: 'call'
    , amount: 20
    , allin: false
    , metadata: { lineno: 15, raw: 'sloanecurtis: calls 20' } })

  spok(t, res.flop[0],
    { $topic: 'first flop action'
    , player: 'sloanecurtis'
    , type: 'check'
    , metadata: { lineno: 26, raw: 'sloanecurtis: checks' } })

  spok(t, res.holecards,
    { $topic: 'holecards'
    , card1: '7c'
    , card2: '3s'
    , metadata: { lineno: 14, raw: 'Dealt to held [7c 3s]' } })

  spok(t, res.board,
    { $topic: 'board'
    , card1: '2s'
    , card2: '9s'
    , card3: '5d'
    , metadata: { lineno: 33, raw: 'Board [2s 9s 5d]' } })
  t.end()
})
