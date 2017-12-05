import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';

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

  constructor(private store: Store<fromKillmails.State>,
              private http: HttpClient) {
    // this.killmails$ = store.select(fromRoot.getKillmailCollection);
  }

  ngOnInit() {
    // this.http.get('http://localhost:4000/killmails', {
    //   params: new HttpParams().set('skip', '10').set('limit', '11')
    // })
    //   .subscribe(response => {
    //     console.log(response);
    //   });

    // this.http.get(`${environment.api_path}/killmails`)
    //   .subscribe(response => {
    //     console.log(response);
    //   });

    // this.store.dispatch(new killmailsCollection.Load());

    const start = new Date((new Date).setHours(0, 0, 0, 0));

    this.store.dispatch(new killmailsCollection.Get({
      // skip: 0,
      // limit: 20,
      filter: {
        // killmail_id: 66392521,
        killmail_time: {
          $lt: start.toISOString(),
          // $lt: 66,
        },
        // killmail_id: {
        //   $gt: 66392521
        // },
        // killmail_id: {
        //   $in: [66392521, 66392547, 66392921]
        // },
        // solar_system_id: 30045346
      },
    }));
  }

}
