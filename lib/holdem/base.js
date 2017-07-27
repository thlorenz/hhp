'use strict'

const stringUtil     = require('../util/string')
const safeParseInt   = stringUtil.safeParseInt
const safeParseFloat = stringUtil.safeParseFloat
const safeTrim       = stringUtil.safeTrim
const safeLower      = stringUtil.safeLower
const safeUpper      = stringUtil.safeUpper
const safeFirstUpper = stringUtil.safeFirstUpper

function HandHistoryParser(lines, opts) {
  if (!(this instanceof HandHistoryParser)) return new HandHistoryParser(lines, opts)

  this._lines = lines
  this._infoOnly = opts && opts.infoOnly

  this._posted      = false
  this._sawPreflop  = false
  this._sawFlop     = false
  this._sawTurn     = false
  this._sawRiver    = false
  this._sawShowdown = false
  this._sawSummary  = false

  this.hand = {
      seats    : []
    , posts    : []
    , preflop  : []
    , flop     : []
    , turn     : []
    , river    : []
    , showdown : []
    , summary  : []
  }

  // storage to piece together pieces in consistent order
  this._revealedCards = {}
}

var proto = HandHistoryParser.prototype
// Methods returning the rx for given gametype (tourney|cash)
proto._handInfoRx          = undefined
proto._tableInfoRx         = undefined

// Method that returns gametype of loaded hand
proto._gameType            = undefined

// Regexes that need to be implemented

// Hand Setup
proto._seatInfoRx          = undefined
proto._postRx              = undefined

// Street Indicators
proto._preflopIndicatorRx  = undefined
proto._streetIndicatorRx   = undefined
proto._showdownIndicatorRx = undefined
proto._summaryIndicatorRx  = undefined

// Street actions
proto._holecardsRx         = undefined
proto._actionRx            = undefined
proto._collectRx           = undefined
proto._betReturnedRx       = undefined

// Showdown (also uses _collectRx and _betReturnedRx)
proto._showRx              = undefined
proto._muckRx              = undefined
proto._finishRx            = undefined

// Summary
proto._summarySinglePotRx  = undefined
proto._summarySplitPotRx   = undefined
proto._summaryBoardRx      = undefined
proto._summaryMuckedRx     = undefined
proto._summaryCollectedRx  = undefined
proto._summaryShowedWonRx  = undefined
proto._summaryShowedLostRx = undefined
proto._summaryFoldedRx     = undefined

// Only applies to Ignition for now
proto._revealRx            = undefined

proto._preflopIndicator = function _preflopIndicator(line, lineno) {
  return this._preflopIndicatorRx.test(line)
}

proto._showdownIndicator = function _showdownIndicator(line, lineno) {
  return this._showdownIndicatorRx.test(line)
}

proto._summaryIndicator =  function _summaryIndicator(line, lineno) {
  return this._summaryIndicatorRx.test(line)
}

proto._identifyPokerType = function _identifyPokerType(s) {
  if (typeof s === 'undefined') return undefined
  return  (/hold'?em/i).test(s) ? 'holdem'
        : (/omaha/i).test(s)    ? 'omaha'
        : 'not yet supported'
}

proto._identifyLimit = function _identifyLimit(s) {
  if (typeof s === 'undefined') return undefined

  return  (/(no ?limit|nl)/i).test(s)  ? 'nolimit'
        : (/(pot ?limit|pl)/i).test(s) ? 'potlimit'
        : 'not yet supported'
}

proto._identifySummaryPosition = function _identifySummaryPos(s) {
  if (s == null) return ''
  const lower = s.trim().toLowerCase()
  return (
      lower === 'button'      ? 'bu'
    : lower === 'big blind'   ? 'bb'
    : lower === 'small blind' ? 'sb'
    : 'unknown'
  )
}

proto._readInfo = function _readInfo(line, lineno) {
  const gameType   = this._gameType()
  const handInfo   = this._handInfoRx(gameType)
  const handInfoRx = handInfo.rx
  const idxs       = handInfo.idxs
  const match      = line.match(handInfoRx)
  if (match == null) return

  const info = this.hand.info = {}
  if (idxs.room != null)      info.room      = safeLower(match[idxs.room])
  if (idxs.handid != null)    info.handid    = match[idxs.handid]
  if (idxs.currency != null)  info.currency  = match[idxs.currency]
  if (idxs.pokertype != null) info.pokertype = this._identifyPokerType(match[idxs.pokertype])
  if (idxs.limit != null)     info.limit     = this._identifyLimit(match[idxs.limit])
  if (idxs.sb != null)        info.sb        = safeParseFloat(match[idxs.sb])
  if (idxs.bb != null)        info.bb        = safeParseFloat(match[idxs.bb])
  if (idxs.year != null)      info.year      = safeParseInt(match[idxs.year])
  if (idxs.month != null)     info.month     = safeParseInt(match[idxs.month])
  if (idxs.day != null)       info.day       = safeParseInt(match[idxs.day])
  if (idxs.hour != null)      info.hour      = safeParseInt(match[idxs.hour])
  if (idxs.min != null)       info.min       = safeParseInt(match[idxs.min])
  if (idxs.sec != null)       info.sec       = safeParseInt(match[idxs.sec])
  if (idxs.timezone != null)  info.timezone  = safeUpper(match[idxs.timezone])
  if (idxs.gameno != null)    info.gameno    = match[idxs.gameno]
  if (idxs.level != null)     info.level     = safeTrim(safeLower(match[idxs.level]))

  info.gametype = gameType
  info.metadata = { lineno: lineno, raw: line }

  if (idxs.donation != null && idxs.rake != null) {
    const donation = safeParseFloat(match[idxs.donation])
    const rake     = safeParseFloat(match[idxs.rake])

    info.donation  = safeParseFloat(donation)
    info.rake      = safeParseFloat(rake)
    info.buyin     = donation + rake
  }

  if (idxs.tableno != null) {
    const tableno  = gameType === 'tournament'
      ? safeParseInt(match[idxs.tableno])
      : match[idxs.tableno]
    this.hand.table = { tableno: tableno }
  }

  return true
}

proto._readTable = function _readTable(line, lineno) {
  const gameType = this._gameType()
  const table    = this._tableRx(gameType)
  if (table == null) return

  const tableRx  = table.rx
  const idxs     = table.idxs
  const match    = line.match(tableRx)
  if (!match) return

  // in some cases the table info starts getting collected as part of _readInfo
  if (this.hand.table == null) this.hand.table = {}

  const info = this.hand.table
  if (idxs.tableno != null) {
    const tableno  = gameType === 'tournament'
      ? safeParseInt(match[idxs.tableno])
      : match[idxs.tableno]

    info.tableno = tableno
  }
  if (idxs.maxseats != null) info.maxseats = safeParseInt(match[idxs.maxseats])
  if (idxs.button != null)   info.button = safeParseInt(match[idxs.button])
  info.metadata = { lineno: lineno, raw: line }

  return true
}

proto._readSeat = function _readSeat(line, lineno) {
  const match = line.match(this._seatInfoRx)
  if (!match) return

  this.hand.seats.push({
      seatno: safeParseInt(match[1])
    , player: safeTrim(match[2])
    , chips: safeParseFloat(match[3])
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })
  return true
}

proto._postType = function _postType(s) {
  const lower = s.toLowerCase()
  return (lower === 'ante' || lower === 'ante chip')  ? 'ante'
        : lower === 'big blind'                       ? 'bb'
        : lower === 'small blind'                     ? 'sb'
        : 'unknown'
}

proto._readPost = function _readPost(line, lineno) {
  const match = line.match(this._postRx)
  if (!match) return

  const type   = this._postType(match[2])
  const amount = safeParseFloat(match[3])

  this.hand.posts.push({
      player: safeTrim(match[1])
    , type: type
    , amount: amount
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })
  if (type === 'ante' && !this.hand.info.ante) this.hand.info.ante = amount
  return true
}

proto._setHeroHoleCards = function _setHeroHoleCards(player, card1, card2, line, lineno) {
  this.hand.hero = safeTrim(player)
  this.hand.holecards = {
      card1: safeFirstUpper(safeTrim(card1))
    , card2: safeFirstUpper(safeTrim(card2))
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  return {
      card1: this.hand.holecards.card1
    , card2: this.hand.holecards.card2
  }
}

proto._readHoleCards = function _readHoleCards(line, lineno) {
  const match = line.match(this._holecardsRx)
  if (!match) return
  this._setHeroHoleCards(match[1], match[2], match[3], line, lineno)
  return true
}

// only applies to Ignition which reveals all player's cards
proto._readRevealedCards = function _readRevealedCards(line, lineno) {
  const match = line.match(this._revealRx)
  if (!match) return

  const player = safeTrim(match[1])
  var cards
  if (/\[ME]$/.test(player)) {
    cards = this._setHeroHoleCards(player, match[2], match[3], line, lineno)
  } else {
    const action = showAction(match, 'reveal', line, lineno)
    cards = { card1: action.card1, card2: action.card2 }
    this.hand.showdown.push(action)
  }
  // Use this later to fill in showdown shows
  this._revealedCards[player] = cards

  return true
}

proto._readStreet = function _readStreet(line, lineno) {
  const match = line.match(this._streetIndicatorRx)
  if (!match) return

  this.hand.board = {
      card1: safeFirstUpper(safeTrim(match[2]))
    , card2: safeFirstUpper(safeTrim(match[3]))
    , card3: safeFirstUpper(safeTrim(match[4]))
    , card4: safeFirstUpper(safeTrim(match[5]))
    , card5: safeFirstUpper(safeTrim(match[6]))
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  if (match[1] === 'FLOP') this._sawFlop = true
  if (match[1] === 'TURN') {
    this._sawTurn = true
    this.hand.board.card4 = this.hand.board.card5
    this.hand.board.card5 = undefined
  }
  if (match[1] === 'RIVER') this._sawRiver = true
  return true
}

function showAction(match, type, line, lineno) {
  const action = {
      player  : safeTrim(match[1])
    , type    : type
    , card1   : safeFirstUpper(safeTrim(match[2]))
    , card2   : safeFirstUpper(safeTrim(match[3]))
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  if (match[4] != null) action.desc = match[4]
  return action
}

//
// Showdown
//
proto._readShowdownShow =  function _readShowdownShow(line, lineno) {
  const match = line.match(this._showRx)
  if (!match) return

  const action = showAction(match, 'show', line, lineno)
  this.hand.showdown.push(action)

  return true
}

proto._readShowdownMuck = function _readShowdownMuck(line, lineno) {
  const match = line.match(this._muckRx)
  if (!match) return

  const action = {
      player  : safeTrim(match[1])
    , type    : 'muck'
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  // Ignition provides us cards and a description
  if (match[2] != null && match[3] != null) {
    action.card1 = safeFirstUpper(safeTrim(match[2]))
    action.card2 = safeFirstUpper(safeTrim(match[3]))
  }
  if (match[4] != null) action.desc = safeTrim(safeLower(match[4]))

  this.hand.showdown.push(action)

  return true
}

proto._readShowdownFinish =  function _readShowdownFinish(line, lineno) {
  const match = line.match(this._finishRx)
  if (!match) return

  const action = {
      player  : safeTrim(match[1])
    , type    : 'finish'
    , place   : safeParseInt(match[2]) || null
    , amount  : safeParseFloat(match[3]) || null
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  this.hand.showdown.push(action)

  return true
}

proto._readShowdown =  function _readShowdown(line, lineno) {
  if (this._readShowdownShow(line, lineno)) return true
  if (this._readShowdownMuck(line, lineno)) return true
  if (this._readShowdownFinish(line, lineno)) return true
  if (this._readCollect(line, lineno)) return true
  return false
}

//
// Summary
//
proto._readSummarySinglePot = function _readSummarySinglePot(line, lineno) {
  var idx = 1
  const match = line.match(this._summarySinglePotRx)
  if (!match) return false

  const amount = safeParseFloat(match[idx++])
  const action = {
      type: 'pot'
    , single: true
    , amount: amount
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  if (match[idx] != null) action.rake = safeParseFloat(match[idx++])

  this.hand.summary.push(action)

  return true
}

proto._readSummarySplitPot = function _readSummarySplitPot(line, lineno) {
  if (this._summarySplitPotRx == null) return false
  var idx = 1
  const match = line.match(this._summarySplitPotRx)
  if (!match) return false

  const amount = safeParseFloat(match[idx++])
  const main   = safeParseFloat(match[idx++])
  const side   = safeParseFloat(match[idx++])
  const action = {
      type: 'pot'
    , single: false
    , amount: amount
    , main: main
    , side: side
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }

  if (match[idx] != null) action.rake = safeParseFloat(match[idx++])

  this.hand.summary.push(action)
  return true
}

proto._readSummaryBoard = function _readBoard(line, lineno) {
  const match = line.match(this._summaryBoardRx)
  if (!match) return

  this.hand.board = {
      card1: safeFirstUpper(safeTrim(match[1]))
    , card2: safeFirstUpper(safeTrim(match[2]))
    , card3: safeFirstUpper(safeTrim(match[3]))
    , card4: safeFirstUpper(safeTrim(match[4]))
    , card5: safeFirstUpper(safeTrim(match[5]))
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
}

proto._readSummaryMucked = function _readSummaryMucked(line, lineno) {
  var idx = 1
  const match = line.match(this._summaryMuckedRx)
  if (!match) return false

  const seatno = safeParseInt(match[idx++])
  const player = safeTrim(match[idx++])
  const position = this._summaryIncludesPosition
    ? this._identifySummaryPosition(match[idx++])
    : this._positionFrom(player, seatno)
  const card1  = safeFirstUpper(safeTrim(match[idx++]))
  const card2  = safeFirstUpper(safeTrim(match[idx++]))

  this.hand.summary.push({
      type: 'muck'
    , seatno: seatno
    , player: player
    , position: position
    , card1: card1
    , card2: card2
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })

  return true
}

proto._readSummaryShowedWon = function _readSummaryShowedWon(line, lineno) {
  var idx = 1
  const match = line.match(this._summaryShowedWonRx)
  if (!match) return false

  const seatno = safeParseInt(match[idx++])
  const player = safeTrim(match[idx++])
  const position = this._summaryIncludesPosition
    ? this._identifySummaryPosition(match[idx++])
    : this._positionFrom(player, seatno)
  const card1  = safeFirstUpper(safeTrim(match[idx++]))
  const card2  = safeFirstUpper(safeTrim(match[idx++]))
  const amount = safeParseFloat(match[idx++])
  const description = safeTrim(match[idx++])

  this.hand.summary.push({
      type: 'showed'
    , won: true
    , seatno: seatno
    , player: player
    , position: position
    , card1: card1
    , card2: card2
    , amount: amount
    , description: description
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })

  return true
}

proto._readSummaryShowedLost = function _readSummaryShowedLost(line, lineno) {
  var idx = 1
  const match = line.match(this._summaryShowedLostRx)
  if (!match) return false

  const seatno = safeParseInt(match[idx++])
  const player = safeTrim(match[idx++])
  const position = this._summaryIncludesPosition
    ? this._identifySummaryPosition(match[idx++])
    : this._positionFrom(player, seatno)
  const card1  = safeFirstUpper(safeTrim(match[idx++]))
  const card2  = safeFirstUpper(safeTrim(match[idx++]))
  const description = safeTrim(match[idx++])

  this.hand.summary.push({
      type: 'showed'
    , won: false
    , seatno: seatno
    , player: player
    , position: position
    , card1: card1
    , card2: card2
    , description: description
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })

  return true
}

proto._readSummaryFolded = function _readSummaryFolded(line, lineno) {
  var idx = 1
  const match = line.match(this._summaryFoldedRx)
  if (!match) return false

  const seatno = safeParseInt(match[idx++])
  const player = safeTrim(match[idx++])
  const position = this._summaryIncludesPosition
    ? this._identifySummaryPosition(match[idx++])
    : this._positionFrom(player, seatno)

  const streetIndicator = safeLower(safeTrim(match[idx++]))
  const street = (
      streetIndicator === 'before flop' ? 'preflop'
    : streetIndicator === 'before the flop' ? 'preflop'
    : streetIndicator === 'on the flop' ? 'flop'
    : streetIndicator === 'on the turn' ? 'turn'
    : streetIndicator === 'on the river' ? 'river'
    : 'unknown'
  )
  const bet = match[idx++] == null

  this.hand.summary.push({
      type: 'folded'
    , seatno: seatno
    , player: player
    , position: position
    , street: street
    , bet: bet
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })

  return true
}

proto._readSummaryCollected = function _readSummaryCollected(line, lineno) {
  var idx = 1
  const match = line.match(this._summaryCollectedRx)
  if (!match) return false

  const seatno = safeParseInt(match[idx++])
  const player = safeTrim(match[idx++])
  const position = this._summaryIncludesPosition
    ? this._identifySummaryPosition(match[idx++])
    : this._positionFrom(player, seatno)
  const amount = safeParseFloat(match[idx++])

  this.hand.summary.push({
      type: 'collected'
    , seatno: seatno
    , player: player
    , position: position
    , amount: amount
   , metadata: {
        lineno: lineno
      , raw: line
    }
  })

  return true
}

// All info in summary is already encoded in the hand, but we parse it out anyways in order to
// provide all the info we need to write the entire hand history from this info, i.e. when
// converting from one site format to another.
proto._readSummary =  function _readSummary(line, lineno) {
  if (this._readSummarySinglePot(line, lineno)) return true
  if (this._readSummarySplitPot(line, lineno)) return true
  if (this._readSummaryBoard(line, lineno)) return true
  if (this._readSummaryMucked(line, lineno)) return true
  // Lost cases will also match the won regex, so this order is important
  if (this._readSummaryShowedLost(line, lineno)) return true
  if (this._readSummaryShowedWon(line, lineno)) return true
  if (this._readSummaryFolded(line, lineno)) return true
  if (this._readSummaryCollected(line, lineno)) return true
  return false
}

function actionType(s) {
  s = s.replace(/(ed|s)$/, '').toLowerCase()
  // convert 'fold(timeout)' to 'fold' (Ignition)
  if (/^fold/.test(s)) return 'fold'
  // convert  'All-in(raise)' to 'raise' (Ignition)
  if (/all-in\(raise\)/.test(s)) return 'raise'
  return s
}

proto._readAction = function _readAction(line, lineno) {
  if (this._readBetReturned(line, lineno)) return true

  const match = line.match(this._actionRx)
  if (!match) return false

  const type = actionType(match[2])
  const action = {
      player  : safeTrim(match[1])
    , type    : type
    , amount  : safeParseFloat(match[3])
  }
  if (type === 'raise') {
    action.raiseTo = safeParseFloat(match[4])
    action.allin = !!match[5] || /all-in\(/i.test(match[2])
  } else if (type === 'call' || type === 'bet') {
    action.allin = !!match[5]
  }

  action.metadata = {
      lineno: lineno
    , raw: line
  }

  this._addAction(action, line, lineno)
  return true
}

proto._readCollect = function _readCollect(line, lineno) {
  const match = line.match(this._collectRx)
  if (!match) return false

  const action = {
      player  : safeTrim(match[1])
    , type    : 'collect'
    , amount  : safeParseFloat(match[2])
    , pot     : safeTrim(match[3]) || null
  }
  this._addAction(action, line, lineno)
  return true
}

proto._readBetReturned = function _readBetReturned(line, lineno) {
  const match = line.match(this._betReturnedRx)
  if (!match) return false

  const action = {
      player  : safeTrim(match[2])
    , type    : 'bet-returned'
    , amount  : safeParseFloat(match[1])
  }

  this._addAction(action, line, lineno)
  return true
}

proto._addAction = function _addAction(action, line, lineno) {
  action.metadata = {
      lineno: lineno
    , raw: line
  }
  if (this._sawShowdown) {
    this.hand.showdown.push(action)
  } else if (this._sawRiver) {
    this.hand.river.push(action)
  } else if (this._sawTurn) {
    this.hand.turn.push(action)
  } else if (this._sawFlop) {
    this.hand.flop.push(action)
  } else {
    this.hand.preflop.push(action)
  }
}

proto.parse = function parse() {
  this._cachedGameType = null
  const lines = this._lines
  for (var i = 0; i < lines.length; i++) {
    // Summary
    if (this._sawSummary) {
      if (this._readSummary(lines[i], i)) continue
    } else {
      this._sawSummary = this._summaryIndicator(lines[i], i)
      if (this._sawSummary) continue
    }

    // Showdown
    if (this._sawShowdown) {
      if (this._readShowdown(lines[i], i)) continue
    } else {
      this._sawShowdown = this._showdownIndicator(lines[i], i)
      if (this._sawShowdown) {
        if (this._noseparateShowdownLine) i--
        continue
      }
    }

    // Preflop
    if (this._sawPreflop) {
      if (!this._sawFlop && !this.hand.holecards) {
        if (this._revealRx == null) {
          if (this._readHoleCards(lines[i], i)) {
            this._sawPreflop = true
            continue
          }
        } else {
          // only applies to Ignition for now
          if (this._revealRx != null) {
            if (this._readRevealedCards(lines[i], i)) {
              i++
              while (this._readRevealedCards(lines[i], i)) i++
              i--
            }
            this._sawPreflop = true
            continue
          }
        }
      }
      // Flop, Turn, River
      if (this._readStreet(lines[i], i)) continue
      if (this._readAction(lines[i], i)) continue
      if (this._readCollect(lines[i], i)) continue
    } else {
      this._sawPreflop = this._preflopIndicator(lines[i], i)
      if (this._sawPreflop) continue

      if (this._readPost(lines[i], i)) {
        this._posted = true
        continue
      }
    }

    if (!this._posted) {
      if (this.hand.info == null) {
        if (this._readInfo(lines[i], i)) {
          // in some cases (right now only for tests) we are only interested
          // in the tournament or cash game info (i.e. the first line)
          if (this._infoOnly) return this.hand.info
          continue
        }
      }
      if (!this.hand.table)  if (this._readTable(lines[i], i)) continue
      if (this._readSeat(lines[i], i)) continue
    }
  }
  return this.hand
}

proto.canParse = function canParse() {
  return this._gameType() != null
}

module.exports = HandHistoryParser
