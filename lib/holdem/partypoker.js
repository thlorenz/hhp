'use strict'

const {
    safeParseInt
  , safeParseFloat
  , safeFirstUpper
  , safeTrim
  , dateInfoFromString
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

const { fixAllinActionsForAll } = require('hhp-util/fix-allin-actions')

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
// #Game No : 15414973533
const preludeGameNoRx = /^#Game No/i

// Game #15414973928 starts.
const preludeGameStartRx = /^Game +#\d+ starts/i

/*
 * Setup
 */

// ***** Hand History for Game 198554437 *****
const gameIDRx = /^[*]+ +Hand History for Game +(\d+) +[*]+/i

// Cash:
// $0.10/$0.25 USD NL Texas Hold'em - Tuesday, June 19, 23:00:41 EDT 2018
// SNG:
// NL Texas Hold'em $1 USD Buy-in  - Sunday, July 24, 19:32:00 CEST 2016
// Tourney:
// NL Texas Hold'em $ 530 USD Buy-in Trny:3282980 Level:18  Blinds-Antes(1,250/2,500 -250) - Sunday, July 28, 21:01:39  2013
// Trny: number + Blinds-Antes are listed again in the hand so we don't need to capture them here

// $1 USD Buy-in
const buyin = `(${currency}) *([^ ]+).+Buy-in`

// NL Texas Hold'em
const pokerType = `(${limit})\\s+${type}`

// - Tuesday, June 19, 23:00:41 EDT 2018
const dateAndTime = `-\\s+(.+\\d+)`

const cashGameInfoRx = new RegExp(`${blinds}.+${pokerType}.+${dateAndTime}`, 'i')
const tourneyGameInfoRx = new RegExp(`${pokerType} +${buyin}.+${dateAndTime}`, 'i')

// Table Clifton (Real Money)
const tableRx = /^Table\s+([^(]+)/i

// Seat 2 is the button
const buttonRx = /^Seat\s+(\d+).+button/

// Total number of players : 7/9
const maxseatsRx = /^Total +number.+players.+\d+[/](\d+)/i

// Seat 2: Chinchilakid ( $28.45 USD )
const seatRx = new RegExp(
  `^Seat (\\d+): (.+)\\(\\s*${currency}?([^ ]+)`, 'i'
)

// Trny: 128487129 Level: 1
const tourneyInfoRx = /Trny: *(\d+) +Level: *(\d+)/i
// Blinds(10/20)
// Blinds-Antes(1,250/2,500 -250)
const tourneyBlindsRx = /Blinds(?:-Antes)? *\(([^/]+)[/]([^)-]+)(?:-([^)]+))?/i
// Dealt to Hero [  3h Js ]
const holecardsRx = new RegExp(`Dealt to ([^ ]+) +\\[ *(${card}) +(${card}) *]`)

// angrydad4999 posts small blind [$0.10 USD].
const postRx = new RegExp(
  `([^ ]+) posts (?:the )?(ante|small blind|big blind) +(?:\\+ dead )?\\[${currency}?([^ ]+)`, 'i'
)

/*
 * Street indicators and Actions
 */

// ** Dealing down cards **
const preflopIndicatorRx  = /^\*\* Dealing down cards \*\*/i

const multiStreetCards = `\\[ *${flopCards} *]`
const singleStreetCards = `\\[ *(${card}) *]`

// ** Dealing Flop ** [ 4c, 3s, 7c ]
const flopIndicatorRx = new RegExp(
  `\\*\\* Dealing Flop \\*\\* *${multiStreetCards}`, 'i'
)

// ** Dealing Turn ** [ 2s ]
const turnIndicatorRx = new RegExp(
  `\\*\\* Dealing Turn \\*\\* *${singleStreetCards}`, 'i'
)

// ** Dealing River ** [ 2s ]
const riverIndicatorRx = new RegExp(
  `\\*\\* Dealing River \\*\\* *${singleStreetCards}`, 'i'
)
// worley calls [$0.25 USD]
// SEOULMAN raises [$0.50 USD]
// Chinchilakid folds
// SEOULMAN checks
// slushfund18 bets [$0.75 USD]
// SEOULMAN is all-In  [$8.21 USD]
const actionRx = new RegExp(
  `^([^ ]+) (raises|bets|calls|checks|folds|is all-In)(?: +\\[${currency}?([^ ]+))?`, 'i'
)

const collectRx = new RegExp(
  `^([^ ]+) wins +${currency}?([^ ]+)`, 'i'
)

const showRx = new RegExp(
  `^([^ ]+) shows \\[ *(${card})[, ]+(${card}) *] ?([^.]+)`, 'i'
)
// ThatsUnpossible does not show cards.
const noShowRx = /^[^ ]+ does not show cards/i

const muckRx = new RegExp(
  `^([^ ]+) doesn't show \\[ *(${card})[, ]+(${card}) *] ?([^.]+)`, 'i'
)

/*
 * Noise to ignore
 */

// ThatsUnpossible will be using their time bank for this hand
const timebankRx = /^[^ ]+ will be using their time bank for this hand/i
// Trumpski is disconnected. We will wait for Trumpski to reconnect for a maximum of 14 seconds
const disconnectRx = /^[^ ]+ is disconnected/i
// Birdmannj has joined the table
const reconnectRx = /^[^ ]+ (?:is|has been) reconnected and has \d+ seconds to (?:act|respond)/i
// GotInsurance is sitting out
const timeoutRx = /^[^ ]+ (?:did|could) not respond in time/i
// shapshap42 did not respond in time
// Ferodin could not respond in time.(disconnected)
const sitoutRx = /^[^ ]+ is sitting out/i
// rafikm1976 has been reconnected and has 20 seconds to act
const tableJoinLeaveRx = /^[^ ]+ has (?:joined|left) the table/i
// Due to current high memory use in your system we disabled the chip ...
const highMemoryRx = /^Due to current high memory use in your system/i

class HoldemPartyPokerParser {
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
    if (preludeGameNoRx.test(line) || preludeGameStartRx.test(line)) {
      this._hand.ignored.push({ lineno, raw: line })
      return true
    }
    return false
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

  _readCashGameInfo(line, lineno) {
    const match = line.match(cashGameInfoRx)
    if (match == null) return false

    const [ , currency, sb, bb, limit, type, dateAndTime ] = match
    const dateInfo = dateInfoFromString(dateAndTime)

    this._hand.info = Object.assign(
        this._hand.info
      , { gametype : 'cash'
        , currency
        , sb        : safeParseFloat(sb)
        , bb        : safeParseFloat(bb)
        , limit     : identifyLimit(limit)
        , pokertype : identifyPokerType(type)
        }
      , dateInfo)

    this._hand.info.metadata.push({ lineno, raw: line })
    this._item++
    this._iscashgame = true
    return true
  }

  _readTourneyGameInfo(line, lineno) {
    const match = line.match(tourneyGameInfoRx)
    if (match == null) return false

    const [ , limit, type, currency, buyin, dateAndTime ] = match
    const dateInfo = dateInfoFromString(dateAndTime)

    this._hand.info = Object.assign(
        this._hand.info
      , { gametype : 'tournament'
        , currency
        , buyin     : safeParseFloat(buyin)
        , limit     : identifyLimit(limit)
        , pokertype : identifyPokerType(type)
        }
      , dateInfo)

    this._hand.info.metadata.push({ lineno, raw: line })
    this._item++
    this._iscashgame = false
    return true
  }

  _readTable(line, lineno) {
    const match = line.match(tableRx)
    if (match == null) return false

    this._hand.table.table = match[1].trim()
    this._hand.table.metadata.push({ lineno, raw: line })
    this._item++
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

  _readTourneyInfo(line, lineno) {
    if (this._iscashgame) return false
    const match = line.match(tourneyInfoRx)
    if (match == null) return false

    const [ , gameno, level ] = match
    Object.assign(this._hand.info, { gameno, level })
    this._hand.info.metadata.push({ lineno, raw: line })
    return true
  }

  _readBlinds(line, lineno) {
    if (this._iscashgame) return false
    const match = line.match(tourneyBlindsRx)
    if (match == null) return false

    const [ , sb, bb, ante ] = match
    Object.assign(this._hand.info, {
        sb: safeParseFloat(sb)
      , bb :safeParseFloat(bb)
    })
    if (ante != null) this._hand.info.ante = safeParseFloat(ante)

    this._hand.info.metadata.push({ lineno, raw: line })
    return true
  }

  _readPost(line, lineno) {
    const match = line.match(postRx)
    if (match == null) return false

    const type   = identifyPost(match[2])
    const amount = safeParseFloat(match[3])

    this._hand.posts.push({
        player   : safeTrim(match[1])
      , type     : type
      , amount   : amount
      , metadata : { lineno: lineno, raw: line }
    })
    if (type === 'ante' && !this._hand.info.ante) this._hand.info.ante = amount

    return true
  }

  _readSectionSetup(line, lineno) {
    if (this._item === item.GAMEID) return this._readGameID(line, lineno)
    if (this._item === item.GAMEINFO) {
      return (
        this._readCashGameInfo(line, lineno) ||
        this._readTourneyGameInfo(line, lineno)
      )
    }
    if (this._item === item.TABLE) return this._readTable(line, lineno)
    if (this._item === item.BUTTON) return this._readButton(line, lineno)
    if (this._item === item.MAXSEATS) return this._readMaxSeats(line, lineno)
    if (this._item === item.SEATS) {
      if (this._readSeat(line, lineno)) return true
      if (this._readTourneyInfo(line, lineno)) return true
      if (this._readBlinds(line, lineno)) return true
      this._item = item.POSTS
    }
    if (this._item === item.POSTS) return this._readPost(line, lineno)
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

  _ignoreNoise(line, lineno) {
    return (
         timebankRx.test(line)
      || disconnectRx.test(line)
      || reconnectRx.test(line)
      || timeoutRx.test(line)
      || sitoutRx.test(line)
      || tableJoinLeaveRx.test(line)
      || highMemoryRx.test(line)
    )
  }

  parse() {
    for (var lineno = 0; lineno < this._lines.length; lineno++) {
      const line = this._lines[lineno].trim()
      if (line.length === 0) {
        // ignore leading empty lines
        if (this._section === section.SETUP) continue
        // consider the hand finis if we see an empty line once we started parsing
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
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
        if (this._readNoReveal(line, lineno)) continue
      } else if (this._section === section.FLOP) {
        // Flop
        if (this._readAction(line, lineno, this._hand.flop)) continue
        if (this._readIndicatorTurn(line, lineno)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
        if (this._readNoReveal(line, lineno)) continue
      } else if (this._section === section.TURN) {
        // Turn
        if (this._readAction(line, lineno, this._hand.turn)) continue
        if (this._readIndicatorRiver(line, lineno)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
        if (this._readNoReveal(line, lineno)) continue
      } else if (this._section === section.RIVER) {
        // River
        if (this._readAction(line, lineno, this._hand.river)) continue
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
        if (this._readNoReveal(line, lineno)) continue
      } else if (this._section === section.SHOWDOWN) {
        // Showdown
        if (this._readCollect(line, lineno)) continue
        if (this._readReveal(line, lineno)) continue
        if (this._readNoReveal(line, lineno)) continue
      }
      if (this._ignoreNoise(line, lineno)) continue

      this._hand.ignored.push({ lineno, raw: line })
    }

    fixAllinActionsForAll(this._hand, this._allins)

    return this._hand
  }
}

function parse(lines, opts) {
  return new HoldemPartyPokerParser(lines).parse()
}

function canParse(lines) {
  const fl = lines[0]
  if (!gameIDRx.test(fl)
    && !preludeGameNoRx.test(fl)
    && !preludeGameStartRx.test(fl)) return false

  // pacific and partypoker are very close so we need an extra indicator
  // Pacific gameID includes 888poker in gameID
  for (const l of lines) {
    if (gameIDRx.test(l)) return true
  }
  return false
}

module.exports = { canParse, parse }
