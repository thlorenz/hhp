'use strict'

function priceFreeroll(line) {
  // Converting the word 'Freeroll' into a reflective tournament buyin
  // of #0
  // XxX: somewhat hacky but a quick fix for freeroll edge case
  // Proper solution is much more involved since not only is the regex
  // different, but also all indexes change as there is no currency
  // or donation in a freeeroll
  return line.replace(/Freeroll/i, '$0.00+$0.00 USD')
}

exports.priceFreeroll = priceFreeroll
