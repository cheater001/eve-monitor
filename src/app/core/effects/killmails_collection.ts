import { environment } from '../../../environments/environment';

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

import { HttpClient, HttpParams, } from '@angular/common/http';

import { ZkillboardService } from '../services/zkillboard';

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
    .map((action: killmailCollection.Get) => action.payload)
    .switchMap(params => {
      const predicates = [];
      const filter     = params.filter;
      const values     = (k, value) => ({k, v: JSON.parse(JSON.stringify(value))});
      const predicate  = (key, value, handler) => {
        return (({k, v}) => {
          return cursor => handler(cursor, k, v);
        })(values(key, value));
      };

      if (filter) {
        for (const key in filter) {
          const value = filter[key];

          // TODO Implement field.field accessor;
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            predicates.push(predicate(key, value, (cursor, k, v) => {
              return cursor[k] === v;
            }));
          } else if (typeof value === 'object') {
            for (const valueKey in value) {
              const valuePredicates = [];

              if (valueKey === '$in') {
                valuePredicates.push((cursor, k, v) => {
                  return v.indexOf(cursor[k]) > -1;
                });
              } else if (valueKey === '$gt') {
                valuePredicates.push((cursor, k, v) => {
                  return cursor[k] > v;
                });
              } else if (valueKey === '$lt') {
                valuePredicates.push((cursor, k, v) => {
                  return cursor[k] < v;
                });
              }

              predicates.push(predicate(key, value[valueKey], (cursor, k, v) => {
                for (let i = 0; i < valuePredicates.length; i++) {
                  if (!valuePredicates[i](cursor, k, v)) {
                    return false;
                  }
                }

                return true;
              }));
            }
          }
        }
      }

      return this.db
        .query('killmails', (cursor) => {
          for (let i = 0; i < predicates.length; i++) {
            if (!predicates[i](cursor)) {
              return false;
            }
          }

          return true;
        })
        .toArray()
        .map((killmails: Killmail[]) => killmails.map(killmail => killmail.killmail_id))
        .switchMap((killmailIds: number[]) => {
          return this.http.get<Killmail[]>(`${environment.api_path}/killmails`, {
            params: new HttpParams()
              .set('cached', JSON.stringify(killmailIds))
              .set('filters', JSON.stringify(filter))
          })
            .switchMap((killmails: Killmail[]) => {
              return this.db
                .insert('killmails', killmails)
                .map(() => new killmailCollection.GetSuccess(killmails))
                .catch((err) => of(new killmailCollection.GetFail(err)));
            });
        })
        .catch(error => of(new killmailCollection.GetFail(error)));
    });

  @Effect()
  addKillmailToCollection$: Observable<Action> = this.actions$
    .ofType(killmailCollection.ADD_KILLMAILS)
    .map((action: killmailCollection.AddKillmails) => action.payload)
    .mergeMap(killmail => {
      return this.db
        .insert('killmails', [killmail])
        .map(() => new killmailCollection.AddKillmailsSuccess(killmail))
        .catch(() => of(new killmailCollection.AddKillmailsFail(killmail)));
    });

  constructor(private actions$: Actions,
              private db: Database,
              private zkillboard: ZkillboardService,
              private http: HttpClient) {
  }
}
