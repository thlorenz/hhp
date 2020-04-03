'use strict'

const stringUtil     = require('hhp-util/string')
const safeParseInt   = stringUtil.safeParseInt
const safeParseFloat = stringUtil.safeParseFloat
const safeTrim       = stringUtil.safeTrim
const safeLower      = stringUtil.safeLower
const safeUpper      = stringUtil.safeUpper
const safeFirstUpper = stringUtil.safeFirstUpper
const priceFreeroll  = require('hhp-util/tweaks').priceFreeroll

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

function actionType(s) {
  s = s.replace(/(ed|s)$/, '').toLowerCase()
  // convert 'fold(timeout)' to 'fold' (Ignition)
  if (/^fold/.test(s)) return 'fold'
  // convert  'All-in(raise)' to 'raise' (Ignition)
  if (/all-in\(raise\)/.test(s)) return 'raise'
  if (/all-in\(bet\)/.test(s)) return 'bet'
  if (/all-in/i.test(s)) return 'call'
  return s
}

class HandHistoryParser {
  constructor(lines, opts) {
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

  _preflopIndicator(line, lineno) {
    return this._preflopIndicatorRx.test(line)
  }

  _showdownIndicator(line, lineno) {
    return this._showdownIndicatorRx.test(line)
  }

  _summaryIndicator(line, lineno) {
    return this._summaryIndicatorRx.test(line)
  }

  _identifyPokerType(s) {
    if (typeof s === 'undefined') return undefined
    return  (/hold'?em/i).test(s) ? 'holdem'
          : (/omaha/i).test(s)    ? 'omaha'
          : 'not yet supported'
  }

  _identifyLimit(s) {
    if (typeof s === 'undefined') return undefined

    return  (/(no ?limit|nl)/i).test(s)  ? 'nolimit'
          : (/(pot ?limit|pl)/i).test(s) ? 'potlimit'
          : 'not yet supported'
  }

  _identifySummaryPosition(s) {
    if (s == null) return ''
    const lower = s.trim().toLowerCase()
    return (
        lower === 'button'      ? 'bu'
      : lower === 'big blind'   ? 'bb'
      : lower === 'small blind' ? 'sb'
      : 'unknown'
    )
  }

  _readInfo(line, lineno) {
    line = priceFreeroll(line)
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
    info.fast = this._tableFast
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

  _readTable(line, lineno) {
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

  _readSeat(line, lineno) {
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

  _postType(s) {
    const lower = s.toLowerCase()
    return (lower === 'ante' || lower === 'ante chip')  ? 'ante'
          : lower === 'big blind'                       ? 'bb'
          : lower === 'small blind'                     ? 'sb'
          : 'unknown'
  }

  _readPost(line, lineno) {
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

  _setHeroHoleCards(player, card1, card2, line, lineno) {
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

  _readHoleCards(line, lineno) {
    const match = line.match(this._holecardsRx)
    if (!match) return
    this._setHeroHoleCards(match[1], match[2], match[3], line, lineno)
    return true
  }

  // only applies to Ignition which reveals all player's cards
  _readRevealedCards(line, lineno) {
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

  _readStreet(line, lineno) {
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
    if (match[1] === 'FLOP') {
      this._sawFlop = true
    }
    if (match[1] === 'TURN') {
      this._sawTurn = true
      this.hand.board.card4 = this.hand.board.card5
      this.hand.board.card5 = undefined
    }
    if (match[1] === 'RIVER') this._sawRiver = true
    return true
  }

  //
  // Showdown
  //
  _readShowdownShow(line, lineno) {
    const match = line.match(this._showRx)
    if (!match) return

    const action = showAction(match, 'show', line, lineno)
    this.hand.showdown.push(action)

    return true
  }

  _readShowdownMuck(line, lineno) {
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

  _readShowdownFinish(line, lineno) {
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

  _readShowdown(line, lineno) {
    if (this._readShowdownShow(line, lineno)) return true
    if (this._readShowdownMuck(line, lineno)) return true
    if (this._readShowdownFinish(line, lineno)) return true
    if (this._readCollect(line, lineno)) return true
    return false
  }

  //
  // Summary
  //
  _readSummarySinglePot(line, lineno) {
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

  _readSummarySplitPot(line, lineno) {
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

  _readSummaryBoard(line, lineno) {
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

  _readSummaryMucked(line, lineno) {
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

  _readSummaryShowedWon(line, lineno) {
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

  _readSummaryShowedLost(line, lineno) {
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

  _readSummaryFolded(line, lineno) {
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

  _readSummaryCollected(line, lineno) {
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
  _readSummary(line, lineno) {
    if (this._summarySinglePotRx != null && this._readSummarySinglePot(line, lineno)) return true
    if (this._summarySplitPotRx != null && this._readSummarySplitPot(line, lineno)) return true
    if (this._summaryBoardRx != null && this._readSummaryBoard(line, lineno)) return true
    if (this._summaryMuckedRx != null && this._readSummaryMucked(line, lineno)) return true
    // Lost cases will also match the won regex, so this order is important
    if (this._summaryShowedLostRx != null && this._readSummaryShowedLost(line, lineno)) return true
    if (this._summaryShowedWonRx != null && this._readSummaryShowedWon(line, lineno)) return true
    if (this._summaryFoldedRx != null && this._readSummaryFolded(line, lineno)) return true
    if (this._summaryCollectedRx != null && this._readSummaryCollected(line, lineno)) return true
    return false
  }

  _readAction(line, lineno) {
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
      action.allin = !!match[5] || /all-in/i.test(match[2])
      // Rooms like PartyPoker just state the amount that the player raised to.
      // The actual raise amount could be calculated from the current bet and raiseTo.
      if (action.raiseTo == null) {
        action.raiseTo = action.amount
        action.amount = null
      }
    } else if (type === 'call' || type === 'bet') {
      action.allin = !!match[5] || /all-in/i.test(match[2])
    }

    action.metadata = { lineno: lineno, raw: line }
    this._addAction(action, line, lineno)
    return true
  }

  _readCollect(line, lineno) {
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

  _readBetReturned(line, lineno) {
    if (this._betReturnedRx == null) return false
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

  _addAction(action, line, lineno) {
    action.metadata = { lineno: lineno, raw: line }

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

  _isdone(line, lineno, lines) {
    return false
  }

  parse() {
    this._cachedGameType = null
    this._tableFast = false
    const lines = this._lines
    for (var i = 0; i < lines.length; i++) {
      if (this._isdone(lines[i], i, lines)) break

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
          const signal = this._readInfo(lines[i], i, lines)
          if (signal != null) {
            // in some cases (right now only for tests) we are only interested
            // in the tournament or cash game info (i.e. the first line)
            if (this._infoOnly) return this.hand.info
            // In some cases the info is spread across multiple lines (i.e. party poker)
            // Here we allow it to communicate how many more lines it consumed
            if (typeof signal === 'number') i += signal
            continue
          }
        }
        if (this.hand.table == null) {
          const signal = this._readTable(lines[i], i, lines)
          if (signal != null) {
            if (typeof signal === 'number') i += signal
            continue
          }
        }
        if (this._readSeat(lines[i], i)) continue
      }
    }
    return this.hand
  }

  canParse() {
    return this._gameType() != null
  }
}

/*
 * Methods/Rxs that need to be implemented by classes extending HandHistoryParser
 */

// Methods returning the rx for given gametype (tourney|cash)
HandHistoryParser.prototype._handInfoRx          = undefined
HandHistoryParser.prototype._tableInfoRx         = undefined

// Method that returns gametype of loaded hand
HandHistoryParser.prototype._gameType            = undefined

// Regexes that need to be implemented

// Hand Setup
HandHistoryParser.prototype._seatInfoRx          = undefined
HandHistoryParser.prototype._postRx              = undefined

// Street Indicators
HandHistoryParser.prototype._preflopIndicatorRx  = undefined
HandHistoryParser.prototype._streetIndicatorRx   = undefined
HandHistoryParser.prototype._showdownIndicatorRx = undefined
HandHistoryParser.prototype._summaryIndicatorRx  = undefined

// Street actions
HandHistoryParser.prototype._holecardsRx         = undefined
HandHistoryParser.prototype._actionRx            = undefined
HandHistoryParser.prototype._collectRx           = undefined
HandHistoryParser.prototype._betReturnedRx       = undefined

// Showdown (also uses _collectRx and _betReturnedRx)
HandHistoryParser.prototype._showRx              = undefined
HandHistoryParser.prototype._muckRx              = undefined
HandHistoryParser.prototype._finishRx            = undefined

// Summary
HandHistoryParser.prototype._summarySinglePotRx  = undefined
HandHistoryParser.prototype._summarySplitPotRx   = undefined
HandHistoryParser.prototype._summaryBoardRx      = undefined
HandHistoryParser.prototype._summaryMuckedRx     = undefined
HandHistoryParser.prototype._summaryCollectedRx  = undefined
HandHistoryParser.prototype._summaryShowedWonRx  = undefined
HandHistoryParser.prototype._summaryShowedLostRx = undefined
HandHistoryParser.prototype._summaryFoldedRx     = undefined

// Only applies to Ignition for now
HandHistoryParser.prototype._revealRx            = undefined

module.exports = HandHistoryParser
