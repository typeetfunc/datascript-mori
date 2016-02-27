(ns datascript-mori.core
  (:require
    [datascript.core :as d]
    [datascript.js :as djs]
    [mori :as m]
    [mori.extra :as me]))

(def ^:export schema_to_clj      djs/schema->clj)
(def ^:export entity_to_clj      djs/entity->clj)
(def ^:export entities_to_clj    djs/entities->clj)
(def ^:export tempids_to_js      djs/tempids->js)
(def ^:export tx_report_to_js    djs/tx-report->js)
(def ^:export js_to_Datom        djs/js->Datom)
(def ^:export pull_result_to_js  djs/pull-result->js)
(def ^:export keywordize  djs/keywordize)
