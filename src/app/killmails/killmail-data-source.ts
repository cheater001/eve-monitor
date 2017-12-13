import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { Killmail } from '../core/models/killmail';
import * as fromKillmails from '../core/reducers/killmails';
import * as fromRoot from '../reducers';

export class KillmailDataSource extends DataSource<any> {
  constructor(private store: Store<fromKillmails.State>) {
    super();
  }

  connect(): Observable<Killmail[]> {
    return this.store.select(fromRoot.getKillmailCollection);
  }

  disconnect() {}
}
