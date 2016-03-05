# hhp [![build status](https://secure.travis-ci.org/thlorenz/hhp.png)](http://travis-ci.org/thlorenz/hhp)

Poker HandHistory Parser

## Status

Parses PokerStars Hold'em hands.

## Installation

    npm install hhp

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="parse"><span class="type-signature"></span>parse<span class="signature">(txt)</span><span class="type-signature"> &rarr; {object}</span></h4>
</dt>
<dd>
<div class="description">
<p>Parses PokerHand Histories as output by the given online Poker Rooms.
Autodetects the game type and the PokerRoom.
So far PokerStars Holdem hands are supported.</p>
<p>The parsed hands can then be further analyzed with the
<a href="https://github.com/thlorenz/hha">hha</a> module.</p>
<p>As an example <a href="https://github.com/thlorenz/hhp/blob/master/test/fixtures/holdem/pokerstars/actiononall.txt">this
hand</a>
is parsed into <a href="https://github.com/thlorenz/hha/blob/master/test/fixtures/holdem/actiononall.json">this object
representation</a>.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>txt</code></td>
<td class="type">
<span class="param-type">string</span>
</td>
<td class="description last"><p>the textual representation of one poker hand as written to the HandHistory folder</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/hhp/blob/master/hhp.js">hhp.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/hhp/blob/master/hhp.js#L14">lineno 14</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>representation of the given hand to be used as input for other tools like hha</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">object</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
