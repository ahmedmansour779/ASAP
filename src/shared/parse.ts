export function parse(value: string | undefined) {
  if (!value) return {};

  return JSON.parse(value);
}
