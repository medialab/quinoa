/**
 * Quinoa Resources Parser
 * ========================
 *
 * Parser taking markdown text as input and returning a list of found external
 * resources.
 */
import {findall} from '../helpers';

const RESOURCES = /\[\[([^:]+):\s+([^,]+)(?:,\s+([^\]]*)\]\]|\]\])/g;

export default function(string) {
  return findall(RESOURCES, string).map(match => {
    return {
      category: match[1],
      identifier: match[2],
      data: match[3] ? JSON.parse(match[3]) : {}
    };
  });
}
