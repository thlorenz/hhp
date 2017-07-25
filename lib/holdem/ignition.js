const stringUtil     = require('../util/string')
const safeParseFloat = stringUtil.safeParseFloat

// Tournament
// Ignition Hand #3548320887: HOLDEM Tournament #18509313 TBL#1,
// Normal- Level 1 (10/20) - 2017-07-21 13:48:15

// Cash Zone Poker
// Ignition Hand #3372762461  Zone Poker ID#875 HOLDEMZonePoker No Limit - 2016-10-16 13:55:35
const roomGameID =
  // Ignition Hand #3548320887:
  '^(Ignition) (?:Hand|Game) #(\\d+):? +'

const pokerType =
  // HOLDEM
  '(HOLDEM) +'

const cashTableID =
  'Zone Poker ID#([^ ]+) '

const cashPokerTypeLimit =
  // HOLDEMZonePoker No Limit
  '(HOLDEM)(?:ZonePoker)? +(No Limit)'

const tournamentID =
  // Tournament #18509313
  'Tournament #(\\d+) +'

const tournamentTable =
  'TBL#(\\d+), +'

const tournamentLevel =
  // Level 1 (10/20)
  '(?:Normal-)? Level ([^(]+)\\(([^/]+)/([^)]+)\\)(?: - ){0,1}'

const date =
  // 2016-03-01
  '[^\\d]*(\\d{4}).(\\d{2}).(\\d{2}) +'

const time =
  // 1:29:41
  '[^\\d]*([^:]+):([^:]+):([^ ]+)(.+)'

const tournamentInfo = new RegExp(
    roomGameID
  + pokerType
  + tournamentID
  + tournamentTable
  + tournamentLevel
  + date
  + time
  + '$'
)

const tournamentInfoIdxs = {
    room      : 1
  , handid    : 2
  , pokertype : 3
  , gameno    : 4
  , tableno   : 5
  , level     : 6
  , sb        : 7
  , bb        : 8
  , year      : 9
  , month     : 10
  , day       : 11
  , hour      : 12
  , min       : 13
  , sec       : 14
  , timezone  : null
  , currency  : null
  , donation  : null
  , rake      : null
  , limit     : null
}

const cashGameInfo = new RegExp(
    roomGameID
  + cashTableID
  + cashPokerTypeLimit
  + date
  + time
  + '$'
)

const cashGameInfoIdxs = {
    room      : 1
  , handid    : 2
  , tableno   : 3
  , pokertype : 4
  , limit     : 5
  , year      : 6
  , month     : 7
  , day       : 8
  , hour      : 9
  , min       : 10
  , sec       : 11
  , timezone  : null
  , currency  : null
  , sb        : null
  , bb        : null
}

const HandHistoryParser = require('./base')

function HoldemIgnitionParser(lines, opts) {
  if (!(this instanceof HoldemIgnitionParser)) return new HoldemIgnitionParser(lines, opts)
  HandHistoryParser.call(this, lines, opts)
}

HoldemIgnitionParser.prototype = Object.create(HandHistoryParser.prototype)
HoldemIgnitionParser.prototype.constructor = HoldemIgnitionParser
const proto = HoldemIgnitionParser.prototype

proto._handInfoRx = function _handInfoRx(gameType) {
  switch (gameType.toLowerCase()) {
    case 'tournament': return { rx: tournamentInfo, idxs: tournamentInfoIdxs }
    case 'cashgame': return { rx: cashGameInfo, idxs: cashGameInfoIdxs }
    default: throw new Error('Unknown game type ' + gameType)
  }
}

proto._tableRx = function _tableRx(gameType) {
  // Ignition doesn't have the extra line describing the table
  // all info is included in the first line.
  return null
}

proto._seatInfoRx          = /^Seat (\d+): (.+)\([$|€]?([^ ]+) in chips(?:, .+? bounty)?\)( .+sitting out)?$/i
// Big Blind : Big blind 20
proto._postRx              = /^([^:]+): (Ante chip|Small blind|Big blind) [$|€]?([^ ]+)$/i

proto._preflopIndicatorRx  = /^\*\*\* HOLE CARDS \*\*\*$/
proto._streetIndicatorRx   = /^\*\*\* (FLOP|TURN|RIVER) \*\*\*[^[]+\[(..) (..) (..)(?: (..))?](?: \[(..)])?$/
proto._showdownIndicatorRx = /^\*\*\* SHOW DOWN \*\*\*$/
proto._summaryIndicatorRx  = /^\*\*\* SUMMARY \*\*\*$/

proto._holecardsRx         = /^([^:]+) : Card dealt to a spot \[(..) (..)]$/i
proto._actionRx            = /^([^:]+) : (raises|All-in\(raise\)|bets|call|checks|folds(?:\(timeout\))?) ?[$|€]?([^ ]+)?(?: to [$|€]?([^ ]+))?(.+all-in)?$/i
proto._collectRx           = /^(.+) (Hand Result) [$|€]?([^ ]+)$/i
proto._showRx              = /^([^:]+): shows \[(..) (..)] \(([^)]+)\)$/i
proto._boardRx             = /^Board \[(..)?( ..)?( ..)?( ..)?( ..)? *]$/i
proto._muckRx              = /^Seat \d+: (.+) mucked \[(..) (..)]$/i
proto._betReturnedRx       = /^([^:]+) : Return uncalled portion of bet [(]?[$|€]?([^ )]+)[)]?$/i
proto._revealRx            = /^([^:]+) : Card dealt to a spot \[(..) (..)]$/i

// @override
// implemented in base but order of matches reversed from default
proto._readBetReturned = function _readBetReturned(line, lineno) {
  const match = line.match(this._betReturnedRx)
  if (!match) return false

  const action = {
      player  : match[1]
    , type    : 'bet-returned'
    , amount  : safeParseFloat(match[2])
  }

  this._addAction(action, line, lineno)
  return true
}

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

function correctHeroPlayer(x) {
  const currentHero = this.currentHero
  if (x.player === currentHero) x.player = 'hero'
}

function correctHeroName(hand) {
  const currentHero = hand.hero
  const ctx = { currentHero: currentHero }

  hand.seats.forEach(correctHeroPlayer, ctx)
  hand.posts.forEach(correctHeroPlayer, ctx)
  hand.preflop.forEach(correctHeroPlayer, ctx)
  hand.flop.forEach(correctHeroPlayer, ctx)
  hand.turn.forEach(correctHeroPlayer, ctx)
  hand.river.forEach(correctHeroPlayer, ctx)
  hand.showdown.forEach(correctHeroPlayer, ctx)
  hand.hero = 'hero'
  return hand
}

function deduceAnte(hand) {
  if (!hand.info) return
  if (hand.info.ante != null) return
  if (hand.posts == null || hand.posts.length === 0) return

  for (var i = 0; i < hand.posts.length; i++) {
    const post = hand.posts[i]
    if (post.type === 'ante') {
      hand.info.ante = post.amount
      return
    }
  }
}

function deduceBlinds(hand) {
  // Cash (at least zone) games don't include blinds in header
  if (!hand.info) return
  if (hand.info.bb != null && hand.info.sb != null) return
  if (hand.posts == null || hand.posts.length === 0) return

  for (var i = 0; i < hand.posts.length; i++) {
    const post = hand.posts[i]
    if (post.type === 'bb' && hand.info.bb == null) {
      hand.info.bb = post.amount
      if (hand.info.sb != null) return
    } else if (post.type === 'sb' && hand.info.sb == null) {
      hand.info.sb = post.amount
      if (hand.info.bb != null) return
    }
  }
}

exports.canParse = function canParse(lines) {
  return new HoldemIgnitionParser(lines).canParse()
}

exports.parse = function parse(lines, infoOnly) {
  const hand = new HoldemIgnitionParser(lines, infoOnly).parse()
  correctHeroName(hand)
  deduceAnte(hand)
  deduceBlinds(hand)
  return hand
}
