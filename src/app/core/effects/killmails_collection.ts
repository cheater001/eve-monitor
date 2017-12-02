import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as killmailCollection from '../actions/killmails_collection';
import { Killmail } from '../models/killmail';

@Injectable()
export class KillmailsCollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('eve_monitor_app');
  });

  @Effect()
  loadKillmails$: Observable<Action> = this.actions$
    .ofType(killmailCollection.LOAD)
    .switchMap(() =>
      this.db
        .query('killmails')
        .toArray()
        .map((killmails: Killmail[]) => new killmailCollection.LoadSuccess(killmails))
        .catch(error => of(new killmailCollection.LoadFail(error)))
    );

  @Effect()
  addKillmailToCollection$: Observable<Action> = this.actions$
    .ofType(killmailCollection.ADD_KILLMAIL)
    .map((action: killmailCollection.AddKillmail) => action.payload)
    .mergeMap(killmail => {
      return this.db
        .insert('killmails', [killmail])
        .map(() => new killmailCollection.AddKillmailSuccess(killmail))
        .catch(() => of(new killmailCollection.AddKillmailFail(killmail)));
    });

  constructor(private actions$: Actions, private db: Database) {}
}
