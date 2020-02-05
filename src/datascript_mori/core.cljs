(ns datascript-mori.core
  (:require
    [datascript-mori.dscore]
    [datascript.core :as d]
    [datascript.js :as djs]
    [datascript.parser :as dp]
    [datascript.pull-parser :as dpp]
    [mori :as m]
    [mori.extra :as me]
    [cljs.reader :as reader]
    [datascript.transit :as dt]
    [datascript.lru :as dlru]))

(def ^:export schema_to_clj      djs/schema->clj)
(def ^:export entity_to_clj      djs/entity->clj)
(def ^:export entities_to_clj    djs/entities->clj)
(def ^:export tempids_to_js      djs/tempids->js)
(def ^:export tx_report_to_js    djs/tx-report->js)
(def ^:export js_to_Datom        djs/js->Datom)
(def ^:export pull_result_to_js  djs/pull-result->js)
(def ^:export keywordize  djs/keywordize)

(def ^:export parse_query dp/parse-query)
(def ^:export parse_pull dpp/parse-pull)

(def ^:const lru-cache-size 300)
(def ^:export lru dlru/lru)
(def ^:export cleanup_lru dlru/cleanup-lru)
(def ^:export query_cache (volatile! (dlru/lru lru-cache-size)))
(defn ^:export memoized_parse [q]
  (if-let [cached (get @query_cache q nil)]
    cached
    (let [qp (reader/read-string q)]
      (vswap! query_cache assoc q qp)
      qp)))
(def ^:export stringify_db dt/write-transit-str)
(def ^:export parse_db dt/read-transit-str)
(def ^:export DB_ID :db/id)
(def ^:export DB_FN_CALL :db.fn/call)
(def ^:export DB_FN_CAS :db.fn/cas)
(def ^:export DB_BEFORE :db-before)
(def ^:export DB_AFTER :db-after)
(def ^:export TX_DATA :tx-data)
(def ^:export TEMPIDS :tempids)
(def ^:export TX_META :tx-meta)
(def ^:export EAVT :eavt)
(def ^:export AEVT :aevt)
(def ^:export AVET :avet)
(def ^:export DB_PART_TX :db.part/tx)
(def ^:export DB_CURRENT_TX :db/current-tx)
(def ^:export DB_CARDINALITY :db/cardinality)
(def ^:export DB_CARDINALITY_MANY :db.cardinality/many)
(def ^:export DB_UNIQUE :db/unique)
(def ^:export DB_IDENT :db/ident)
(def ^:export DB_UNIQUE_IDENTITY :db.unique/identity)
(def ^:export DB_ADD :db/add)
(def ^:export DB_RETRACT :db/retract)
(def ^:export DB_RETRACT_ENTITY :db.fn/retractEntity)
(def ^:export DB_RETRACT_ATTRIBUTE :db.fn/retractAttribute)
(def ^:export DB_VALUE_TYPE :db/valueType)
(def ^:export DB_TYPE_REF :db.type/ref)
(def ^:export DB_IS_COMPONENT :db/isComponent )
(def ^:export FIND :find)
(def ^:export IN :in)
(def ^:export WHERE :where)
(def ^:export ADDED :added)
(def ^:export E :e)
(def ^:export A :a)
(def ^:export V :v)
