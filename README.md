# datascript-mori

Wrapper for datascript interplay mori

## Overview

Datascript is briliant library. Mori is very excelent too. But for CloureScript. In Javascript World these are two separate projects, each of which uses a large part ClojureScript Runtime. This package join their codebase, and also open access for all Datascript API.


## Setup

DataScript-Mori can be used from any JS engine without additional dependencies:

```html
<script src="datascript-mori.js"></script>
```

or as a CommonJS module ([npm page](https://www.npmjs.org/package/datascript-mori)):

```
npm install datascript
```

```js
var ds = require('datascript-mori');
```

or as a RequireJS module:

```js
require(['datascript-mori'], function(ds) { ... });
```

## License

Copyright © 2016 typeetfunc

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
