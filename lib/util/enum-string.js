'use strict'

function enumString(enu, val) {
  const keys = Object.keys(enu)
  for (const k of keys) {
    if (enu[k] === val) return k
  }
}

module.exports = enumString
