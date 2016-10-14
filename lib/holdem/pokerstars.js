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

proto._handInfoRx = new RegExp(
    // PokerStars Hand #149651992548:
    '^(PokerStars) Hand #(\\d+): '
    // Tournament #1495192630,
  + '(Tournament) #(\\d+), '
    // $0.91+$0.09
  + '([$|€])([\\d]+\\.\\d+)\\+([$|€])([\\d]+\\.\\d+).+'
    // USD Hold'em No Limit -
  + '(Hold\'em) (No Limit) - '
    // Level XI (400/800)
  + 'Level ([^(]+)\\(([^/]+)/([^)]+)\\)'
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

proto._tableInfoRx         = /^Table '\d+ (\d+)' (\d+)-max Seat #(\d+) is.+button$/
proto._seatInfoRx          = /^Seat (\d+): ([^(]+)\((\d+) in chips\)( .+sitting out)?$/
proto._postRx              = /^([^:]+): posts (?:the )?(ante|small blind|big blind) (\d+)$/
proto._preflopIndicatorRx  = /^\*\*\* HOLE CARDS \*\*\*$/
proto._streetIndicatorRx   = /^\*\*\* (FLOP|TURN|RIVER) \*\*\*[^[]+\[(..) (..) (..)(?: (..))?\](?: \[(..)\])?$/
proto._showdownIndicatorRx = /^\*\*\* SHOW DOWN \*\*\*$/
proto._summaryIndicatorRx  = /^\*\*\* SUMMARY \*\*\*$/
proto._holecardsRx         = /^Dealt to ([^[]+) \[(..) (..)\]$/
proto._actionRx            = /^([^:]+): (raises|bets|calls|checks|folds) ?(\d+)?(?: to (\d+))?(.+all-in)?$/
proto._collectRx           = /^([^ ]+) (collected) (\d+) from.+pot$/
proto._showRx              = /^([^:]+): shows \[(..) (..)\] \(([^)]+)\)$/
proto._boardRx             = /^Board \[(..)?( ..)?( ..)?( ..)?( ..)?]$/
proto._muckRx              = /^Seat \d+: ([^ ]+) mucked \[(..) (..)\]$/

exports.canParse = function canParse(lines) {
  return new HoldemPokerStarsParser(lines).canParse()
}

exports.parse = function parse(lines) {
  return new HoldemPokerStarsParser(lines).parse()
}
