'use strict'

const path = require('path')
const ROOM = 'partypoker'
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
           , raw: '***** Hand History for Game 15549114547 *****' }
         , { lineno: 1
           , raw:
              'NL Texas Hold\'em $215 USD Buy-in Trny:128730277 Level:12  Blinds-Antes(1 200/2 400 -400) - Monday, September 26, 01:30:41 MSK 2016' }
         , { lineno: 14, raw: 'Trny:128730277 Level:12' }
         , { lineno: 15, raw: 'Blinds-Antes(1 200/2 400 -400)' } ]
      , handid: '15549114547'
      , gametype: 'tournament'
      , currency: '$'
      , buyin: 215
      , limit: 'nolimit'
      , type: 'holdem'
      , year: 2016
      , month: 9
      , day: 25
      , hour: 22
      , min: 30
      , sec: 41
      , timezone: 'GMT'
      , gameno: '128730277'
      , level: '12'
      , sb: 1200
      , bb: 2400
      , ante: 400 }
    , table:
      { metadata:
         [ { lineno: 2
           , raw:
              'Table Powerfest #193 - Main Event $500,000 Gtd (128730277) Table #83 (Real Money)' }
         , { lineno: 3, raw: 'Seat 5 is the button' }
         , { lineno: 4, raw: 'Total number of players : 9/9' } ]
      , table: 'Powerfest #193 - Main Event $500,000 Gtd'
      , button: 5
      , maxseats: 9 }
    , hero: 'DiggErr555'
    , holecards: { card1: 'Th', card2: 'Kh' }
    , seats:
      [ { seatno: 6
        , player: 'Achileus34'
        , chips: 63222
        , metadata: { lineno: 5, raw: 'Seat 6: Achileus34 ( 63,222 )' } }
      , { seatno: 8
        , player: 'Alex0876'
        , chips: 107844
        , metadata: { lineno: 6, raw: 'Seat 8: Alex0876 ( 107,844 )' } }
      , { seatno: 9
        , player: 'ChickAndChipS'
        , chips: 180112
        , metadata: { lineno: 7, raw: 'Seat 9: ChickAndChipS ( 180,112 )' } }
      , { seatno: 7
        , player: 'Corlusion'
        , chips: 205081
        , metadata: { lineno: 8, raw: 'Seat 7: Corlusion ( 205,081 )' } }
      , { seatno: 1
        , player: 'DiSTEFANO_'
        , chips: 61490
        , metadata: { lineno: 9, raw: 'Seat 1: DiSTEFANO_ ( 61,490 )' } }
      , { seatno: 4
        , player: 'DiggErr555'
        , chips: 53728
        , metadata: { lineno: 10, raw: 'Seat 4: DiggErr555 ( 53,728 )' } }
      , { seatno: 5
        , player: 'KatozaForAll'
        , chips: 47649
        , metadata: { lineno: 11, raw: 'Seat 5: KatozaForAll ( 47,649 )' } }
      , { seatno: 2
        , player: 'PokerPalvo1499'
        , chips: 80022
        , metadata: { lineno: 12, raw: 'Seat 2: PokerPalvo1499 ( 80,022 )' } }
      , { seatno: 3
        , player: 'ihadafeeling'
        , chips: 115918
        , metadata: { lineno: 13, raw: 'Seat 3: ihadafeeling ( 115,918 )' } } ]
    , posts:
      [ { player: 'DiSTEFANO_'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 16, raw: 'DiSTEFANO_ posts ante [400]' } }
      , { player: 'PokerPalvo1499'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 17, raw: 'PokerPalvo1499 posts ante [400]' } }
      , { player: 'ihadafeeling'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 18, raw: 'ihadafeeling posts ante [400]' } }
      , { player: 'DiggErr555'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 19, raw: 'DiggErr555 posts ante [400]' } }
      , { player: 'KatozaForAll'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 20, raw: 'KatozaForAll posts ante [400]' } }
      , { player: 'Achileus34'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 21, raw: 'Achileus34 posts ante [400]' } }
      , { player: 'Corlusion'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 22, raw: 'Corlusion posts ante [400]' } }
      , { player: 'Alex0876'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 23, raw: 'Alex0876 posts ante [400]' } }
      , { player: 'ChickAndChipS'
        , type: 'ante'
        , amount: 400
        , metadata: { lineno: 24, raw: 'ChickAndChipS posts ante [400]' } }
      , { player: 'Achileus34'
        , type: 'sb'
        , amount: 1200
        , metadata: { lineno: 25, raw: 'Achileus34 posts small blind [1,200].' } }
      , { player: 'Corlusion'
        , type: 'bb'
        , amount: 2400
        , metadata: { lineno: 26, raw: 'Corlusion posts big blind [2,400].' } } ]
    , preflop:
      [ { player: 'Alex0876'
        , type: 'fold'
        , metadata: { lineno: 29, raw: 'Alex0876 folds' } }
      , { player: 'ChickAndChipS'
        , type: 'fold'
        , metadata: { lineno: 30, raw: 'ChickAndChipS folds' } }
      , { player: 'DiSTEFANO_'
        , type: 'fold'
        , metadata: { lineno: 31, raw: 'DiSTEFANO_ folds' } }
      , { player: 'PokerPalvo1499'
        , type: 'raise'
        , raiseTo: 5280
        , metadata: { lineno: 32, raw: 'PokerPalvo1499 raises [5,280]' } }
      , { player: 'ihadafeeling'
        , type: 'fold'
        , metadata: { lineno: 33, raw: 'ihadafeeling folds' } }
      , { player: 'DiggErr555'
        , type: 'raise'
        , raiseTo: 53328
        , allin: true
        , metadata: { lineno: 35, raw: 'DiggErr555 is all-In  [53,328]' } }
      , { player: 'KatozaForAll'
        , type: 'fold'
        , metadata: { lineno: 36, raw: 'KatozaForAll folds' } }
      , { player: 'Achileus34'
        , type: 'fold'
        , metadata: { lineno: 37, raw: 'Achileus34 folds' } }
      , { player: 'Corlusion'
        , type: 'raise'
        , raiseTo: 202281
        , allin: true
        , metadata: { lineno: 38, raw: 'Corlusion is all-In  [202,281]' } }
      , { player: 'PokerPalvo1499'
        , type: 'fold'
        , metadata: { lineno: 39, raw: 'PokerPalvo1499 folds' } } ]
    , flop: []
    , turn: []
    , river: []
    , showdown:
      [ { player: 'Corlusion'
        , type: 'show'
        , card1: 'Jc'
        , card2: 'Jh'
        , metadata:
           { lineno: 43
           , raw: 'Corlusion shows [ Jc, Jh ]two pairs, Jacks and Sixes.' }
        , desc: 'two pairs, Jacks and Sixes' }
      , { player: 'DiggErr555'
        , type: 'show'
        , card1: 'Th'
        , card2: 'Kh'
        , metadata:
           { lineno: 44
           , raw: 'DiggErr555 shows [ Th, Kh ]two pairs, Tens and Sixes.' }
        , desc: 'two pairs, Tens and Sixes' }
      , { type: 'collect'
        , player: 'Corlusion'
        , amount: 151353
        , metadata:
           { lineno: 45
           , raw:
              'Corlusion wins 151,353 chips from the side pot 1 with two pairs, Jacks and Sixes.' } }
      , { type: 'collect'
        , player: 'Corlusion'
        , amount: 116736
        , metadata:
           { lineno: 46
           , raw:
              'Corlusion wins 116,736 chips from the main pot with two pairs, Jacks and Sixes.' } } ]
    , ignored:
      [ { lineno: 34
        , raw: 'DiggErr555 will be using their time bank for this hand.' }
      , { lineno: 47, raw: 'Player DiggErr555 finished in 840.' } ]
    , board:
      { card1: 'Qd'
      , card2: 'Td'
      , card3: '7s'
      , metadata:
         [ { lineno: 40, raw: '** Dealing Flop ** [ Qd, Td, 7s ]' }
         , { lineno: 41, raw: '** Dealing Turn ** [ 6d ]' }
         , { lineno: 42, raw: '** Dealing River ** [ 6s ]' } ]
      , card4: '6d'
      , card5: '6s' } })
  t.end()
})
