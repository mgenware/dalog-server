import * as defs from './defs';

export async function fetchJSON<T>(path: string): Promise<T> {
  const resp = await fetch(`http://localhost:${defs.port}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return (await resp.json()) as T;
}
