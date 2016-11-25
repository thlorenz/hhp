/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const HandHistoryParser = require('./base')

function HoldemPokerStarsParser(lines) {
  if (!(this instanceof HoldemPokerStarsParser)) return new HoldemPokerStarsParser(lines)
  HandHistoryParser.call(this, lines)
}

HoldemPokerStarsParser.prototype = Object.create(HandHistoryParser.prototype)
HoldemPokerStarsParser.prototype.constructor = HoldemPokerStarsParser
const proto = HoldemPokerStarsParser.prototype

/*
^(PokerStars) (?:Hand|Game) #(\d+):
(Tournament) #(\d+),
([$|€])((?:[\d]+\.\d+)|(?:[\d]+))\+([$|€])((?:[\d]+\.\d+)|(?:[\d]+)).+
(Hold'em) (No Limit) -
Level ([^(]+)\(([^/]+)/([^)]+)\)(?: - ){0,1}
*/
proto._handInfoRx = new RegExp(
    // PokerStars Hand #149651992548:
    '^(PokerStars) (?:Hand|Game) #(\\d+): '
    // Tournament #1495192630,
  + '(Tournament) #(\\d+), '
    // $0.91+$0.09
  + '([$|€])((?:[\\d]+\\.\\d+)|(?:[\\d]+))\\+([$|€])((?:[\\d]+\\.\\d+)|(?:[\\d]+)).+'
    // USD Hold'em No Limit -
  + '(Hold\'em) (No Limit) - '
    // Level XI (400/800)
  + 'Level ([^(]+)\\(([^/]+)/([^)]+)\\)(?: - ){0,1}'
    // 2016/03/01
  + '[^\\d]*(\\d{4}).(\\d{2}).(\\d{2})'
    // 1:29:41 ET
  + '[^\\d]*([^:]+):([^:]+):([^ ]+) (.+)$'
)

/*
 * Matches:
 *    1  PokerStars         2  149651992548  3  Tournament  4  1495192630
 *    5  $                  6  0.91  7  $    8 0.09
 *    9  Hold'em           10 No Limit      11 XI          12 400  13 800
 *    14 2016              15 03    16 01
 *    17 1                 18 29    19 41   20 ET
*/

proto._tableInfoRx         = /^Table '\d+ (\d+)' (\d+)-max Seat #(\d+) is.+button$/i
proto._seatInfoRx          = /^Seat (\d+): ([^(]+)\((\d+) in chips\)( .+sitting out)?$/i
proto._postRx              = /^([^:]+): posts (?:the )?(ante|small blind|big blind) (\d+)$/i
proto._preflopIndicatorRx  = /^\*\*\* HOLE CARDS \*\*\*$/
proto._streetIndicatorRx   = /^\*\*\* (FLOP|TURN|RIVER) \*\*\*[^[]+\[(..) (..) (..)(?: (..))?\](?: \[(..)\])?$/
proto._showdownIndicatorRx = /^\*\*\* SHOW DOWN \*\*\*$/
proto._summaryIndicatorRx  = /^\*\*\* SUMMARY \*\*\*$/
proto._holecardsRx         = /^Dealt to ([^[]+) \[(..) (..)\]$/i
proto._actionRx            = /^([^:]+): (raises|bets|calls|checks|folds) ?(\d+)?(?: to (\d+))?(.+all-in)?$/i
proto._collectRx           = /^(.+) (collected) (\d+) from.+pot$/i
proto._showRx              = /^([^:]+): shows \[(..) (..)\] \(([^)]+)\)$/i
proto._boardRx             = /^Board \[(..)?( ..)?( ..)?( ..)?( ..)?]$/i
proto._muckRx              = /^Seat \d+: ([^ ]+) mucked \[(..) (..)\]$/i
proto._betReturnedRx       = /^uncalled bet [(]?(\d+)[)]? returned to (.+)$/i

exports.canParse = function canParse(lines) {
  return new HoldemPokerStarsParser(lines).canParse()
}

exports.parse = function parse(lines) {
  return new HoldemPokerStarsParser(lines).parse()
}
