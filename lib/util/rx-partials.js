'use strict'

const currency = '[$€£]'
const type = `(?:Texas )?(Hold'em|Omaha)`
const limit = 'NL|PL|FL'
const card = `[0-9TJQKA]{1,2}[schd]`

module.exports = {
    currency
  , type
  , limit
  , card
}
