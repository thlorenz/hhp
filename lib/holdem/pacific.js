'use strict'

const {
    safeParseInt
  , safeParseFloat
  , safeFirstUpper
  , safeTrim
} = require('hhp-util/string')

const {
    identifyPokerType
  , identifyLimit
  , identifyPost
  , identifyActionType
} = require('hhp-util/identifiers')

const {
    currency
  , blinds
  , type
  , limit
  , card
  , flopCards
} = require('hhp-util/rx-partials')

const enumString = require('hhp-util/enum-string')

const { detectAllins } = require('hhp-util/detect-allins')

const item = {
    GAMEID   : 0
  , GAMEINFO : 1
  , TABLE    : 2
  , BUTTON   : 3
  , MAXSEATS : 4
  , SEATS    : 5
  , POSTS    : 6
  , ACTIONS  : 7
}

const section = {
    SETUP    : 0
  , PREFLOP  : 1
  , FLOP     : 2
  , TURN     : 3
  , RIVER    : 4
  , SHOWDOWN : 5
}

/*
 * Prelude (ignore)
 */
// #Game No : 503663069
const preludeGameNoRx = /^#Game No/i

/*
 * Setup
 */

// ***** Hand History for Game 198554437 *****
// ***** 888poker Hand History for Game 503663069 *****
// ***** Cassava Hand History for Game 384831647 *****
const gameIDRx = /^[*]+ +(?:888poker|Cassava) +Hand History for Game +(\d+) +[*]+/i

// Table Embu 10 Max (Real Money)
const table = 'Table\\s+([^(]+)'
const tableRx = new RegExp(`^${table}`, 'i')

// Cash+Tourney:
// $0.06/$0.12 Blinds Fix Limit Holdem - *** 17 06 2018 20:28:21

// Fix Limit Holdem
const pokerType = `(${limit})\\s+${type}`

// 17 06 2018 20:28:21
const dateAndTime = '(\\d+) +(\\d+) +(\\d+) +(\\d+):+(\\d+):+(\\d+)'
const gameInfoRx = new RegExp(`${blinds} +Blinds.+${pokerType}.+[*]{3} +${dateAndTime}`, 'i')

// Tourney only
// Tournament #83728678 $18.30 + $1.70 - Table #1 9 Max (Real Money)
const tournamentID =
  // Tournament #83728678
  'Tournament #(\\d+)'

const tournamentBuyIn =
  // $18.30 + $1.70
  `${currency}((?:[\\d]+\\.\\d+)|(?:[\\d]+)) *\\+ *${currency}((?:[\\d]+\\.\\d+)|(?:[\\d]+))`

const tourneyGameInfoRx = new RegExp(
  `${tournamentID} ${tournamentBuyIn}.+${table}`
)

// Seat 5 is the button
const buttonRx = /^Seat\s+(\d+).+button/

// Total number of players : 2
const maxseatsRx = /^Total +number.+players.+(\d+)/i

// Seat 5: uyangau ( $4.80 )
const seatRx = new RegExp(
  `^Seat (\\d+): (.+)\\(\\s*${currency}?([^ ]+)`, 'i'
)

const holecardsRx = new RegExp(`Dealt to ([^ ]+) +\\[ *(${card})[, ]+(${card}) *]`)

// uyangau posts small blind [$0.06]
const postRx = new RegExp(
  `([^ ]+) posts (?:the )?(ante|small blind|big blind) +(?:\\+ dead )?\\[${currency}?([^\\]]+)`, 'i'
)

// Flanx posts dead blind [$0.01 + $0.02]
const postDeadBlindRx = new RegExp(
  `([^ ]+) posts dead blind +\\[${currency}([^ +]+)[ +]+${currency}([^ \\]]+)\\]`
)

/*
 * Street indicators and Actions
 */

// ** Dealing down cards **
const preflopIndicatorRx  = /^\*\* Dealing down cards \*\*/i

const multiStreetCards = `\\[ *${flopCards} *]`
const singleStreetCards = `\\[ *(${card}) *]`

// ** Dealing flop ** [ 4c, 3s, 7c ]
const flopIndicatorRx = new RegExp(
  `\\*\\* Dealing flop \\*\\* *${multiStreetCards}`, 'i'
)

// ** Dealing turn ** [ 2c ]
const turnIndicatorRx = new RegExp(
  `\\*\\* Dealing turn \\*\\* *${singleStreetCards}`, 'i'
)

// ** Dealing river ** [ 2s ]
const riverIndicatorRx = new RegExp(
  `\\*\\* Dealing river \\*\\* *${singleStreetCards}`, 'i'
)

// ** Summary **
const summaryIndicatorRx = /[*]{2} Summary [*]{2}/i

// uyangau calls [$0.06]
// Chillwill184 checks
// uyangau bets [$0.12]
const actionRx = new RegExp(
  `^([^ ]+) (raises|bets|calls|checks|folds|is all-In)(?: +\\[${currency}?([^\\]]+))?`, 'i'
)

// Chillwill184 collected [ $0.94 ]
const collectRx = new RegExp(
  `^([^ ]+) collected +\\[ +${currency}?([^ ]+) *]`, 'i'
)

// Chillwill184 shows [ Kh, 7h ]
const showRx = new RegExp(
  `^([^ ]+) shows \\[ *(${card})[, ]+(${card}) *]`, 'i'
)

// ChesterJ28 did not show his hand
const noShowRx = /^[^ ]+ did not show his hand/

// uyangau mucks [ 9c, 8s ]
const muckRx = new RegExp(
  `^([^ ]+) mucks \\[ *(${card})[, ]+(${card}) *]`, 'i'
)

class HoldemPacificParser {
  constructor(lines) {
    this._lines = lines
    this._section = section.SETUP
    this._item = item.GAMEID

    this._hand = {
        info      : { metadata : [] }
      , table     : { metadata : [] }
      , hero      : null
      , holecards : null
      , seats     : []
      , posts     : []
      , preflop   : []
      , flop      : []
      , turn      : []
      , river     : []
      , showdown  : []
      , ignored   : []
    }
    this._allins = {
        preflop: false
      , flop: false
      , turn: false
      , river: false
    }
  }

  /*
   * Prelude
   */
  _ignorePrelude(line, lineno) {
    return preludeGameNoRx.test(line)
  }

  /*
   * Setup
   */
  _readGameID(line, lineno) {
    const match = line.match(gameIDRx)
    if (match == null) return false

    this._hand.info.handid = match[1]
    this._hand.info.metadata.push({ lineno, raw: line })
    this._item++
    return true
  }

  _readGameInfo(line, lineno) {
    const match = line.match(gameInfoRx)
    if (match == null) return false

    const [ , currency, sb, bb, limit, type, day, month, year, hour, min, sec ] = match

    this._hand.info = Object.assign(
        this._hand.info
      , { currency
        , day       : safeParseInt(day)
        , month     : safeParseInt(month)
        , year      : safeParseInt(year)
        , hour      : safeParseInt(hour)
        , min       : safeParseInt(min)
        , sec       : safeParseInt(sec)
        , sb        : safeParseFloat(sb)
        , bb        : safeParseFloat(bb)
        , limit     : identifyLimit(limit)
        , pokertype : identifyPokerType(type)
        })

    this._hand.info.metadata.push({ lineno, raw: line })
    this._item++
    return true
  }

  _readTable(line, lineno) {
    const match = line.match(tableRx)
    if (match == null) return false

    // Tourneys have table info as part of gameinfo
    // therefore this indicates a cash game
    this._hand.info.gametype = 'cash'

    this._hand.table.table = match[1].trim()
    this._hand.table.metadata.push({ lineno, raw: line })
    this._item++
    return true
  }

  _readTourneyInfo(line, lineno) {
    const match = line.match(tourneyGameInfoRx)
    if (match == null) return false

    const [ , gameno, donation, rake, table ] = match
    const d = safeParseFloat(donation)
    const r = safeParseFloat(rake)

    this._hand.info = Object.assign(
        this._hand.info
      , { gametype : 'tournament'
        , gameno: safeParseInt(gameno)
        , donation: d
        , rake: r
        , buyin : d + r
        })

    this._hand.info.metadata.push({ lineno, raw: line })

    this._hand.table.table = table.trim()
    this._hand.table.metadata.push({ lineno, raw: line })

    this._item++
    this._iscashgame = false

    this._item = item.BUTTON
    return true
  }

  _readButton(line, lineno) {
    const match = line.match(buttonRx)
    if (match == null) return false

    this._hand.table.button = safeParseInt(match[1])
    this._hand.table.metadata.push({ lineno, raw: line })
    this._item++
    return true
  }

  _readMaxSeats(line, lineno) {
    const match = line.match(maxseatsRx)
    if (match == null) return false

    this._hand.table.maxseats = safeParseInt(match[1])
    this._hand.table.metadata.push({ lineno, raw: line })
    this._item++
    return true
  }

  _readSeat(line, lineno) {
    const match = line.match(seatRx)
    if (match == null) return false

    this._hand.seats.push({
        seatno   : safeParseInt(match[1])
      , player   : safeTrim(match[2])
      , chips    : safeParseFloat(match[3])
      , metadata : { lineno: lineno, raw: line }
    })
    return true
  }

  _readPost(line, lineno) {
    const match = line.match(postRx)
    if (match == null) return false

    const type   = identifyPost(match[2])
    const amount = safeParseFloat(match[3])

    this._hand.posts.push({
        player   : match[1]
      , type     : type
      , amount   : amount
      , metadata : { lineno: lineno, raw: line }
    })
    if (type === 'ante' && !this._hand.info.ante) this._hand.info.ante = amount

    return true
  }

  _readPostDeadBlind(line, lineno) {
    const match = line.match(postDeadBlindRx)
    if (match == null) return false

    const [ , player, sb, bb ] = match
    const amount = safeParseFloat(sb) + safeParseFloat(bb)
    this._hand.posts.push({
        player
      , type     : 'blind'
      , amount
      , metadata : { lineno: lineno, raw: line }
    })

    return true
  }

  _readSectionSetup(line, lineno) {
    if (this._item === item.GAMEID) return this._readGameID(line, lineno)
    if (this._item === item.GAMEINFO) return this._readGameInfo(line, lineno)
    if (this._item === item.TABLE) {
      return this._readTable(line, lineno)      // cash game
        || this._readTourneyInfo(line, lineno)  // tourney (includes table)
    }
    if (this._item === item.BUTTON) return this._readButton(line, lineno)
    if (this._item === item.MAXSEATS) return this._readMaxSeats(line, lineno)
    if (this._item === item.SEATS) {
      if (this._readSeat(line, lineno)) return true
      this._item = item.POSTS
    }
    if (this._item === item.POSTS) {
      return this._readPost(line, lineno) || this._readPostDeadBlind(line, lineno)
    }
    return false
  }

  /*
   * Street Indicators and Actions
   */
  _readIndicatorPreflop(line, lineno) {
    const match = line.match(preflopIndicatorRx)
    if (match == null) return false

    this._section = section.PREFLOP
    return true
  }

  _readIndicatorFlop(line, lineno) {
    const match = line.match(flopIndicatorRx)
    if (match == null) return false

    this._hand.board = {
        card1: safeFirstUpper(safeTrim(match[1]))
      , card2: safeFirstUpper(safeTrim(match[2]))
      , card3: safeFirstUpper(safeTrim(match[3]))
      , metadata: [ { lineno: lineno, raw: line } ]
    }

    this._section = section.FLOP

    return true
  }

  _readIndicatorTurn(line, lineno) {
    const match = line.match(turnIndicatorRx)
    if (match == null) return false

    this._hand.board.card4 = safeFirstUpper(safeTrim(match[1]))
    this._hand.board.metadata.push({ lineno: lineno, raw: line })

    this._section = section.TURN

    return true
  }

  _readIndicatorRiver(line, lineno) {
    const match = line.match(riverIndicatorRx)
    if (match == null) return false

    this._hand.board.card5 = safeFirstUpper(safeTrim(match[1]))
    this._hand.board.metadata.push({ lineno: lineno, raw: line })

    this._section = section.RIVER

    return true
  }

  _readIndicatorSummary(line, lineno) {
    if (!summaryIndicatorRx.test(line)) return false
    this._section = section.SHOWDOWN
    return true
  }

  _readHoleCards(line, lineno) {
    const match = line.match(holecardsRx)
    if (match == null) return false

    const [ , hero, card1, card2 ] = match
    Object.assign(this._hand, {
        hero
      , holecards: { card1, card2 }
    })

    return true
  }

  _readAction(line, lineno, actions) {
    const match = line.match(actionRx)
    if (match == null) return false

    // SEOULMAN is all-In  [$8.21 USD]
    // is identified as all-in call so we need to determine
    // the actual action via a post processing step
    const type = identifyActionType(match[2])
    const action = {
        player  : safeTrim(match[1])
      , type    : type
      , amount  : safeParseFloat(match[3])
    }
    if (type === 'raise') {
      // PartyPoker only states total amount the player raised to
      action.raiseTo = action.amount
      action.amount = null
    } else if (type === 'call' || type === 'bet') {
      action.allin = /all-in/i.test(match[2])
      if (this._section === section.PREFLOP) this._allins.preflop = true
      if (this._section === section.FLOP) this._allins.flop = true
      if (this._section === section.TURN) this._allins.turn = true
      if (this._section === section.RIVER) this._allins.river = true
    }

    actions.push(action)

    action.metadata = { lineno: lineno, raw: line }
    return true
  }

  _readCollect(line, lineno) {
    const match = line.match(collectRx)
    if (match == null) return false

    const action = {
        type    : 'collect'
      , player  : safeTrim(match[1])
      , amount  : safeParseFloat(match[2])
      , metadata: { lineno, raw: line }
    }

    this._section = section.SHOWDOWN
    this._hand.showdown.push(action)
    return true
  }

  _readReveal(line, lineno) {
    var match = line.match(showRx)
    var type

    if (match != null) {
      type = 'show'
    } else {
      match = line.match(muckRx)
      if (match == null) return false
      type = 'muck'
    }

    const action = {
        player  : safeTrim(match[1])
      , type
      , card1   : safeFirstUpper(safeTrim(match[2]))
      , card2   : safeFirstUpper(safeTrim(match[3]))
      , metadata: { lineno: lineno, raw: line }
    }
    if (match[4] != null) action.desc = match[4]

    this._hand.showdown.push(action)

    return true
  }

  _readNoReveal(line, lineno) {
    return noShowRx.test(line)
  }

  parse() {
    for (var lineno = 0; lineno < this._lines.length; lineno++) {
      const line = this._lines[lineno].trim()
      if (line.length === 0) {
        // ignore leading empty lines
        if (this._section === section.SETUP) continue
        // consider the hand finished if we see an empty line once we started parsing
        break
      }

      // Setup
      if (this._section === section.SETUP) {
        if (this._ignorePrelude(line, lineno)) continue
        if (this._readSectionSetup(line, lineno)) continue

        if (this._readIndicatorPreflop(line, lineno)) {
          this._section = section.PREFLOP
          this._item = item.ACTIONS
          continue
        }

        // some folds are listed before preflop indicator as part of posts
        if (this._readAction(line, lineno, this._hand.preflop)) continue

        if (this._item === item.GAMEID) {
          throw new Error(`Expected game setup item(s) but found:\n  ${line}`)
        } else if (this._item < item.SEATS) {
          throw new Error(`Expected setup item ${enumString(item, this._item)}, but found:\n  ${line}`)
        }

        // ignore sitout messages once we saw at least player seats
      } else if (this._section === section.PREFLOP) {
        // Preflop
        if (this._readHoleCards(line, lineno)) continue
        if (this._readAction(line, lineno, this._hand.preflop)) continue
        if (this._readIndicatorFlop(line, lineno)) continue
        if (this._readIndicatorSummary(line, lineno)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
      } else if (this._section === section.FLOP) {
        // Flop
        if (this._readAction(line, lineno, this._hand.flop)) continue
        if (this._readIndicatorTurn(line, lineno)) continue
        if (this._readIndicatorSummary(line, lineno)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
      } else if (this._section === section.TURN) {
        // Turn
        if (this._readAction(line, lineno, this._hand.turn)) continue
        if (this._readIndicatorRiver(line, lineno)) continue
        if (this._readIndicatorSummary(line, lineno)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
      } else if (this._section === section.RIVER) {
        // River
        if (this._readAction(line, lineno, this._hand.river)) continue
        if (this._readIndicatorSummary(line, lineno)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
      } else if (this._section === section.SHOWDOWN) {
        // Showdown
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
        if (this._readNoReveal(line, lineno)) continue
      }

      this._hand.ignored.push({ lineno, raw: line })
    }

    detectAllins(this._hand)

    return this._hand
  }
}

function parse(lines, opts) {
  return new HoldemPacificParser(lines).parse()
}

function canParse(lines) {
  const fl = lines[0]
  return gameIDRx.test(fl) || preludeGameNoRx.test(fl)
}

module.exports = { canParse, parse }
