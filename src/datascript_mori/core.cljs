(ns datascript-mori.core
  (:require
    [datascript.core :as d]
    [datascript.js :as djs]
    [mori :as m]
    [mori.extra :as me]))

(def ^:export reader cljs.reader/read-string)

(def ^:export str_to_keyword keyword)
