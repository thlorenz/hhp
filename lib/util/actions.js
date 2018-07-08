'use strict'

function getAmount(a) {
  if (a.type === 'raise') return a.raiseTo
  return a.amount
}

function hasAmount(a) {
  return a.type !== 'fold' && a.type !== 'check'
}

module.exports = {
    getAmount
  , hasAmount
}
