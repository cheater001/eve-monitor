import { Component, OnInit, ViewChildren, ViewContainerRef, } from '@angular/core';

import { KillmailDataSource } from '../../killmail-data-source';

import { Store } from '@ngrx/store';
import * as fromKillmails from '../../../core/reducers/killmails';

@Component({
  selector: 'app-killmails-list',
  templateUrl: './killmail-list.component.html',
  styleUrls: ['./killmail-list.component.scss']
})
export class KillmailsListComponent implements OnInit {
  @ViewChildren('cdkrow', {read: ViewContainerRef}) containers;

  dataSource: KillmailDataSource | null;

  constructor(private store: Store<fromKillmails.State>) {
    this.dataSource = new KillmailDataSource(store);
  }

  ngOnInit() {
  }
}
