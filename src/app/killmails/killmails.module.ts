import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material';

// Containers
import { KillmailsPageComponent } from './containers/killmails-page/killmails-page.component';

// Components
import { KillmailsListComponent } from './components/killmail-list/killmail-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: KillmailsPageComponent,
      },
      // {
      //   path: 'find',
      //   component: FindGangPageComponent,
      // },
      // {
      //   path: ':id',
      //   component: ViewGangPageComponent,
      // },
    ]),
  ],
  declarations: [
    KillmailsPageComponent,
    KillmailsListComponent,
  ]
})
export class KillmailsModule { }
