# datascript-mori

Wrapper for datascript interplay with mori

## Why?

Datascript is greatful project - [an immutable in-memory database and Datalog query engine in Clojure and ClojureScript](https://github.com/tonsky/datascript). It is very useful for managing very big and complex application state in frontend application.

Datascript is written in ClojureScript. Also Datascript designed for using from ClojureScript, but it has [JS dedicated API](https://github.com/tonsky/datascript/wiki/Javascript-API#js-public-api). However usage Datascript from JS has problems:
 - functions for quering - [q](https://github.com/tonsky/datascript/blob/master/src/datascript/js.cljs#L69), [pull](https://github.com/tonsky/datascript/blob/master/src/datascript/js.cljs#L74), [pull_many](https://github.com/tonsky/datascript/blob/master/src/datascript/js.cljs#L80), [index_range](https://github.com/tonsky/datascript/blob/master/src/datascript/js.cljs#L145) etc. - convert result of query into JS data structures(Array, Object). JS data structures is mutable data strutures with very bad API. Also when you use mutable data structures in React app, you can not use ["pure render" optimisations](https://facebook.github.io/react/docs/pure-render-mixin.html). [See more cases for immutability](https://facebook.github.io/react/docs/advanced-performance.html#immutable-js-to-the-rescue). `datascript-mori` open access for all Datascript API and some helpers.
 - Datascript includes ClojureScript Runtime. It is very big amount of code includes extensive
 set of immutable data structures. However it is useless without [mori](https://github.com/swannodette/mori). But when you're importing mori and Datascript, the size of your application will grow twice(because mori and Datascript are two separate packages for Javascript). `datascript-mori` join their codebase.

## Setup

 - (**Recommended**) Install from [NPM](https://www.npmjs.org/package/datascript-mori)
 ```
 npm install datascript-mori
 ```
 - Download [latest release](https://github.com/typeetfunc/datascript-mori/releases/latest)

## Usage

 - (**Recommended**) Using EcmaScript 2015 modules:

 ```js
import {
     datascript, // This is contain datascript object
     mori,       // This is contain mori object
     helpers     // This is contain helpers for conversions from CLJS
} from 'datascript-mori';

const {
     core, // This is pure DataScript CLJS API without any conversions
     js    // This is DataScript JS API
} = datascript;
 ```

 - Using CommonJS modules:

 ```js
var datascript_mori = require('datascript-mori');

var mori = datascript_mori.mori;
var datascript_js = datascript_mori.datascript.js;
var datascript_core = datascript_mori.datascript.core;
var helpers = datascript_mori.helpers;
 ```

 - (**Not recommended**) Using tag `<script>` in Browser:

```html
<script src="datascript-mori.js">
   var mori = datascript_mori.mori;
   var datascript_js = datascript_mori.datascript.js;
   var datascript_core = datascript_mori.datascript.core;
   var helpers = datascript_mori.helpers;
</script>
```

## API Overview

- `datascript_mori.datascript.core` - is a [CLJS DataScript API](https://github.com/tonsky/datascript/wiki/API-overview). All functions accept CLJS data structures and return back CLJS data structures(i.e mori values). All names of these functions converts("munging") with symbols allowed in JS for function name. [See mapping list](https://github.com/typeetfunc/datascript-mori/wiki/Mapping-names-of-functions).
- `datascript_mori.datascript.js` - is a [JS DataScript API](https://github.com/tonsky/datascript/wiki/Javascript-API)
- `mori` - is a [mori object](http://swannodette.github.io/mori/)
- `helpers` - is a helpers [functions](https://github.com/typeetfunc/datascript-mori/blob/master/src/datascript_mori/core.cljs#L8-L47) for convert JS data structures to CLJS data structures and CLJS data structures to JS data structures. Also `helpers` contains functions for parsing Datalog queries -  [parse_query](https://github.com/tonsky/datascript/blob/master/src/datascript/parser.cljc#L732) and [parse_pull](https://github.com/tonsky/datascript/blob/master/src/datascript/pull_parser.cljc#L217).

## Examples

 - [combineJsAndCljsApi.spec.js](https://github.com/typeetfunc/datascript-mori/blob/master/release-js/test/combineJsAndCljsApi.spec.js) - this example demonstrated how to combine JS API with CLJS call [d.q() to get mori values](https://github.com/typeetfunc/datascript-mori/blob/master/release-js/test/combineJsAndCljsApi.spec.js#L48)
 -  [onlyCljsApiUsage.spec.js](https://github.com/typeetfunc/datascript-mori/blob/master/release-js/test/onlyCljsApiUsage.spec.js) - this example demonstrated how to use only CLJS API without any conversion(only mori.parse for parsing EDN string)

## Roadmap

 - Investigate [Posh](https://github.com/mpdairy/posh) and include to `datascript-mori` support `tx-pattern`
