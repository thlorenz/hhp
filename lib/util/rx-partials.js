'use strict'

const currency = '[$€£]'

// $0.10/$0.25
const blinds = `(${currency})([^/]+)[/]${currency}([^\\s]+)`

const type = `(?:Texas )?(Hold'em|Holdem|Omaha)`
const limit = 'NL|PL|FL|No Limit|Pot Limit|Fixed Limit|Fix Limit'
const card = `[0-9TJQKA]{1,2}[schd]`
const flopCards = `(${card})[, ]+(${card})[, ]+(${card})`

module.exports = {
    currency
  , blinds
  , type
  , limit
  , card
  , flopCards
}
