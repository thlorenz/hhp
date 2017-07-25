'use strict'

var cleanAll = require('./spok').cleanAll

var ocat = require('ocat')
ocat.opts = {
  prefix: '  spok(t, res,\n',
  suffix: ')',
  indent: '   ',
  depth: 5
}

const log_ = ocat.log

ocat.log = function log(res) {
  log_.call(ocat, cleanAll(res))
}

module.exports = ocat
