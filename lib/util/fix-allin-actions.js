'use strict'

function getAmount(a) {
  if (a.type === 'fold' || a.type === 'check') return 0
  if (a.type === 'raise') return a.raiseTo
  return a.amount
}

function fixAllinActions(actions) {
  var lastAmount = 0
  for (const a of actions) {
    const amount = getAmount(a)
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
    lastAmount = amount
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
