'use strict'

function trimLine(line) { return line.trim() }

function emptyLine(line) { return line.length }

function safeLower(s) {
  return typeof s === 'undefined'
    ? undefined
    : s.toLowerCase()
}

function safeUpper(s) {
  return typeof s === 'undefined'
    ? undefined
    : s.toUpperCase()
}

function safeFirstUpper(s) {
  return typeof s === 'undefined' || s.length < 1
    ? s
    : s[0].toUpperCase() + s.slice(1)
}

function safeTrim(s) {
  return typeof s === 'undefined'
    ? undefined
    : s.trim()
}

function safeParseInt(s) {
  return typeof s === 'undefined'
    ? undefined
    : parseInt(s)
}

function safeParseFloat(s) {
  return (
      typeof s === 'undefined' ?  undefined
    : typeof s === 'string' ? parseFloat(s.replace(/,/g, ''))
    : s
  )
}

module.exports = {
    trimLine
  , emptyLine
  , safeLower
  , safeUpper
  , safeFirstUpper
  , safeTrim
  , safeParseInt
  , safeParseFloat
}
