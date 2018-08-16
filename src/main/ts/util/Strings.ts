export function upperCaseFirst(x: string): string {
  if (typeof x !== "string" || x.length < 1) {
    return ""
  }
  return x[0].toUpperCase() + x.substr(1)
}

export function snakeCaseToCamelCase(x: string): string {
  if (typeof x !== "string") {
    return ""
  }
  return x
    .split("_")
    .map((part, id) => (id === 0 ? part : upperCaseFirst(part)))
    .join("")
}

export function snakeCaseObjectToCamelCase<T extends {}>(a: any): T {
  const res: any = {}
  Object.keys(a).forEach((k: any) => (res[snakeCaseToCamelCase(k)] = a[k]))
  return res as T
}

