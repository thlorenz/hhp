'use strict'

const priceFreeroll  = require('hhp-util/tweaks').priceFreeroll

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
  // 23:37:43 CET [2018/03/09 17:37:43 ET]
  '[^\\d]*([^:]+):([^:]+):([^\\s]+) ([^\\s]*).*'

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

class HoldemPokerStarsParser extends HandHistoryParser {
  _handInfoRx(gameType) {
    switch (gameType.toLowerCase()) {
      case 'tournament': return { rx: tournamentInfo, idxs: tournamentInfoIdxs }
      case 'cashgame': return { rx: cashGameInfo, idxs: cashGameInfoIdxs }
      default: throw new Error('Unknown game type ' + gameType)
    }
  }

  _tableRx(gameType) {
    switch (gameType.toLowerCase()) {
      case 'tournament': return { rx: tournamentTable, idxs: tournamentTableIdxs }
      case 'cashgame': return { rx: cashGameTable, idxs: cashGameTableIdxs }
      default: throw new Error('Unknown game type ' + gameType)
    }
  }

  _gameType() {
    if (this._cachedGameType) return this._cachedGameType
    const lines = this._lines
    for (var i = 0; i < lines.length && lines[i].length; i++) {
      var line = priceFreeroll(lines[i])
      if (tournamentInfo.test(line)) {
        this._cachedGameType = 'tournament'
        return this._cachedGameType
      }
      if (cashGameInfo.test(line)) {
        this._cachedGameType = 'cashgame'
        this._tableFast = lines[i].search('Zoom') > 0
        return this._cachedGameType
      }
    }
    return null
  }
}

// Hand Setup
HoldemPokerStarsParser.prototype._seatInfoRx          = /^Seat (\d+): (.+)\([$|€]?([^ ]+) in chips(?:, .+? bounty)?\)( .+sitting out)?$/i
HoldemPokerStarsParser.prototype._postRx              = /^([^:]+): posts (?:the )?(ante|small blind|big blind) [$|€]?([^ ]+)$/i

// Street Indicators
HoldemPokerStarsParser.prototype._preflopIndicatorRx  = /^\*\*\* HOLE CARDS \*\*\*$/i
HoldemPokerStarsParser.prototype._streetIndicatorRx   = /^\*\*\* (FLOP|TURN|RIVER) \*\*\*[^[]+\[(..) (..) (..)(?: (..))?](?: \[(..)])?$/i
HoldemPokerStarsParser.prototype._showdownIndicatorRx = /^\*\*\* SHOW DOWN \*\*\*$/i
HoldemPokerStarsParser.prototype._summaryIndicatorRx  = /^\*\*\* SUMMARY \*\*\*$/i

// Street actions
HoldemPokerStarsParser.prototype._holecardsRx         = /^Dealt to ([^[]+) \[(..) (..)]$/i
HoldemPokerStarsParser.prototype._actionRx            = /^([^:]+): (raises|bets|calls|checks|folds) ?[$|€]?([^ ]+)?(?: to [$|€]?([^ ]+))?(.+all-in)?$/i
HoldemPokerStarsParser.prototype._collectRx           = /^(.+) collected [$|€]?([^ ]+) from (?:(main|side) )?pot$/i
HoldemPokerStarsParser.prototype._betReturnedRx       = /^uncalled bet [(]?[$|€]?([^ )]+)[)]? returned to (.+)$/i

// Showdown (also uses _collectRx and _betReturnedRx)
HoldemPokerStarsParser.prototype._showRx              = /^([^:]+): shows \[(..) (..)] \(([^)]+)\)$/i
HoldemPokerStarsParser.prototype._muckRx              = /^([^:]+): mucks hand$/i
HoldemPokerStarsParser.prototype._finishRx            = /^(.+?) finished the tournament(?: in (\d+).+ place)?(?: and received [$|€]([^ ]+)\.)?$/i

// Summary
HoldemPokerStarsParser.prototype._summarySinglePotRx  = /^Total pot [$|€]?([^ ]+) \| Rake [$|€]?([^ ]+)$/i
HoldemPokerStarsParser.prototype._summarySplitPotRx   = /^Total pot [$|€]?([^ ]+) Main pot [$|€]?([^ ]+)\. Side pot [$|€]?([^ ]+)\. \| Rake [$|€]?([^ ]+)$/i
HoldemPokerStarsParser.prototype._summaryBoardRx      = /^Board \[(..)?( ..)?( ..)?( ..)?( ..)?]$/i
HoldemPokerStarsParser.prototype._summaryMuckedRx     = /^Seat (\d+): (.+?) (?:\((button|small blind|big blind)\) )?mucked \[(..) (..)]$/i
HoldemPokerStarsParser.prototype._summaryCollectedRx  = /^Seat (\d+): (.+?) (?:\((button|small blind|big blind)\) )?collected \([$|€]?([^)]+)\)$/i
HoldemPokerStarsParser.prototype._summaryShowedWonRx  = /^Seat (\d+): (.+?) (?:\((button|small blind|big blind)\) )?showed \[(..) (..)] and won \([$|€]?([^)]+)\) with (.+)$/i
HoldemPokerStarsParser.prototype._summaryShowedLostRx = /^Seat (\d+): (.+?) (?:\((button|small blind|big blind)\) )?showed \[(..) (..)] and lost with (.+)$/i
HoldemPokerStarsParser.prototype._summaryFoldedRx     = /^Seat (\d+): (.+?) (?:\((button|small blind|big blind)\) )?folded (before Flop|on the Flop|on the Turn|on the River)( \(didn't bet\))?$/i
HoldemPokerStarsParser.prototype._summaryIncludesPosition = true

HoldemPokerStarsParser.prototype._revealRx            = null

exports.canParse = function canParse(lines) {
  return new HoldemPokerStarsParser(lines).canParse()
}

exports.parse = function parse(lines, infoOnly) {
  return new HoldemPokerStarsParser(lines, infoOnly).parse()
}

exports.create = function create(lines, infoOnly) {
  return new HoldemPokerStarsParser(lines, infoOnly)
}
