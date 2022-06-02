// Standard variation
// function api<T>(url: string): Promise<T> {
//   return fetch(url).then((response) => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json() as Promise<T>;
//   });
// }

import { ResponseType } from '@/types';

export function httpClient<T>(url: string): Promise<T> {
  return fetch(url)
    .then((response: ResponseType) => {
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json() as Promise<{ data: T }>;
    })
    .then((data) => {
      return data.data;
    });
}
