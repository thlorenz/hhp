'use strict'

var ocat = require('ocat')
ocat.opts = {
  prefix: '  spok(t, \n',
  suffix: ')',
  indent: '   ',
  depth: 5
}

module.exports = ocat
