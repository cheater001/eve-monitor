import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';

import { FormControl, FormGroup, } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromKillmails from '../../../core/reducers/killmails';
import * as fromRoot from '../../../reducers';
import * as killmailsCollection from '../../../core/actions/killmails_collection';

import { Killmail } from '../../../core/models/killmail';


import {} from '../../killmail-data-source';


@Component({
  selector: 'app-collection-page',
  templateUrl: './killmails-page.component.html',
  styleUrls: ['./killmails-page.component.scss']
})
export class KillmailsPageComponent implements OnInit {
  // killmails$: Observable<Killmail[]>;
  killmailsLoading$: Observable<boolean>;
  fromDate;
  toDate;

  form: FormGroup;

  constructor(private store: Store<fromKillmails.State>,
              private http: HttpClient) {
    // this.killmails$ = store.select(fromRoot.getKillmailCollection);
    this.killmailsLoading$ = store.select(fromRoot.getCollectionLoading);
  }

  ngOnInit() {
    this.form = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
    });


    // this.http.get('http://localhost:4000/killmails', {
    //   params: new HttpParams().set('skip', '10').set('limit', '11')
    // })
    //   .subscribe(response => {
    //     console.log(response);
    //   });

    // this.store.dispatch(new killmailsCollection.Load());

    // const start = new Date((new Date).setHours(0, 0, 0, 0));
    const start = new Date();

    // this.store.dispatch(new killmailsCollection.Get({
    // skip: 4,
    // limit: 5,
    // fields: 'killmail_time',
    // filters: {
    // killmail_id: {
    //   $lt: 66401360
    // },
    // killmail_time: {
    //   $lt: start.toISOString(),
    // },
    // killmail_id: {
    //   $gt: 66392521
    // },
    // killmail_id: {
    //   $in: [66392521, 66392547, 66392921]
    // },
    // solar_system_id: 30045346
    // },
    // }));

    this.store.dispatch(new killmailsCollection.Get({
      limit: 10,
      filters: {
        // 'attackers.character_id': 1192491827,
      }
    }));
  }

  submit() {
    const value         = this.form.value;
    const killmail_time = {};

    if (value.fromDate) {
      killmail_time['$gt'] = value.fromDate.toISOString();
    }

    if (value.toDate) {
      killmail_time['$lt'] = value.toDate.toISOString();
    }

    this.store.dispatch(new killmailsCollection.Get({
      limit: 50,
      filters: {
        killmail_time,
      },
    }));
  }
}
