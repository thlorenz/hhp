const test = require('tape')
const spok = require('spok')
const spokUtl = require('./util/spok')
const clean = spokUtl.clean
const topic = spokUtl.topic
const parse = require('../')

const fs = require('fs')
const path = require('path')
const fixtures = path.join(__dirname, 'fixtures')
/* eslint-disable camelcase */
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

test('\nHoldem.PokerStars: Zoom Cash from 2017', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'cash.zoom.2017.txt'), 'utf8')
  const res = parse(txt)
  spok(t, res.info,
    { $topic: 'info'
    , room: 'pokerstars'
    , handid: '164150709626'
    , gametype: 'cashgame'
    , currency: '$'
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , sb: 0.02
    , bb: 0.05
    , year: 2017
    , month: 1
    , day: 6
    , hour: 17
    , min: 15
    , sec: 11
    , timezone: 'ET'
    , metadata:
      { lineno: 0
      , raw: 'PokerStars Zoom Hand #164150709626:  Hold\'em No Limit ($0.02/$0.05) - 2017/01/06 17:15:11 ET' } })

  spok(t, res.table,
    { $topic: 'table'
    , tableno: 'Donati'
    , maxseats: 6
    , button: 1
    , metadata:
      { lineno: 1
      , raw: 'Table \'Donati\' 6-max Seat #1 is the button' } })

  t.equal(res.hero, 'held', 'held is hero')

  spok(t, res.holecards,
    { $topic: 'holecards'
    , card1: 'Ac'
    , card2: '4h'
    , metadata: { lineno: 11, raw: 'Dealt to held [Ac 4h]' } })

  spok(t, res.board,
    { $topic: 'board'
    , card1: '6c'
    , card2: 'Jd'
    , card3: '6d'
    , card4: '2h'
    , card5: '5d'
    , metadata: { lineno: 35, raw: 'Board [6c Jd 6d 2h 5d]' } })

  spok(t, res.seats, topic('seats',
    [ { seatno: 1
     , player: 'Mr.BinAlik'
     , chips: 0.96
     , metadata: { lineno: 2, raw: 'Seat 1: Mr.BinAlik ($0.96 in chips)' } }
    , { seatno: 2
     , player: 'B0GEYMAN'
     , chips: 23.69
     , metadata: { lineno: 3, raw: 'Seat 2: B0GEYMAN ($23.69 in chips)' } }
    , { seatno: 3
     , player: 'held'
     , chips: 5
     , metadata: { lineno: 4, raw: 'Seat 3: held ($5 in chips)' } }
    , { seatno: 4
     , player: 'pfckfdcrbq'
     , chips: 10
     , metadata: { lineno: 5, raw: 'Seat 4: pfckfdcrbq ($10 in chips)' } }
    , { seatno: 5
     , player: 'Lobster01RUS'
     , chips: 5
     , metadata: { lineno: 6, raw: 'Seat 5: Lobster01RUS ($5 in chips)' } }
    , { seatno: 6
     , player: 'moreno627'
     , chips: 9.61
     , metadata: { lineno: 7, raw: 'Seat 6: moreno627 ($9.61 in chips)' } } ]))

  spok(t, res.posts, topic('posts',
    [ { player: 'B0GEYMAN'
     , type: 'sb'
     , amount: 0.02
     , metadata: { lineno: 8, raw: 'B0GEYMAN: posts small blind $0.02' } }
    , { player: 'held'
     , type: 'bb'
     , amount: 0.05
     , metadata: { lineno: 9, raw: 'held: posts big blind $0.05' } } ]))

  spok(t, clean(res.preflop), topic('preflop',
    [ { player: 'pfckfdcrbq'
     , type: 'fold'
     , metadata: { lineno: 12, raw: 'pfckfdcrbq: folds' } }
    , { player: 'Lobster01RUS'
     , type: 'fold'
     , metadata: { lineno: 13, raw: 'Lobster01RUS: folds' } }
    , { player: 'moreno627'
     , type: 'raise'
     , amount: 0.05
     , raiseTo: 0.1
     , metadata: { lineno: 14, raw: 'moreno627: raises $0.05 to $0.10' } }
    , { player: 'Mr.BinAlik'
     , type: 'call'
     , amount: 0.1
     , metadata: { lineno: 15, raw: 'Mr.BinAlik: calls $0.10' } }
    , { player: 'B0GEYMAN'
     , type: 'fold'
     , metadata: { lineno: 16, raw: 'B0GEYMAN: folds' } }
    , { player: 'held'
     , type: 'call'
     , amount: 0.05
     , metadata: { lineno: 17, raw: 'held: calls $0.05' } } ]))

  spok(t, clean(res.flop), topic('flop',
    [ { player: 'held'
     , type: 'check'
     , metadata: { lineno: 19, raw: 'held: checks' } }
    , { player: 'moreno627'
     , type: 'check'
     , metadata: { lineno: 20, raw: 'moreno627: checks' } }
    , { player: 'Mr.BinAlik'
     , type: 'check'
     , metadata: { lineno: 21, raw: 'Mr.BinAlik: checks' } } ]))

  spok(t, clean(res.turn), topic('turn',
    [ { player: 'held'
     , type: 'check'
     , metadata: { lineno: 23, raw: 'held: checks' } }
    , { player: 'moreno627'
     , type: 'check'
     , metadata: { lineno: 24, raw: 'moreno627: checks' } }
    , { player: 'Mr.BinAlik'
     , type: 'check'
     , metadata: { lineno: 25, raw: 'Mr.BinAlik: checks' } } ]))

  spok(t, clean(res.river), topic('river',
    [ { player: 'held'
     , type: 'bet'
     , amount: 0.15
     , metadata: { lineno: 27, raw: 'held: bets $0.15' } }
    , { player: 'moreno627'
     , type: 'fold'
     , metadata: { lineno: 28, raw: 'moreno627: folds' } }
    , { player: 'Mr.BinAlik'
     , type: 'fold'
     , metadata: { lineno: 29, raw: 'Mr.BinAlik: folds' } }
    , { player: 'held'
     , type: 'bet-returned'
     , amount: 0.15
     , metadata: { lineno: 30, raw: 'Uncalled bet ($0.15) returned to held' } }
    , { player: 'held'
     , type: 'collect'
     , amount: 0.31
     , metadata: { lineno: 31, raw: 'held collected $0.31 from pot' } } ]))

  t.end()
})

test('\nHoldem.PokerStars: Cash from 2010', function(t) {
  const txt = fs.readFileSync(path.join(holdem_ps, 'cash.2010.txt'), 'utf8')
  const res = parse(txt)

  spok(t, res.info,
    { $topic: 'info'
    , room: 'pokerstars'
    , handid: '41784027206'
    , gametype: 'cashgame'
    , currency: '$'
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , sb: 0.05
    , bb: 0.1
    , year: 2010
    , month: 3
    , day: 27
    , hour: 11
    , min: 32
    , sec: 24
    , timezone: 'ET'
    , metadata:
      { lineno: 0
      , raw: 'PokerStars Game #41784027206:  Hold\'em No Limit ($0.05/$0.10 USD) - 2010/03/27 11:32:24 ET' } })

  spok(t, res.table,
    { $topic: 'table'
    , tableno: 'Eunike II'
    , maxseats: 6
    , button: 2
    , metadata:
      { lineno: 1
      , raw: 'Table \'Eunike II\' 6-max Seat #2 is the button' } })

  t.equal(res.hero, 'held', 'held is hero')

  spok(t, res.holecards,
    { $topic: 'holecards'
    , card1: 'Ad'
    , card2: '7d'
    , metadata: { lineno: 11, raw: 'Dealt to held [Ad 7d]' } })

  spok(t, res.board,
    { $topic: 'board'
    , card1: '4d'
    , card2: '9h'
    , card3: '9s'
    , card4: 'Qc'
    , card5: '2d'
    , metadata: { lineno: 35, raw: 'Board [4d 9h 9s Qc 2d]' } })

  spok(t, res.seats, topic('seats',
    [ { seatno: 1
     , player: 'I.C.U-2-Win'
     , chips: 16.65
     , metadata: { lineno: 2, raw: 'Seat 1: I.C.U-2-Win ($16.65 in chips)' } }
    , { seatno: 2
     , player: 'Kozlicek_x'
     , chips: 9.85
     , metadata: { lineno: 3, raw: 'Seat 2: Kozlicek_x ($9.85 in chips)' } }
    , { seatno: 3
     , player: 'held'
     , chips: 11.3
     , metadata: { lineno: 4, raw: 'Seat 3: held ($11.30 in chips)' } }
    , { seatno: 4
     , player: 'stefanengel'
     , chips: 2
     , metadata: { lineno: 5, raw: 'Seat 4: stefanengel ($2 in chips)' } }
    , { seatno: 5
     , player: 'glaine 59'
     , chips: 0.75
     , metadata: { lineno: 6, raw: 'Seat 5: glaine 59 ($0.75 in chips)' } }
    , { seatno: 6
     , player: 'AIG 2U'
     , chips: 15.2
     , metadata: { lineno: 7, raw: 'Seat 6: AIG 2U ($15.20 in chips)' } } ]))

  spok(t, res.posts, topic('posts',
    [ { player: 'held'
     , type: 'sb'
     , amount: 0.05
     , metadata: { lineno: 8, raw: 'held: posts small blind $0.05' } }
    , { player: 'stefanengel'
     , type: 'bb'
     , amount: 0.1
     , metadata: { lineno: 9, raw: 'stefanengel: posts big blind $0.10' } } ]))

  spok(t, clean(res.preflop), topic('preflop',
    [ { player: 'glaine 59'
     , type: 'call'
     , amount: 0.1
     , metadata: { lineno: 12, raw: 'glaine 59: calls $0.10' } }
    , { player: 'AIG 2U'
     , type: 'fold'
     , metadata: { lineno: 13, raw: 'AIG 2U: folds' } }
    , { player: 'I.C.U-2-Win'
     , type: 'raise'
     , amount: 0.3
     , raiseTo: 0.4
     , metadata: { lineno: 14, raw: 'I.C.U-2-Win: raises $0.30 to $0.40' } }
    , { player: 'Kozlicek_x'
     , type: 'fold'
     , metadata: { lineno: 15, raw: 'Kozlicek_x: folds' } }
    , { player: 'held'
     , type: 'fold'
     , metadata: { lineno: 16, raw: 'held: folds' } }
    , { player: 'stefanengel'
     , type: 'call'
     , amount: 0.3
     , metadata: { lineno: 17, raw: 'stefanengel: calls $0.30' } }
    , { player: 'glaine 59'
     , type: 'call'
     , amount: 0.3
     , metadata: { lineno: 18, raw: 'glaine 59: calls $0.30' } } ]))

  spok(t, clean(res.flop), topic('flop',
    [ { player: 'stefanengel'
     , type: 'check'
     , metadata: { lineno: 20, raw: 'stefanengel: checks' } }
    , { player: 'glaine 59'
     , type: 'bet'
     , amount: 0.1
     , metadata: { lineno: 21, raw: 'glaine 59: bets $0.10' } }
    , { player: 'I.C.U-2-Win'
     , type: 'call'
     , amount: 0.1
     , metadata: { lineno: 22, raw: 'I.C.U-2-Win: calls $0.10' } }
    , { player: 'stefanengel'
     , type: 'raise'
     , amount: 1.3
     , raiseTo: 1.4
     , metadata: { lineno: 23, raw: 'stefanengel: raises $1.30 to $1.40' } }
    , { player: 'glaine 59'
     , type: 'call'
     , amount: 0.25
     , allin: true
     , metadata: { lineno: 24, raw: 'glaine 59: calls $0.25 and is all-in' } }
    , { player: 'I.C.U-2-Win'
     , type: 'fold'
     , metadata: { lineno: 25, raw: 'I.C.U-2-Win: folds' } }
    , { player: 'stefanengel'
     , type: 'bet-returned'
     , amount: 1.05
     , metadata:
        { lineno: 26
        , raw: 'Uncalled bet ($1.05) returned to stefanengel' } } ]))

  spok(t, clean(res.showdown), topic('showdown',
    [ { player: 'stefanengel'
     , type: 'show'
     , card1: 'Ac'
     , card2: '9d'
     , desc: 'three of a kind, Nines'
     , metadata:
        { lineno: 30
        , raw: 'stefanengel: shows [Ac 9d] (three of a kind, Nines)' } }
    , { player: 'stefanengel'
     , type: 'collect'
     , amount: 1.95
     , metadata: { lineno: 32, raw: 'stefanengel collected $1.95 from pot' } }
    , { player: 'glaine 59'
     , type: 'muck'
     , card1: 'Th'
     , card2: '8h'
     , metadata: { lineno: 40, raw: 'Seat 5: glaine 59 mucked [Th 8h]' } } ]))

  t.end()
})
