/**
 * Quinoa Unit Tests Helpers
 * ==========================
 */
export function multiline([string]) {
  return string
    .split('\n')
    .slice(1, -1)
    .map(s => s.trim())
    .join('\n');
}
