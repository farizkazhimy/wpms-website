import id from './id.json';

export const dict = id;

/** Isi placeholder {nama} di string terjemahan. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
