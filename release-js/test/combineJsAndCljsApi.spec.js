import {datascript, mori, helpers} from '../datascript-mori'
import {assert} from 'chai'
var djs = datascript.js // use datascript_mori.datascript.js API
var dcljs = datascript.core // cljs API for quering
var {hashMap, vector, parse, toJs, equals, isMap, hasKey, isSet, set, getIn, get} = mori
var {DB_VALUE_TYPE, DB_TYPE_REF, DB_ADD, DB_ID, TEMPIDS} = helpers

describe('Use regular JS API for create connection and add data to DB', () => {
  // schema is JS Object
  var schema = {"aka": {":db/cardinality": ":db.cardinality/many"}, "friend": {":db/valueType": ":db.type/ref"}};

  var conn = djs.create_conn(schema);
  var reports = []

  djs.listen(conn, "main", report => {
    reports.push(report)
  })

  // Tx is Js Array of Object or Array
  djs.transact(conn, [
    {
      ":db/id": -1,
      "name": "Ivan",
      "age": 18,
      "aka": ["X", "Y"]
    },
    {
      ":db/id": -2,
      "name": "Igor",
      "aka": ["Grigory", "Egor"]
    },
    [":db/add", -1, "friend", -2]
  ], "initial info about Igor and Ivan")

  it('report is regular JS object', () => {
    assert(typeof reports[0] === 'object', 'is Object')
    assert(
      reports[0].hasOwnProperty('tx_data')
      && reports[0].hasOwnProperty('tx_meta')
      && reports[0].hasOwnProperty('db_after')
      && reports[0].hasOwnProperty('db_before')
      && reports[0].hasOwnProperty('tempids'), 'reports has all keys')
    assert(reports[0].tempids["-1"] === 1, 'Ivan ID equal 1')
    assert(reports[0].tempids["-2"] === 2, 'Igor ID equal 2')
  })

  it('query mori values from conn with CLJS API', () => {
    var result = dcljs.q(parse('[:find ?n :in $ ?a :where [?e "friend" ?f] [?e "age" ?a] [?f "name" ?n]]'), djs.db(conn), 18);
    assert(isSet(result), 'result is mori set')
    assert(equals(result, set([vector("Igor")])), 'result equals #{["Igor"]}')
  })
})
