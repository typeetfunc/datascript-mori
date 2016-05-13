import {helpers, mori} from '../datascript-mori'
import {assert} from 'chai'

describe('memoized_parse checks', () => {
  it('memoized_parse work as mori.parse', () => {
    const query = `[:find  ?e1 ?e2 ?e3
                  :where [?e1 :age ?a1]
                         [?e2 :age ?a2]
                         [?e3 :age ?a3]
                         [(+ ?a1 ?a2) ?a12]
                         [(= ?a12 ?a3)]]`

    assert(
      mori.equals(helpers.memoized_parse(query), mori.parse(query)),
      'memoized_parse and mori.parse return equal struct'
    );
  })
});
