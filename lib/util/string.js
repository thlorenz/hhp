'use strict'

exports.trimLine = function trimLine (line) { return line.trim() }
exports.emptyLine = function emptyLine (line) { return line.length }
exports.safeLower = function safeLower (s) {
  return typeof s === 'undefined'
    ? undefined
    : s.toLowerCase()
}
exports.safeUpper = function safeUpper (s) {
  return typeof s === 'undefined'
    ? undefined
    : s.toUpperCase()
}
exports.safeFirstUpper = function safeFirstUpper (s) {
  return typeof s === 'undefined' || s.length < 1
    ? s
    : s[0].toUpperCase() + s.slice(1)
}
exports.safeTrim = function safeTrim (s) {
  return typeof s === 'undefined'
    ? undefined
    : s.trim()
}
exports.safeParseInt = function safeParseInt (s) {
  return typeof s === 'undefined'
    ? undefined
    : parseInt(s)
}
exports.safeParseFloat = function safeParseFloat (s) {
  return typeof s === 'undefined'
    ? undefined
    : parseFloat(s)
}
