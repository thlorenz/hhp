'use strict'

var ocat = require('ocat')
ocat.opts = {
  prefix: '  spok(t, clean(res.), topic(\'\',\n',
  suffix: '))',
  indent: '   ',
  depth: 5
}

module.exports = ocat
