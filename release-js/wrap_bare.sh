#!/bin/sh

set -e

(cat release-js/wrapper.prefix; cat release-js/datascript-mori.bare.js; cat release-js/wrapper.suffix) > release-js/datascript-mori.js

echo "Packed release-js/datascript-mori.js"
