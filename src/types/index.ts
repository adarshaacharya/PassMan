export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export type Creds = {
  id: string;
  website: string;
  email?: string;
  username?: string;
  createdAt: string;
};
