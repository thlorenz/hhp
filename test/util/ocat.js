'use strict'

var ocat = require('ocat')
ocat.opts = {
  prefix: '  spok(t, clean(res.), topic(\'\',\n',
  suffix: '))',
  indent: '   '
}

module.exports = ocat
