'use strict'

const fs = require('fs')
const path = require('path')
const { parseHands } = require('../../')

function removeNonDefineds(hand) {
  for (const v of Object.values(hand)) {
    if (!Array.isArray(v)) continue
    v.forEach(x => {
      for (const [ k, v ] of Object.entries(x)) {
        if (v == null) delete x[k]
      }
    })
  }
  return hand
}

function processHand(root, part) {
  const handPath = path.join(root, 'hands.txt')
  const handsTxt = fs.readFileSync(handPath, 'utf8')
  const { parsedHands, errors } = parseHands(handsTxt)

  const errored = errors.find(x => x.index === part)
  if (errored != null) return errored

  if (parsedHands.length < part) return null
  return removeNonDefineds(parsedHands[part])
}

module.exports = processHand
