function withoutUndefined(o) {
  function isDefined(k) {
    return typeof o[k] !== 'undefined'
      && (k !== 'allin' || o[k])
  }

  function add(acc, k) {
    acc[k] = o[k]
    return acc
  }

  return Object.keys(o)
    .filter(isDefined)
    .reduce(add, {})
}

const clean = exports.clean = function clean(arr) {
  return arr.map(withoutUndefined)
}

exports.cleanAll = function cleanAll(hand) {
  Object.keys(hand).forEach(cleanValue)
  function cleanValue(k) {
    const val = hand[k]
    if (!Array.isArray(val)) return
    hand[k] = clean(val)
  }

  function cleanCard(k) {
    if (hand.board[k] == null) delete hand.board[k]
  }
  if (hand.board != null) {
    Object.keys(hand.board).forEach(cleanCard)
  }
  return hand
}

exports.topic = function topic(t, arr) {
  arr.$topic = t
  return arr
}
