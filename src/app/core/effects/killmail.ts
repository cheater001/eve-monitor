import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

import { Injectable, } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { ZkillboardService } from '../services/zkillboard';
import * as killmails from '../actions/killmails_collection';
import { Killmail } from '../models/killmail';

@Injectable()
export class KillmailsEffects {
  // @Effect()
  // search$: Observable<Action> = this.actions$
  //   .ofType<book.Search>(book.SEARCH)
  //   .debounceTime(this.debounce || 300, this.scheduler || async)
  //   .map(action => action.payload)
  //   .switchMap(query => {
  //     if (query === '') {
  //       return empty();
  //     }
  //
  //     const nextSearch$ = this.actions$.ofType(book.SEARCH).skip(1);
  //
  //     return this.googleBooks
  //       .searchBooks(query)
  //       .takeUntil(nextSearch$)
  //       .map((books: Book[]) => new book.SearchComplete(books))
  //       .catch(err => of(new book.SearchError(err)));
  //   });

  constructor(
    private actions$: Actions,
    private zkillboard: ZkillboardService,
  ) {}
}
