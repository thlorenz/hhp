'use strict'

const stringUtil     = require('hhp-util/string')
const safeParseInt   = stringUtil.safeParseInt
const safeParseFloat = stringUtil.safeParseFloat
const safeTrim       = stringUtil.safeTrim
const safeLower      = stringUtil.safeLower
const safeFirstUpper = stringUtil.safeFirstUpper

const hero = 'IgnitionHero'
const prefix = 'Ignition-'

// Tournament
// Ignition Hand #3548320887: HOLDEM Tournament #18509313 TBL#1,
// Normal- Level 1 (10/20) - 2017-07-21 13:48:15

// Cash Zone Poker
// Ignition Hand #3372762461  Zone Poker ID#875 HOLDEMZonePoker No Limit - 2016-10-16 13:55:35
// It appears that Bovada has an identical history format
const roomGameID =
  // Ignition Hand #3548320887:
  '^(Ignition|Bovada) (?:Hand|Game) #(\\d+):? +'

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

class HoldemIgnitionParser extends HandHistoryParser {
  _handInfoRx(gameType) {
    switch (gameType.toLowerCase()) {
      case 'tournament': return { rx: tournamentInfo, idxs: tournamentInfoIdxs }
      case 'cashgame': return { rx: cashGameInfo, idxs: cashGameInfoIdxs }
      default: throw new Error('Unknown game type ' + gameType)
    }
  }

  _tableRx(gameType) {
    // Ignition doesn't have the extra line describing the table
    // all info is included in the first line.
    return null
  }

  _gameType() {
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

  // @override
  // implemented in base but order of matches reversed from default
  _readBetReturned(line, lineno) {
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

  //
  // Showdown
  //

  // @override
  _showdownIndicator(line, lineno) {
    return this._showRx.test(line)
  }

  _readShowdownFinishPlace(line, lineno) {
    const match = line.match(this._finishPlaceRx)
    if (!match) return

    const action = {
        player  : safeTrim(match[1])
      , type    : 'finish'
      , place   : safeParseInt(match[2]) || null
      , metadata: {
          lineno: lineno
        , raw: line
      }
    }
    this.hand.showdown.push(action)
    // hold on to this so we can add the prize (amount) won which is given on next line
    this._lastFinish = action

    return true
  }

  _readShowdownFinishAmount(line, lineno) {
    const match = line.match(this._finishAmountRx)
    if (!match) return

    const player = safeTrim(match[1])

    // matched but no idea where it belongs
    if (this._lastFinish.player !== player) return true

    // Ignition doesn't give us the currency in the head, so we fill it in when we
    // can, like here
    if (this.hand.info != null && this.hand.info.currency == null) {
      this.hand.info.currency = safeTrim(match[2])
    }
    this._lastFinish.amount = safeParseFloat(match[3])
    this._lastFinish.metadata.raw = this._lastFinish.metadata.raw + '\n' + line

    return true
  }

  // @override
  _readShowdownShow(line, lineno) {
    const match = line.match(this._showRx)
    if (!match) return

    // Cards aren't known here since Ignition shows full board used for best hand
    // However since all cards are revealed we can fill those in after we read the
    // whole hand.
    const action = {
        player  : safeTrim(match[1])
      , type    : 'show'
      , metadata: {
          lineno: lineno
        , raw: line
      }
    }
    if (match[2] != null) action.desc = safeTrim(safeLower(match[2]))
    this.hand.showdown.push(action)

    return true
  }

  _positionFrom(player, seatno) {
    if (player == null) return ''
    const lower = player.toLowerCase()
    return (
        lower === 'dealer'      ? 'bu'
      : lower === 'small blind' ? 'sb'
      : lower === 'big blind'   ? 'bb'
      : ''
    )
  }

  // @override
  _readShowdown(line, lineno) {
    if (this._readShowdownShow(line, lineno)) return true
    if (this._readShowdownMuck(line, lineno)) return true
    if (this._readShowdownFinishPlace(line, lineno)) return true
    if (this._readShowdownFinishAmount(line, lineno)) return true
    if (this._readCollect(line, lineno)) return true
    return false
  }

  //
  // Summary
  //

  // @override
  _readSummarySinglePot(line, lineno) {
    // overridden to capture cashcame currency in one place
    var idx = 1
    const match = line.match(this._summarySinglePotRx)
    if (!match) return false

    const currency = safeTrim(match[idx++])
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
    this.hand.summary.push(action)

    if (this.hand.info != null &&
        this.hand.info.currency == null &&
        currency != null) {
      this.hand.info.currency = currency
    }
    return true
  }

  // @override
  _readSummaryShowedLost(line, lineno) {
    var idx = 1
    const match = line.match(this._summaryShowedLostRx)
    if (!match) return false

    const seatno = safeParseInt(match[idx++])
    const player = safeTrim(match[idx++])
    const description = safeTrim(match[idx++])
    const card1  = safeFirstUpper(safeTrim(match[idx++]))
    const card2  = safeFirstUpper(safeTrim(match[idx++]))

    const position = this._positionFrom(player, seatno)

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

  // @override
  _readSummaryShowedWon(line, lineno) {
    var idx = 1
    const match = line.match(this._summaryShowedWonRx)
    if (!match) return false

    const seatno = safeParseInt(match[idx++])
    const player = safeTrim(match[idx++])
    const amount = safeParseFloat(match[idx++])
    const description = safeTrim(match[idx++])
    const card1  = safeFirstUpper(safeTrim(match[idx++]))
    const card2  = safeFirstUpper(safeTrim(match[idx++]))

    const position = this._positionFrom(player, seatno)

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
}

// Hand Setup
HoldemIgnitionParser.prototype._seatInfoRx          = /^Seat (\d+): (.+)\([$|€]?([^ ]+) in chips(?:, .+? bounty)?\)( .+sitting out)?$/i
HoldemIgnitionParser.prototype._postRx              = /^([^:]+): (Ante chip|Small blind|Big blind) [$|€]?([^ ]+)$/i // Big Blind : Big blind 20

// Street Indicators
HoldemIgnitionParser.prototype._preflopIndicatorRx  = /^\*\*\* HOLE CARDS \*\*\*$/i
HoldemIgnitionParser.prototype._streetIndicatorRx   = /^\*\*\* (FLOP|TURN|RIVER) \*\*\*[^[]+\[(..) (..) (..)(?: (..))?](?: \[(..)])?$/i
HoldemIgnitionParser.prototype._noseparateShowdownLine = true
HoldemIgnitionParser.prototype._summaryIndicatorRx  = /^\*\*\* SUMMARY \*\*\*$/i

// Street actions
HoldemIgnitionParser.prototype._holecardsRx         = /^([^:]+) : Card dealt to a spot \[(..) (..)]$/i
HoldemIgnitionParser.prototype._actionRx            = /^([^:]+) : (raises|All-in\(raise\)|bets|All-in\(bet\)|call|All-in|checks|folds(?:\(timeout\))?) ?[$|€]?([^ ]+)?(?: to [$|€]?([^ ]+))?(.+all-in)?$/i
HoldemIgnitionParser.prototype._collectRx           = /^([^:]+) : Hand Result(?:-Side Pot)? *[$|€]?([^ ]+)$/i
HoldemIgnitionParser.prototype._betReturnedRx       = /^([^:]+) : Return uncalled portion of bet [(]?[$|€]?([^ )]+)[)]?$/i

// Showdown (also uses _collectRx and _betReturnedRx)
HoldemIgnitionParser.prototype._showRx              = /^([^:]+) : Showdown *(?:\[(?:..)+])? *\(([^)]+)\)$/i
// 'Does not show' seems to show up only when there is no showdown
// Therefore technically it is no muck and since we reveal all cards anyways we ignore that case.
HoldemIgnitionParser.prototype._muckRx              = /^([^:]+) : (?:Does not show|Mucks) \[(..) (..)] \(([^)]+)\)$/i
// Below substitute for _finishRx
HoldemIgnitionParser.prototype._finishPlaceRx       = /^([^:]+) : Ranking (\d+)$/i
HoldemIgnitionParser.prototype._finishAmountRx      = /^([^:]+) : Prize Cash \[([$|€])([^\]]+)]$/i

// Summary
// Ignition only shows total pot here and never rake.
// The info about whether the pot was split and/or if there was a side pot is only
// encoded in the collect (Hand Result). For now we just create two collections for
// same opponent in case he collects side pot + main pot.
// We ignore the info in the summary until it is proven that we really need to provide
// it for specific tools to work properly.
HoldemIgnitionParser.prototype._summarySinglePotRx  = /^Total Pot\(([$|€])?([^ ]+)\)$/i
HoldemIgnitionParser.prototype._summarySplitPotRx   = null
HoldemIgnitionParser.prototype._summaryBoardRx      = /^Board \[(..)?( ..)?( ..)?( ..)?( ..)? *]$/i
HoldemIgnitionParser.prototype._summaryMuckedRx     = /^Seat\+([^:]+): (.+?) \[Mucked] \[(..) (..) +]$/i
HoldemIgnitionParser.prototype._summaryCollectedRx  = /^Seat\+([^:]+): (.+?) [$|€]?([^ ]+) +\[Does not show]$/i
HoldemIgnitionParser.prototype._summaryShowedWonRx  = /^Seat\+([^:]+): (.+?) [$|€]?([^ ]+) +with ([^[]+) \[(..) (..).*]$/i
HoldemIgnitionParser.prototype._summaryShowedLostRx = /^Seat\+([^:]+): (.+?) (?:lose|lost) +with ([^[]+) \[(..) (..).*]$/i
HoldemIgnitionParser.prototype._summaryFoldedRx     = /^Seat\+([^:]+): (.+?) Folded (before (?:the )?Flop|on the Flop|on the Turn|on the River)$/i

HoldemIgnitionParser.prototype._revealRx            = /^([^:]+) : Card dealt to a spot \[(..) (..)]$/i

function correctHeroPlayer(x) {
  const currentHero = this.currentHero
  const currentHeroNoMe = this.currentHeroNoMe
  if (x.player === currentHero) x.player = hero
  if (x.player === currentHeroNoMe) x.player = hero
}

function correctHeroName(hand) {
  // We don't condense this with the other player name adjustment
  // as getting a consistent name for hero first is makes things easier.
  const currentHero = hand.hero
  const ctx = {
      currentHero: currentHero
      // In summary the '[ME]' portion is dropped :(
    , currentHeroNoMe: currentHero.replace(/ +\[ME] *$/, '')
  }

  hand.seats.forEach(correctHeroPlayer, ctx)
  hand.posts.forEach(correctHeroPlayer, ctx)
  hand.preflop.forEach(correctHeroPlayer, ctx)
  hand.flop.forEach(correctHeroPlayer, ctx)
  hand.turn.forEach(correctHeroPlayer, ctx)
  hand.river.forEach(correctHeroPlayer, ctx)
  hand.showdown.forEach(correctHeroPlayer, ctx)
  hand.summary.forEach(correctHeroPlayer, ctx)
  hand.hero = hero
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

function deduceTableInfo(hand) {
  // just a wild guess .. something is seriously wrong anyways ;)
  if (hand.seats.length === 0) {
    hand.table.maxseats = 2
    hand.table.button = 1
    return
  }

  var button = 1
  const len = hand.seats.length
  for (var i = 0; i < len; i++) {
    const seat = hand.seats[i]
    if (seat.player === 'Dealer') {
      seat.isbutton = true
      button = seat.seatno
      break
    }
  }

  // best guess we can do, will be inaccurate in lots of cases
  const maxseats = (
      len > 6 ? 9
    : len > 2 ? 6
    : 2
  )
  hand.table.maxseats = maxseats
  hand.table.button = button
}

function fillShowdownHands(hand, revealed) {
  if (hand.showdown == null || hand.showdown.length === 0) return
  hand.showdown.forEach(fill)
  function fill(x) {
    if (x.type !== 'show' || x.card1 != null) return
    const cards = revealed[x.player]
    if (cards == null) return
    x.card1 = cards.card1
    x.card2 = cards.card2
  }
}

function adjustPlayerAndSeat(x) {
  const map = this.map
  const entry = map[x.player]
  if (entry == null) return

  x.player = entry.player
  x.seatno = entry.seatno
}

function improvePlayerNamesAndSeatNumbers(hand) {
  // seatnos are actually IDs assigned to a player which he keeps thru the lifetime
  // of the tourney even if moved to another table. So we'll use that as the name (except
  // for the hero).
  // Actual seatnos are tougher to deduce. In a single table SNG they correspond to the
  // player name, but in MTTs they don't.
  // Here we just need to make a decision as to who is seat 1 and calculate the others
  // from the order in which they are listed (hand.seats)
  // Best is to make hero seat 1 since we know that he will always be there throughout
  // multiple hands and therefore the seats will not change.

  // First we build the map by current player name
  const beforeHero = []
  var i = 0
  var seatno = 1
  const map = {}
  for (; i < hand.seats.length; i++) {
    const seat = hand.seats[i]
    if (seat.player === hero) {
      map[hero] = { player: hero, seatno: seatno++ }
      break
    }
    beforeHero.push(seat)
  }
  if (i === hand.seats.length) return // something is seriously wrong (couldn't find hero)

  // seats mentioned after hero
  for (i = i + 1; i < hand.seats.length; i++) {
    const seat = hand.seats[i]
    map[seat.player] = { player: prefix + seat.seatno, seatno: seatno++ }
  }
  // seats mentioned before hero
  for (var j = 0; j < beforeHero.length; j++) {
    const seat = beforeHero[j]
    map[seat.player] = { player: prefix + seat.seatno, seatno: seatno++ }
  }

  // Now we need to fix all player names throughout the hand
  const ctx = { map }
  hand.seats.forEach(adjustPlayerAndSeat, ctx)
  hand.posts.forEach(adjustPlayerAndSeat, ctx)
  hand.preflop.forEach(adjustPlayerAndSeat, ctx)
  hand.flop.forEach(adjustPlayerAndSeat, ctx)
  hand.turn.forEach(adjustPlayerAndSeat, ctx)
  hand.river.forEach(adjustPlayerAndSeat, ctx)
  hand.showdown.forEach(adjustPlayerAndSeat, ctx)
  hand.summary.forEach(adjustPlayerAndSeat, ctx)

  // Finally fix the button
  for (var k = 0; k < hand.seats.length; k++) {
    const seat = hand.seats[k]
    if (seat.isbutton) hand.table.button = seat.seatno
  }
}

exports.canParse = function canParse(lines) {
  return new HoldemIgnitionParser(lines).canParse()
}

function fixMe(x) {
  return x.replace('  [ME] :', ' [ME] :')
}

function buyInFromFileName(hand, file) {
  if (file == null) return
  const rx = /[$|€](?:([\d.,]+)-[$|€]([\d.,]+))/

  const match = file.match(rx)
  if (!match || match[1] == null || match[2] == null) return

  const donation = safeParseFloat(match[1])
  const rake = safeParseFloat(match[2])

  hand.info.donation = donation
  hand.info.rake = rake
  hand.info.buyin = donation + rake
}

exports.parse = function parse(lines, opts) {
  // Fix the inconsistency in hero indication in player names between cash cames and tourneys
  lines = lines.map(fixMe)

  const parser = new HoldemIgnitionParser(lines, opts)
  const hand = parser.parse()
  deduceAnte(hand)
  deduceBlinds(hand)
  deduceTableInfo(hand)
  fillShowdownHands(hand, parser._revealedCards)
  correctHeroName(hand)
  improvePlayerNamesAndSeatNumbers(hand)
  buyInFromFileName(hand, opts && opts.buyinFile)
  return hand
}

exports.create = function create(lines, infoOnly) {
  return new HoldemIgnitionParser(lines, infoOnly)
}

