'use strict'

const stringUtil = require('hhp-util/string')

/* eslint-disable camelcase */
const holdem_ps = require('./lib/holdem/pokerstars')
const holdem_ig = require('./lib/holdem/ignition')
const holdem_pp = require('./lib/holdem/partypoker')
const holdem_pc = require('./lib/holdem/pacific')

function getLines(txt) {
  const trimmed = txt.split('\n').map(stringUtil.trimLine)
  while (trimmed[0] && !trimmed[0].length) trimmed.shift()
  return trimmed
}

function nonEmptyLines(input) {
  return Array.isArray(input) ? input : getLines(input).filter(stringUtil.emptyLine)
}

/**
 * Parses PokerHand Histories as output by the given online Poker Rooms.
 * Autodetects the game type and the PokerRoom.
 *
 * The parsed hands can then be further analyzed with the
 * [hha](https://github.com/thlorenz/hha) module.
 *
 * As an example [this
 * hand](https://github.com/thlorenz/hhp/blob/master/test/fixtures/holdem/pokerstars/actiononall.txt)
 * is parsed into [this object
 * representation](https://github.com/thlorenz/hha/blob/master/test/fixtures/holdem/actiononall.json).
 *
 * @name parseHand
 * @function
 * @param {string} input the textual representation of one poker hand as written to the HandHistory folder
 * @param {object=} opts various options
 * @param {boolean=} opts.infoOnly denotes that only the header line of the hand is parsed and only the info object returned
 * @param {string=} opts.buyinFile file name overrides buyin for rooms that don't include it in the history like Ignition
 * @return {object} representation of the given hand to be used as input for other tools like hha
 */
function parseHand(input, opts) {
  const lines = nonEmptyLines(input)
  if (holdem_ps.canParse(lines)) return holdem_ps.parse(lines, opts)
  if (holdem_ig.canParse(lines)) return holdem_ig.parse(lines, opts)
  if (holdem_pp.canParse(lines)) return holdem_pp.parse(lines, opts)
  if (holdem_pc.canParse(lines)) return holdem_pc.parse(lines, opts)
}

/**
 * Determines if any of the parsers can parse the passed hand(s).
 *
 * @name canParse
 * @param {String} input to parse
 * @returns {Boolean} `true` if it knows how to parse this text
 */
function canParse(input) {
  const lines = nonEmptyLines(input)
  if (lines == null || lines.length === 0) return false
  return (
       holdem_ps.canParse(lines)
    || holdem_ig.canParse(lines)
    || holdem_pp.canParse(lines)
    || holdem_pc.canParse(lines)
  )
}

/**
 * Extracts all hands from a given text file.
 *
 * @name extractHands
 * @function
 * @param {string} txt the text containing the hands
 * @return {Array.<Array>} an array of hands, each hand split into lines
 */
function extractHands(txt) {
  const lines = getLines(txt)
  const hands = []
  var hand = []

  var i = 0
  while (i < lines.length && lines[i] && !lines[i].length) i++   // ignore leading empty lines
  for (; i < lines.length; i++) {
    const line = lines[i]
    if (line.length) {
      hand.push(line)
      // last hand that's not followed by empty line and has enough lines to constitute a hand
      if (i === lines.length - 1 && hand.length > 3) hands.push(hand)
    } else {
      // hand finished and has minimum amount of lines to constitute a hand
      if (hand.length > 3) hands.push(hand)
      hand = []
      while (i < lines.length && lines[i] && !lines[i].length) i++  // find start of next line
    }
  }
  return hands
}

/**
 * Parses multiple hands from a given text.
 *
 * @name parseHands
 * @param {string} input the textual representation of the poker hands as written to the HandHistory folder
 * @param {object=} opts various options, passed along to `parseHand`
 * @return {object} parsed hands and errors encountered: `{ parsedHands: Array, errors: Array, count: Number }`
 */
function parseHands(txt, opts) {
  const hands = extractHands(txt)
  const parsedHands = []
  const errors = []
  const count = hands.length
  for (var i = 0; i < hands.length; i++) {
    try {
      const parsedHand = parseHand(hands[i], opts)
      if (parsedHand == null) {
        const handid = hands[i] != null && hands[i].info != null && hands[i].info.handid
        throw new Error(`Parsing hand at index ${i} with id ${handid} returned null`)
      }
      parsedHands.push(parsedHand)
    } catch (err) {
      errors.push({ err, hand: hands[i], index: i })
    }
  }
  return { parsedHands, errors, count }
}

module.exports = {
    parseHand
  , parseHands
  , extractHands
  , canParse
}
