import { DBSchema } from '@ngrx/db';

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'eve_monitor_app',
  stores: {
    killmails: {
      primaryKey: 'killmail_id',
    },
  },
};
