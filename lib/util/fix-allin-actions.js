'use strict'

const {
    getAmount
  , hasAmount
} = require('./actions')

function fixAllinActions(actions) {
  var lastAmount = 0
  for (const a of actions) {
    const withAmount = hasAmount(a)
    const amount = withAmount ? getAmount(a) : 0
    if (a.allin) {
      if (lastAmount === 0) {
        a.type = 'bet'
        lastAmount = getAmount(a)
      } else if (amount > lastAmount) {
        a.type = 'raise'
        a.raiseTo = a.amount
        a.amount = null
      } else {
        a.action = 'call'
      }
    }
    if (withAmount) lastAmount = amount
  }
}

function fixAllinActionsForAll(hand, allins) {
  const { preflop, flop, turn, river } = hand
  if (allins.preflop) fixAllinActions(preflop)
  if (allins.flop) fixAllinActions(flop)
  if (allins.turn) fixAllinActions(turn)
  if (allins.river) fixAllinActions(river)
}

module.exports = {
    fixAllinActions
  , fixAllinActionsForAll
}
