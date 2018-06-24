'use strict'

const ROOM = 'partypoker'
const GAME = __dirname.split('/').pop()

const test = require('tape')
// eslint-disable-next-line no-unused-vars
const { diagnoseLocalHands } = require('../../util/diagnose')

test(`${ROOM}: diagnose ${GAME}`, function(t) {
  // diagnoseLocalHands(__dirname)
  t.end()
})
