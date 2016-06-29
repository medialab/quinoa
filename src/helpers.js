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

  let match;
  while (match = pattern.exec(string))
    matches.push(match);

  // Resetting state of the Regex for safety
  pattern.lastIndex = 0;

  return matches;
}
