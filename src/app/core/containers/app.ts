import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, ViewEncapsulation, } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from '../../auth/reducers';
import * as layout from '../actions/layout';
import * as Auth from '../../auth/actions/auth';

import { ZkillboardService } from '../services/zkillboard';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <bc-layout>
      <app-sidenav [open]="showSidenav$ | async">
        <app-nav-item (navigate)="closeSidenav()" routerLink="/gangs" icon="book"
                      hint="List of current gangs in the Region">
          Gangs
        </app-nav-item>
        <app-nav-item (navigate)="closeSidenav()" routerLink="/killmails" icon="book"
                      hint="View Killmails">
          Killmails
        </app-nav-item>
      </app-sidenav>
      <bc-toolbar (openMenu)="openSidenav()">
        EVE Monitor
      </bc-toolbar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </bc-layout>
  `,
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,
              private zkillboard: ZkillboardService) {

    this.zkillboard.connect();

    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new layout.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new layout.OpenSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(new Auth.Logout());
  }
}
