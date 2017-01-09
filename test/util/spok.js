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

exports.clean = function clean(arr) {
  return arr.map(withoutUndefined)
}

exports.topic = function topic(t, arr) {
  arr.$topic = t
  return arr
}
