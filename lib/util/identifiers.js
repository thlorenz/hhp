'use strict'

function identifyPokerType(s) {
  if (s == null) return null
  return  (/hold'?em/i).test(s) ? 'holdem'
        : (/omaha/i).test(s)    ? 'omaha'
        : 'not yet supported'
}

function identifyLimit(s) {
  if (s == null) return null
  return  (/(no ?limit|nl)/i).test(s)  ? 'nolimit'
        : (/(pot ?limit|pl)/i).test(s) ? 'potlimit'
        : (/(fixed ?limit|fl)/i).test(s) ? 'fixedlimit'
        : 'not yet supported'
}

function identifySummaryPosition(s) {
  if (s == null) return null
  const lower = s.trim().toLowerCase()
  return (
      lower === 'button'      ? 'bu'
    : lower === 'big blind'   ? 'bb'
    : lower === 'small blind' ? 'sb'
    : 'unknown'
  )
}

function identifyPost(s) {
  if (s == null) return null
  const lower = s.toLowerCase()
  return (lower === 'ante' || lower === 'ante chip')  ? 'ante'
        : lower === 'big blind'                       ? 'bb'
        : lower === 'small blind'                     ? 'sb'
        : 'unknown'
}

function identifyActionType(s) {
  s = s.replace(/(ed|s)$/, '').toLowerCase()
  // convert 'fold(timeout)' to 'fold' (Ignition)
  if (/^fold/.test(s)) return 'fold'
  // convert  'All-in(raise)' to 'raise' (Ignition)
  if (/all-in\(raise\)/.test(s)) return 'raise'
  if (/all-in\(bet\)/.test(s)) return 'bet'
  // treat all-ins without explicit action as call (PartyPoker)
  // actual action is determined via ./determine-allin-action.js
  if (/all-in/i.test(s)) return 'call'
  return s
}

module.exports = {
    identifyPokerType
  , identifyLimit
  , identifySummaryPosition
  , identifyPost
  , identifyActionType
}
