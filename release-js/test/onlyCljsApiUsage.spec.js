import {datascript, mori, helpers} from '../datascript-mori'
import {assert} from 'chai'
var d = datascript.core // use datascript_mori.datascript.core API
var djs = datascript.js
var {hashMap, vector, parse, toJs, equals, isMap, hasKey, isSet, set, getIn, get} = mori
var {DB_VALUE_TYPE, DB_TYPE_REF, DB_ADD, DB_ID, TEMPIDS} = helpers

describe('add data to DB and query them', () => {
  // scheme must be a mori structure or use helpers.schema_to_clj({friend: {":db/valueType": ":db.type/ref"}})
  var scheme = hashMap(
    "friend", hashMap(
      DB_VALUE_TYPE, DB_TYPE_REF // or just keyword("db/valueType"), keyword("db.type/ref")
    )
  )
  var db = d.empty_db(scheme)
  // TX must be a Mori struct - vector of vector or hashMap

  var dbWithData = d.db_with(db, vector(
    vector(DB_ADD, -1, "name", "Ivan"),
    vector(DB_ADD, -1, "age", 17),
    hashMap(
      DB_ID, -2,
      "name", "Igor",
      "age", 35
    ),
    vector(DB_ADD, -1, "friend", -2)
  )) // add data to db.
  /* or use helpers.entities_to_clj( ....])
  var dbWithData = d.db_with(db,
    helpers.entities_to_clj([
      [":db/add", 1, "name", "Ivan"],
      [":db/add", 1, "age", 17],
      {
        ":db/id": 2,
        "name": "Igor",
        "age": 35
      },
      [":db/add", 1, "friend", 2]
    ])
  );
  */

  it('query all user name for users with age equals 17', () => {
    // `parse` convert EDN string to mori structures. Also see babel-plugin-datascript for compile-time converting
    var queryResponse = d.q(parse('[:find ?n :in $ ?a :where [?e "name" ?n] [?e "age" ?a]]'), dbWithData, 17)

    assert(isSet(queryResponse), 'query response is Mori Set');
    assert(
      equals(queryResponse, set([vector("Ivan")])) // #{["Ivan"]}
    , 'query response struct is true');

  });

  it('query all user name and age', () => {
    var queryResponse = d.q(parse('[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'), dbWithData)

    assert(isSet(queryResponse), 'query response is Mori Set');
    assert(
      equals(queryResponse, set([vector("Igor", 35), vector("Ivan", 17)])) // #{["Igor", 35] ["Ivan", 17]}
    , 'query response struct is true');
  });
});

describe('create conn and use transact API', () => {
  var scheme = hashMap(
    "friend", hashMap(
      DB_VALUE_TYPE, DB_TYPE_REF // or just keyword("db/valueType"), keyword("db.type/ref")
    )
  )
  var conn = d.create_conn(scheme)
  var reportsFromListen = []
  d.listen_BANG_(conn, 'main', report => {  // or djs.listen(conn, "main", callback) is fully equal definition
    reportsFromListen.push(report);
  })

  var firstReport = d.transact_BANG_(conn, vector(
    vector(DB_ADD, -1, "name", "Ivan"),
    vector(DB_ADD, -1, "age", 17)
  ))

  var secondReport = d.transact_BANG_(conn, vector(
    hashMap(
      DB_ID, -1,
      "name", "Igor",
      "age", 35
    )
  ))

  it('reports equals callback argument and is mori datastucts', () => {
    assert(equals(firstReport, reportsFromListen[0]),  'firstReport equal first callback arg of d.listen');
    assert(equals(secondReport, reportsFromListen[1]),  'secondReport equal first callback arg of d.listen');
    assert(isMap(firstReport) && isMap(secondReport), 'reports is mori struct');
  })

  var ivanId = getIn(firstReport, [TEMPIDS, -1])
  var igorId = getIn(secondReport, [TEMPIDS, -1])
  it('resolve tempid from reports', () => {
    assert(ivanId === 1, 'First Id === 1')
    assert(igorId === 2, 'Second Id === 2')
  })

  d.transact_BANG_(conn, vector(
    vector(DB_ADD, ivanId, "friend", igorId)
  ))

  it('query name friends of Igor from conn', () => {
    var result = d.q(parse('[:find ?n :in $ ?person :where [?e "name" ?n] [?e "friend" ?person]]'),
      djs.db(conn), igorId
    )
    assert(isSet(result), 'result of query is Mori Set')
    assert(equals(result, set([vector("Ivan")])), 'result is #{["Ivan"]}')
  })
  d.unlisten_BANG_(conn, "main") //or djs.unlisten(conn, "main", callback) is fully equal definition
});
