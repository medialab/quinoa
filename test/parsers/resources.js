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
        [{category: 'image', id: '234', data: {}}]
      ],
      [
        '[[image: 43]]',
        [{category: 'image', id: '43', data: {}}]
      ],
      [
        '[[image: 56, {"information": "hello"}]]',
        [{category: 'image', id: '56', data: {information: 'hello'}}]
      ],
      [
        'This is some text.\n This is a resource: [[image: 45, {"information": "hello"}]] and this is another: [[graph: 34]]',
        [
          {category: 'image', id: '45', data: {information: 'hello'}},
          {category: 'graph', id: '34', data: {}}
        ]
      ]
    ];

    tests.forEach(function([string, resources]) {
      assert.deepEqual(parser(string), resources);
    });
  });
});
