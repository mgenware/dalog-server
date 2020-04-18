export enum Level {
  debug = 1,
  info,
  warning,
  error,
}

export interface Entry {
  time: string;
  level: Level;
  message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function newEntry(obj: any): Entry {
  if (!obj) {
    throw new Error('Empty input');
  }
  const entry = obj as Entry;
  if (!entry.time) {
    throw new Error('Missing "time" field');
  }
  if (!entry.level) {
    throw new Error('Missing "level" field');
  }
  if (!entry.message) {
    throw new Error('Missing "message" field');
  }
  return entry;
}
