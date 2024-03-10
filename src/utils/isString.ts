export function isString(_val: unknown): _val is string {
  return typeof _val === "string";
}
