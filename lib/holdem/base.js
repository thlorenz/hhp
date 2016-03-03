/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

const stringUtil     = require('../util/string')
const safeParseInt   = stringUtil.safeParseInt
const safeParseFloat = stringUtil.safeParseFloat
const safeTrim       = stringUtil.safeTrim
const safeLower      = stringUtil.safeLower
const safeUpper      = stringUtil.safeUpper
const safeFirstUpper = stringUtil.safeFirstUpper

function HandHistoryParser (lines) {
  if (!(this instanceof HandHistoryParser)) return new HandHistoryParser(lines)

  this._lines = lines

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
  }
}

var proto = HandHistoryParser.prototype
proto._handInfoRx          = undefined
proto._tableInfoRx         = undefined
proto._seatInfoRx          = undefined
proto._postRx              = undefined
proto._preflopIndicatorRx  = undefined
proto._streetIndicatorRx   = undefined
proto._showdownIndicatorRx = undefined
proto._summaryIndicatorRx  = undefined
proto._holecardsRx         = undefined
proto._actionRx            = undefined
proto._collectRx           = undefined
proto._showRx              = undefined
proto._boardRx             = undefined
proto._muckRx              = undefined

proto._preflopIndicator = function _preflopIndicator (line, lineno) {
  return this._preflopIndicatorRx.test(line)
}

proto._showdownIndicator = function _showdownIndicator (line, lineno) {
  return this._showdownIndicatorRx.test(line)
}

proto._summaryIndicator =  function _summaryIndicator (line, lineno) {
  return this._summaryIndicatorRx.test(line)
}

proto._identifyPokerType = function _identifyPokerType (s) {
  if (typeof s === 'undefined') return undefined
  return  (/hold'?em/i).test(s) ? 'holdem'
        : (/omaha/i).test(s)    ? 'omaha'
        : 'not yet supported'
}

proto._identifyLimit = function _identifyLimit (s) {
  if (typeof s === 'undefined') return undefined

  return  (/(no ?limit|nl)/i).test(s)  ? 'nolimit'
        : (/(pot ?limit|pl)/i).test(s) ? 'potlimit'
        : 'not yet supported'
}

proto._readInfo = function _readInfo (line, lineno) {
  const match    = line.match(this._handInfoRx)
  if (!match) return

  const donation = safeParseFloat(match[6])
  const rake     = safeParseFloat(match[8])

  this.hand.info = {
      room      : safeLower(match[1])
    , handid    : match[2]
    , gametype  : safeLower(match[3])
    , gameno    : match[4]
    , currency  : match[5]
    , donation  : safeParseFloat(donation)
    , rake      : safeParseFloat(rake)
    , buyin     : donation + rake
    , pokertype : this._identifyPokerType(match[9])
    , limit     : this._identifyLimit(match[10])
    , level     : safeLower(match[11])
    , sb        : safeParseFloat(match[12])
    , bb        : safeParseFloat(match[13])
    , year      : safeParseInt(match[14])
    , month     : safeParseInt(match[15])
    , day       : safeParseInt(match[16])
    , hour      : safeParseInt(match[17])
    , min       : safeParseInt(match[18])
    , sec       : safeParseInt(match[19])
    , timezone  : safeUpper(match[20])
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  return true
}

proto._readTable = function _readTable (line, lineno) {
  const match = line.match(this._tableInfoRx)
  if (!match) return

  this.hand.table = {
      tableno  : safeParseInt(match[1])
    , maxseats : safeParseInt(match[2])
    , button   : safeParseInt(match[3])
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  return true
}

proto._readSeat = function _readSeat (line, lineno) {
  const match = line.match(this._seatInfoRx)
  if (!match) return

  this.hand.seats.push({
      seatno: safeParseInt(match[1])
    , player: match[2].trim()
    , chips: safeParseFloat(match[3])
    , metadata: {
        lineno: lineno
      , raw: line
    }
  })
  return true
}

proto._postType = function _postType (s) {
  return  s === 'ante' ?  'ante'
        : s === 'big blind' ? 'bb'
        : s === 'small blind' ? 'sb'
        : 'unknown'
}

proto._readPost = function _readPost (line, lineno) {
  const match = line.match(this._postRx)
  if (!match) return

  const type   = this._postType(match[2])
  const amount = safeParseFloat(match[3])

  this.hand.posts.push({
      player: match[1]
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

proto._readHoleCards = function _readHoleCards (line, lineno) {
  const match = line.match(this._holecardsRx)
  if (!match) return

  this.hand.hero = match[1]
  this.hand.holecards = {
      card1: safeFirstUpper(safeTrim(match[2]))
    , card2: safeFirstUpper(safeTrim(match[3]))
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  return true
}

proto._readStreet = function _readStreet (line, lineno) {
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

proto._readShow =  function _readShow (line, lineno) {
  const match = line.match(this._showRx)
  if (!match) return

  const action = {
      player  : match[1]
    , type    : 'show'
    , card1   : safeFirstUpper(safeTrim(match[2]))
    , card2   : safeFirstUpper(safeTrim(match[3]))
    , desc    : match[4]
    , metadata: {
        lineno: lineno
      , raw: line
    }
  }
  this.hand.showdown.push(action)

  return true
}

proto._readMuck = function _readMuck (line, lineno) {
  const match = line.match(this._muckRx)
  if (!match) return

  const action = {
      player : match[1]
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

proto._readBoard = function _readBoard (line, lineno) {
  const match = line.match(this._boardRx)
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

function actionType (s) {
  return s.replace(/(ed|s)$/, '')
}

proto._readAction = function _readAction (line, lineno) {
  const match = this._sawShowdown ? line.match(this._collectRx) : line.match(this._actionRx)
  if (!match) return

  const type = actionType(match[2])
  const action = {
      player  : match[1]
    , type    : type
    , amount  : safeParseFloat(match[3])
  }
  if (type === 'raise') {
    action.raiseTo = safeParseFloat(match[4])
    action.allin = !!match[5]
  } else if (type === 'call' || type === 'bet') {
    action.allin = !!match[4]
  }

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
  return true
}

proto.parse = function parse () {
  const lines = this._lines
  for (let i = 0; i < lines.length; i++) {
    if (this._sawSummary) {
      if (this._readBoard(lines[i], i)) continue
      if (this._readMuck(lines[i], i)) continue
    } else {
      this._sawSummary = this._summaryIndicator(lines[i], i)
      if (this._sawSummary) continue
    }

    if (this._sawShowdown) {
      if (this._readShow(lines[i], i)) continue
    } else {
      this._sawShowdown = this._showdownIndicator(lines[i], i)
      if (this._sawShowdown) continue
    }

    if (this._sawPreflop) {
      if (!this._sawFlop && !this.hand.holecards) {
        if (this._readHoleCards(lines[i], i)) {
          this._sawPreflop = true
          continue
        }
      }
      if (this._readStreet(lines[i], i)) continue
      if (this._readAction(lines[i], i)) continue
    } else {
      this._sawPreflop = this._preflopIndicator(lines[i], i)
      if (this._sawPreflop) continue
      if (this._readPost(lines[i], i)) {
        this._posted = true
        continue
      }
    }

    if (!this._posted) {
      if (!this.hand.info)   if (this._readInfo(lines[i], i)) continue
      if (!this.hand.table)  if (this._readTable(lines[i], i)) continue
      if (this._readSeat(lines[i], i)) continue
    }
  }
  return this.hand
}

proto.canParse = function canParse () {
  const lines = this._lines
  for (let i = 0; i < lines.length && lines[i].length; i++) {
    if (this._handInfoRx.test(lines[i])) return true
  }
  return false
}

module.exports = HandHistoryParser
