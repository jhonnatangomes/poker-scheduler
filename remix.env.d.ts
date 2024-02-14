/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node" />

import { Client } from '@libsql/client';

declare module '@remix-run/node' {
  export interface AppLoadContext {
    db: Client;
  }
}
