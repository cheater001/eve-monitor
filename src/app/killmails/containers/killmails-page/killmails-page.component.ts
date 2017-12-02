import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromKillmails from '../../../core/reducers/killmails';
import * as fromRoot from '../../../reducers';
import * as killmailsCollection from '../../../core/actions/killmails_collection';


import { Killmail } from '../../../core/models/killmail';

@Component({
  selector: 'app-collection-page',
  templateUrl: './killmails-page.component.html',
  styleUrls: ['./killmails-page.component.scss']
})
export class KillmailsPageComponent implements OnInit {
  killmails$: Observable<Killmail[]>;

  constructor(private store: Store<fromKillmails.State>) {
    this.killmails$ = store.select(fromRoot.getKillmailCollection);
  }

  ngOnInit() {
    this.store.dispatch(new killmailsCollection.Load());
  }

}
