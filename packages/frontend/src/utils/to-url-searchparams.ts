export function toURLSearchParams(source: Record<string, unknown>){

  return new URLSearchParams(Object.entries(source).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: String(value)
  }), {}));

}
