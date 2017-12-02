import { Component, Input, OnInit, } from '@angular/core';

import { Killmail, } from '../../../core/models/killmail';

@Component({
  selector: 'app-killmails-list',
  templateUrl: './killmail-list.component.html',
  styleUrls: ['./killmail-list.component.scss']
})
export class KillmailsListComponent implements OnInit {
  @Input() killmails: Killmail[];

  constructor() { }

  ngOnInit() {
  }

}
