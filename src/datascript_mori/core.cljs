(ns datascript-mori.core
  (:require
    [datascript.core :as d]
    [datascript.js :as djs]
    [mori :as m]))

(defn ^:export reader [query]
  (cljs.reader/read-string query))

(defn ^:export str_to_keyword [s]
  (keyword s))
