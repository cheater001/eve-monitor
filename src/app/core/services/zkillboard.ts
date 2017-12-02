// https://github.com/zKillboard/zKillboard/wiki/API-(Killmails)

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import io from 'socket.io-client';

import { Killmail } from '../models/killmail';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as killmailsCollection from '../../core/actions/killmails_collection';

// Placid
const REGIONS = ['10000048'];

@Injectable()
export class ZkillboardService {
  private API_PATH = 'https://zkillboard.com/api';

  private socket;

  constructor(private http: HttpClient,
              private store: Store<fromRoot.State>) {
  }

  connect() {
    this.socket = io(environment.socket_path);

    this.socket.on('killmail', killmail => {
      this.store.dispatch(new killmailsCollection.AddKillmail(killmail.killmail));
    });
  }

  searchKillmails(options): Observable<Killmail[]> {
    return this.http.get<Killmail[]>(`${this.API_PATH}/kills/regionID/${REGIONS[0]}/`)
      .map(killmails => {
        console.log(killmails.length);

        return killmails;
      });
  }

  retrieveKillmail(killmail_id: number): Observable<Killmail> {
    return this.http.get<Killmail>(`${this.API_PATH}/${killmail_id}`);
  }
}
