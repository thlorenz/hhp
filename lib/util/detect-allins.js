'use strict'

const {
    getAmount
  , hasAmount
} = require('./actions')

function stacksFromSeats(seats) {
  const stacks = new Map()
  for (const seat of seats) {
    stacks.set(seat.player, seat.chips)
  }
  return stacks
}

function processActions(stacks, actions) {
  if (actions == null || actions.length === 0) return
  for (const a of actions) {
    if (!hasAmount(a)) continue
    const amount = getAmount(a)

    const previousStack = stacks.get(a.player)
    const stack = previousStack - amount
    stacks.set(a.player, stack)

    if (stack <= 0) a.allin = true
  }
}

function detectAllins(hand) {
  const { seats, posts, preflop, flop, turn, river } = hand

  const stacks = stacksFromSeats(seats)
  processActions(stacks, posts)
  processActions(stacks, preflop)
  processActions(stacks, flop)
  processActions(stacks, turn)
  processActions(stacks, river)
}

module.exports = { detectAllins }
