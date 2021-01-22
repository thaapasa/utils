/**
 * Allows you to write URLs with variables automatically encoded.
 * For example, uri`https://google.com?q=${searchTerm}` will automatically
 * url-encode the variable `searchTerm`, leaving the hard-coded parts of the URL
 * untouched.
 */
export function uri(strings: TemplateStringsArray, ...keys: any[]) {
  let res = ""
  for (let i = 0; i < strings.length; ++i) {
    res = res.concat(strings[i])
    const v = keys[i]
    if (i < strings.length - 1 && v !== undefined) {
      res = res.concat(encodeURIComponent(String(v)))
    }
  }
  return res
}
