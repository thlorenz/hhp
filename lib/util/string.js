'use strict'

const ntz = require('ntz')

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
    : typeof s === 'string' ? parseFloat(s.replace(/[, ]/g, ''))
    : s
  )
}

function dateInfoFromString(s) {
  const d = new Date(ntz(s))
  return {
      year     : d.getUTCFullYear()
    , month    : d.getUTCMonth() + 1
    , day      : d.getUTCDate()
    , hour     : d.getUTCHours()
    , min      : d.getUTCMinutes()
    , sec      : d.getUTCSeconds()
    , timezone : 'GMT'
  }
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
  , dateInfoFromString
}
