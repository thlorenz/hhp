'use strict'

const test = require('tape')
const spok = require('spok')
const { parseHand } = require('../../')
const opts = { infoOnly: true }

test('\npokerstars: tournament info 2017', function(t) {
  const txt = 'PokerStars Hand #164141909042: Tournament #1783636369, ' +
              '$3.13+$0.37 USD Hold\'em No Limit - Level I (10/20) - ' +
              '2017/01/06 14:44:10 ET'
  const info = parseHand(txt, opts)
  spok(t, info,
    { room: 'pokerstars'
    , handid: '164141909042'
    , gametype: 'tournament'
    , gameno: '1783636369'
    , currency: '$'
    , donation: 3.13
    , rake: 0.37
    , buyin: 3.5
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , level: 'i'
    , sb: 10
    , bb: 20
    , year: 2017
    , month: 1
    , day: 6
    , hour: 14
    , min: 44
    , sec: 10
    , timezone: 'ET'
    , metadata:
      { lineno: 0
      , raw: 'PokerStars Hand #164141909042: Tournament #1783636369, $3.13+$0.37 USD Hold\'em No Limit - Level I (10/20) - 2017/01/06 14:44:10 ET' } })
  t.end()
})

test('\npokerstars: tournament info 2016', function(t) {
  const txt = 'PokerStars Hand #149651992548: Tournament #1495192630, ' +
              '$0.91+$0.09 USD Hold\'em No Limit - Level XI (400/800) - ' +
              '2016/03/01 1:29:41 ET'
  const info = parseHand(txt, opts)
  spok(t, info,
    { room: 'pokerstars'
    , handid: '149651992548'
    , gametype: 'tournament'
    , gameno: '1495192630'
    , currency: '$'
    , donation: 0.91
    , rake: 0.09
    , buyin: 1
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , level: 'xi'
    , sb: 400
    , bb: 800
    , year: 2016
    , month: 3
    , day: 1
    , hour: 1
    , min: 29
    , sec: 41
    , timezone: 'ET'
    , metadata:
      { lineno: 0
      , raw: 'PokerStars Hand #149651992548: Tournament #1495192630, $0.91+$0.09 USD Hold\'em No Limit - Level XI (400/800) - 2016/03/01 1:29:41 ET' } })
  t.end()
})

test('\npokerstars: tournament info 2008', function(t) {
  const txt = 'PokerStars Game #23371891311: Tournament #130326981, ' +
              '$10+$1 Hold\'em No Limit - Level I (10/20) - ' +
              '2008/12/29 14:33:21 ET'
  const info = parseHand(txt, opts)
  spok(t, info,
    { room: 'pokerstars'
    , handid: '23371891311'
    , gametype: 'tournament'
    , gameno: '130326981'
    , currency: '$'
    , donation: 10
    , rake: 1
    , buyin: 11
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , level: 'i'
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
  t.end()
})

test('\npokerstars: CG Zoom info 2017', function(t) {
  const txt = 'PokerStars Zoom Hand #164181769033:  ' +
              'Hold\'em No Limit ($0.02/$0.05) - ' +
              '2017/01/07 9:48:34 ET'
  const info = parseHand(txt, opts)
  spok(t, info,
    { room: 'pokerstars'
    , handid: '164181769033'
    , gametype: 'cashgame'
    , currency: '$'
    , pokertype: 'holdem'
    , limit: 'nolimit'
    , sb: 0.02
    , bb: 0.05
    , year: 2017
    , month: 1
    , day: 7
    , hour: 9
    , min: 48
    , sec: 34
    , timezone: 'ET'
    , metadata:
      { lineno: 0
      , raw: 'PokerStars Zoom Hand #164181769033:  Hold\'em No Limit ($0.02/$0.05) - 2017/01/07 9:48:34 ET' } })
  t.end()
})
