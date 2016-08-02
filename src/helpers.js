/**
 * Quinoa Helpers
 * ===============
 *
 * Miscellaneous helper functions.
 */

/**
 * Function returning all the matches of a regular expression over the given
 * string.
 *
 * @param  {RegExp} pattern - The regular expression to apply.
 * @param  {string} string  - The string to match.
 * @return {array}          - An array of matches.
 */
export function findall(pattern, string) {
  const matches = [];

  if (!pattern.global) {
    const result = pattern.exec(string);

    if (result)
      matches.push(result);

    return matches;
  }

  let match;
  while (match = pattern.exec(string))
    matches.push(match);

  // Resetting state of the Regex for safety
  pattern.lastIndex = 0;

  return matches;
}

/**
 * Function used to resolve reducers in constant time.
 *
 * @param  {mixed}    defaultState - Default state.
 * @param  {object}   map          - Functions mapped to action types.
 * @return {function}              - The reducer.
 */
export function resolver(defaultState, map) {
  return function(state = defaultState, action) {
    const lookup = map[action.type];

    if (typeof lookup === 'function')
      return lookup(state, action);

    return state;
  };
}
