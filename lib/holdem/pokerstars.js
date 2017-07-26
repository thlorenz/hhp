'use strict'

const stringUtil     = require('../util/string')
const safeTrim       = stringUtil.safeTrim
const safeFirstUpper = stringUtil.safeFirstUpper

const roomGameID =
  // PokerStars Hand #149651992548:
  // PokerStars Zoom Hand #164181769033:
  '^(PokerStars) (?:Zoom )?(?:Hand|Game) #(\\d+): +'

const tournamentID =
  // Tournament #1495192630,
  'Tournament #(\\d+), '

const tournamentBuyIn =
  // $0.91+$0.09
  '([$|€])((?:[\\d]+\\.\\d+)|(?:[\\d]+))\\+([$|€])((?:[\\d]+\\.\\d+)|(?:[\\d]+)).+'

const cashGameBlinds =
  // ($0.02/$0.05)
  '\\(([$|€])([^/]+)\\/[$|€]([^)]+)\\)'

const pokerType =
  // USD Hold'em No Limit -
  '(Hold\'em) +(No Limit) -? *'

const tournamentLevel =
  // Level XI (400/800)
  'Level ([^(]+)\\(([^/]+)/([^)]+)\\)(?: - ){0,1}'

const date =
  // 2016/03/01
  '[^\\d]*(\\d{4}).(\\d{2}).(\\d{2})'

const time =
  // 1:29:41 ET
  '[^\\d]*([^:]+):([^:]+):([^ ]+) (.+)'

const tournamentInfo = new RegExp(
    roomGameID
  + tournamentID
  + tournamentBuyIn
  + pokerType
  + tournamentLevel
  + date
  + time
  + '$'
)
const tournamentInfoIdxs = {
    room      : 1
  , handid    : 2
  , gameno    : 3
  , currency  : 4
  , donation  : 5
  , rake      : 7
  , pokertype : 8
  , limit     : 9
  , level     : 10
  , sb        : 11
  , bb        : 12
  , year      : 13
  , month     : 14
  , day       : 15
  , hour      : 16
  , min       : 17
  , sec       : 18
  , timezone  : 19
}

const cashGameInfo = new RegExp(
    roomGameID
  + pokerType
  + cashGameBlinds
  + '[ -]*'
  + date
  + time
  + '$'
)

const cashGameInfoIdxs = {
    room      : 1
  , handid    : 2
  , pokertype : 3
  , limit     : 4
  , currency  : 5
  , sb        : 6
  , bb        : 7
  , year      : 8
  , month     : 9
  , day       : 10
  , hour      : 11
  , min       : 12
  , sec       : 13
  , timezone  : 14
}

const tournamentTable =
  /^Table '\d+ (\d+)' (\d+)-max Seat #(\d+) is.+button$/i

const tournamentTableIdxs = {
    tableno  : 1
  , maxseats : 2
  , button   : 3
}

const cashGameTable =
  /^Table '([^']+)' (\d+)-max Seat #(\d+) is.+button$/i

const cashGameTableIdxs = {
    tableno  : 1
  , maxseats : 2
  , button   : 3
}

const HandHistoryParser = require('./base')

function HoldemPokerStarsParser(lines, opts) {
  if (!(this instanceof HoldemPokerStarsParser)) return new HoldemPokerStarsParser(lines, opts)
  HandHistoryParser.call(this, lines, opts)
}

HoldemPokerStarsParser.prototype = Object.create(HandHistoryParser.prototype)
HoldemPokerStarsParser.prototype.constructor = HoldemPokerStarsParser
const proto = HoldemPokerStarsParser.prototype

proto._handInfoRx = function _handInfoRx(gameType) {
  switch (gameType.toLowerCase()) {
    case 'tournament': return { rx: tournamentInfo, idxs: tournamentInfoIdxs }
    case 'cashgame': return { rx: cashGameInfo, idxs: cashGameInfoIdxs }
    default: throw new Error('Unknown game type ' + gameType)
  }
}

proto._tableRx = function _tableRx(gameType) {
  switch (gameType.toLowerCase()) {
    case 'tournament': return { rx: tournamentTable, idxs: tournamentTableIdxs }
    case 'cashgame': return { rx: cashGameTable, idxs: cashGameTableIdxs }
    default: throw new Error('Unknown game type ' + gameType)
  }
}

proto._seatInfoRx          = /^Seat (\d+): (.+)\([$|€]?([^ ]+) in chips(?:, .+? bounty)?\)( .+sitting out)?$/i
proto._postRx              = /^([^:]+): posts (?:the )?(ante|small blind|big blind) [$|€]?([^ ]+)$/i
proto._preflopIndicatorRx  = /^\*\*\* HOLE CARDS \*\*\*$/
proto._streetIndicatorRx   = /^\*\*\* (FLOP|TURN|RIVER) \*\*\*[^[]+\[(..) (..) (..)(?: (..))?](?: \[(..)])?$/
proto._showdownIndicatorRx = /^\*\*\* SHOW DOWN \*\*\*$/
proto._summaryIndicatorRx  = /^\*\*\* SUMMARY \*\*\*$/
proto._holecardsRx         = /^Dealt to ([^[]+) \[(..) (..)]$/i
proto._actionRx            = /^([^:]+): (raises|bets|calls|checks|folds) ?[$|€]?([^ ]+)?(?: to [$|€]?([^ ]+))?(.+all-in)?$/i
proto._collectRx           = /^(.+) (collected) [$|€]?([^ ]+) from.+pot$/i
proto._showRx              = /^([^:]+): shows \[(..) (..)] \(([^)]+)\)$/i
proto._boardRx             = /^Board \[(..)?( ..)?( ..)?( ..)?( ..)?]$/i
proto._muckRx              = /^Seat \d+: (.+) mucked \[(..) (..)]$/i
proto._betReturnedRx       = /^uncalled bet [(]?[$|€]?([^ )]+)[)]? returned to (.+)$/i
proto._revealRx            = null

proto._gameType = function _gameType() {
  if (this._cachedGameType) return this._cachedGameType
  const lines = this._lines
  for (var i = 0; i < lines.length && lines[i].length; i++) {
    if (tournamentInfo.test(lines[i])) {
      this._cachedGameType = 'tournament'
      return this._cachedGameType
    }
    if (cashGameInfo.test(lines[i])) {
      this._cachedGameType = 'cashgame'
      return this._cachedGameType
    }
  }
  return null
}

proto._readMuck = function _readMuck(line, lineno) {
  // mucks are tricky since there is no clear deliniation for player names
  // For instance the following two are possible:
  //  Seat 3: MerVit (Added Parens) (big blind) mucked [7d Kc]
  //  Seat 3: MerVit (Added Parens) mucked [7d Kc]
  // It'd be a mighty complicated regex to remove the blind/button info automatically
  // It's much simpler just to trim it. Note that there is an unavoidable ambiguity
  // if some player's name was: "Hello (big blind)" ;)
  const match = line.match(this._muckRx)
  if (!match) return

  var player =  safeTrim(match[1])
  if (player && player.length) {
    player = player.replace(/ \((small blind|big blind|button)\)/, '')
  }
  const action = {
     player  : player
    , type   : 'muck'
    , card1  : safeFirstUpper(safeTrim(match[2]))
    , card2  : safeFirstUpper(safeTrim(match[3]))
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  this.hand.showdown.push(action)
}

exports.canParse = function canParse(lines) {
  return new HoldemPokerStarsParser(lines).canParse()
}

exports.parse = function parse(lines, infoOnly) {
  return new HoldemPokerStarsParser(lines, infoOnly).parse()
}
