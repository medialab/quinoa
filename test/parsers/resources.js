/**
 * Quinoa Resources Parser Unit Tests
 * ===================================
 */
import assert from 'assert';
import parser from '../../src/parsers/resources';

describe('parsers/resources', function() {

  it('should parse resources correctly.', function() {
    const tests = [
      [
        '[[this is nothing]]',
        []
      ],
      [
        '[[image: 234, {}]]',
        [{category: 'image', identifier: '234', data: {}}]
      ],
      [
        '[[image: 43]]',
        [{category: 'image', identifier: '43', data: {}}]
      ],
      [
        '[[image: 56, {"information": "hello"}]]',
        [{category: 'image', identifier: '56', data: {information: 'hello'}}]
      ],
      [
        'This is some text.\n This is a resource: [[image: 45, {"information": "hello"}]] and this is another: [[graph: 34]]',
        [
          {category: 'image', identifier: '45', data: {information: 'hello'}},
          {category: 'graph', identifier: '34', data: {}}
        ]
      ]
    ];

    tests.forEach(function([string, resources]) {
      assert.deepEqual(parser(string), resources);
    });
  });
});
