'use strict'

const stringUtil = require('./lib/util/string')

/* eslint-disable camelcase */
const holdem_ps = require('./lib/holdem/pokerstars')
const holdem_ig = require('./lib/holdem/ignition')

function getLines(txt) {
  const trimmed = txt.split('\n').map(stringUtil.trimLine)
  while (trimmed[0] && !trimmed[0].length) trimmed.shift()
  return trimmed
}

/**
 * Parses PokerHand Histories as output by the given online Poker Rooms.
 * Autodetects the game type and the PokerRoom.
 * So far PokerStars Holdem hands are supported.
 *
 * The parsed hands can then be further analyzed with the
 * [hha](https://github.com/thlorenz/hha) module.
 *
 * As an example [this
 * hand](https://github.com/thlorenz/hhp/blob/master/test/fixtures/holdem/pokerstars/actiononall.txt)
 * is parsed into [this object
 * representation](https://github.com/thlorenz/hha/blob/master/test/fixtures/holdem/actiononall.json).
 *
 * @name parse
 * @function
 * @param {string} input the textual representation of one poker hand as written to the HandHistory folder
 * @param {object} opts various options
 * @param {boolean} opts.infoOnly denotes that only the header line of the hand is parsed and only the info object returned
 * @return {object} representation of the given hand to be used as input for other tools like hha
 */
exports = module.exports = function parse(input, opts) {
  const lines = Array.isArray(input) ? input : getLines(input).filter(stringUtil.emptyLine)
  if (holdem_ps.canParse(lines)) return holdem_ps.parse(lines, opts)
  if (holdem_ig.canParse(lines)) return holdem_ig.parse(lines, opts)
}

/**
 * Extracts all hands from a given text file.
 *
 * @name extractHands
 * @function
 * @param {string} txt the text containing the hands
 * @return {Array.<Array>} an array of hands, each hand split into lines
 */
exports.extractHands = function extractHands(txt) {
  const lines = getLines(txt)
  const hands = []
  var hand = []

  var i = 0
  while (i < lines.length && lines[i] && !lines[i].length) i++   // ignore leading empty lines
  for (; i < lines.length; i++) {
    const line = lines[i]
    if (line.length) {
      hand.push(line)
      // last hand that's not followed by empty line
      if (i === lines.length - 1 && hand.length) hands.push(hand)
    } else {
      // hand finished
      if (hand.length) hands.push(hand)
      hand = []
      while (i < lines.length && lines[i] && !lines[i].length) i++  // find start of next line
    }
  }
  return hands
}
