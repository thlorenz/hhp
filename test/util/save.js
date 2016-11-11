'use strict'

const fs = require('fs')
const path = require('path')

module.exports = function save(name, obj) {
  const file = path.join(__dirname, '..', '..', '..', 'hha', 'test', 'fixtures', name + '.json')
  fs.writeFileSync(file, JSON.stringify(obj, null, 2), 'utf8')
  console.log('saved to ' + file)
}
