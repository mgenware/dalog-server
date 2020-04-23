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

export function entryToColor(entry: Entry): string {
  switch (entry.level) {
    case Level.debug:
      return '#A4A4A4';
    case Level.warning:
      return '#FE9A2E';
    case Level.error:
      return '#FE2E2E';
  }
  return '';
}
