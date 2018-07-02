'use strict'

const spok = require('spok')
const test = require('tape')
const create = require('../../lib/holdem/pokerstars').create

test('\nshowdown: player finished without a place, collection from single pot', function(t) {
  const lines = `
tihonoff1: shows [3c Ad] (two pair, Sevens and Threes)
maja1406: shows [Js As] (a pair of Sevens)
tihonoff1 collected 9239 from pot
maja1406 finished the tournament
`.split('\n')

  const parser = create([])
  parser._sawShowdown = true
  lines.map((x, idx) => parser._readShowdown(x, idx))
  spok(t, parser.hand.showdown,
    [ { player: 'tihonoff1'
     , type: 'show'
     , card1: '3c'
     , card2: 'Ad'
     , metadata:
        { lineno: 1
        , raw: 'tihonoff1: shows [3c Ad] (two pair, Sevens and Threes)' }
     , desc: 'two pair, Sevens and Threes' }
    , { player: 'maja1406'
     , type: 'show'
     , card1: 'Js'
     , card2: 'As'
     , metadata: { lineno: 2, raw: 'maja1406: shows [Js As] (a pair of Sevens)' }
     , desc: 'a pair of Sevens' }
    , { player: 'tihonoff1'
     , type: 'collect'
     , amount: 9239
     , pot: null
     , metadata: { lineno: 3, raw: 'tihonoff1 collected 9239 from pot' } }
    , { player: 'maja1406'
     , type: 'finish'
     , place: null
     , amount: null
     , metadata: { lineno: 4, raw: 'maja1406 finished the tournament' } } ])

  t.end()
})
