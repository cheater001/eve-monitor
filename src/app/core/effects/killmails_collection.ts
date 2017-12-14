import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/pluck';
import { Injectable } from '@angular/core';
import { Action, Store, } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { HttpClient, } from '@angular/common/http';

import * as killmailCollection from '../actions/killmails_collection';
import { Killmail } from '../models/killmail';
import * as fromRoot from '../../reducers';
import * as fromCollection from '../reducers/killmails_collection';

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
  @Effect({dispatch: false})
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
  getKillmails$: Observable<Action> = this.actions$
    .ofType(killmailCollection.GET)
    .pluck('payload')
    .switchMap((payload: any) => {
      const filters = payload.filters;
      const limit   = payload.limit || 10;
      const skip    = payload.skip;
      const fields  = payload.fields;

      return this.http.post<Killmail[]>(`${environment.api_path}/killmails-ids`, {
        filters, limit, skip
      })
        .map((killmails: Killmail[]) => killmails.map(killmail => killmail._id))
        .switchMap((ids: number[]) => {
          const sortedIds = [...ids];

          return this.db.query('killmails', cursor => {
            const index  = ids.indexOf(cursor._id);
            const result = index > -1;

            if (result) {
              ids.splice(index, 1);
            }

            return result;
          })
            .toArray()
            .switchMap((storedKillmails: Killmail[]) => {
              const killmails$ = ids.length
                ? this.http.post<Killmail[]>(`${environment.api_path}/killmails`, {
                  filters: {
                    _id: {$in: ids}
                  },
                  limit, skip, fields,
                })
                : of([]);

              return killmails$
                .map((fetchedKillmails: Killmail[]) => {
                  return new killmailCollection.GetSuccess({
                    selected: [...storedKillmails, ...fetchedKillmails],
                    fetched: fetchedKillmails,
                    ids: sortedIds,
                  });
                })
                .catch((err) => of(new killmailCollection.GetFail(err)));
            });
        });
    });

  @Effect({dispatch: false})
  getKillmailsSuccess$ = this.actions$
    .ofType(killmailCollection.GET_SUCCESS)
    .map((action: killmailCollection.GetSuccess) => {
      return action.payload.fetched;
    })
    .do(killmails => {
      this.db
        .insert('killmails', killmails)
        .reduce((acc, curr) => [...acc, curr], [])
        .catch((err) => of(new killmailCollection.GetFail(err)))
        .subscribe(() => {
        });
    });

  constructor(private actions$: Actions,
              private db: Database,
              private http: HttpClient,
              private store: Store<fromCollection.State>) {
  }
}
