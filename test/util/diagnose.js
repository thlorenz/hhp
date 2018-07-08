'use strict'

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { parseHands } = require('../../')

function diagnose(handsTxt) {
  const { parsedHands, errors } = parseHands(handsTxt)
  if (errors.length > 0) console.error(errors)
  const ignoreds = parsedHands
    .filter(x => x.ignored.length > 0)
    .map(x => {
      const ignored = x.ignored.map(x => `  ${x.lineno}: ${x.raw}`).join('\n')
      return `${x.info.handid}:\n${ignored}`
    })
  if (ignoreds.length === 0) return
  console.log(ignoreds.join('\n'))
}

function diagnoseLocalHands(root) {
  const handPath = path.join(root, 'hands.txt')
  const handsTxt = fs.readFileSync(handPath, 'utf8')
  diagnose(handsTxt)
}

function diagnoseRecursively(root) {
  const hands = glob.sync('{**/*.txt,*.txt}', { cwd: root })
  for (const hand of hands) {
    const handsTxt = fs.readFileSync(path.join(root, hand), 'utf8')
    console.log(`\n++++++++ ${hand} ++++++++\n`)
    diagnose(handsTxt)
  }
}

module.exports = {
    diagnose
  , diagnoseLocalHands
  , diagnoseRecursively
}
