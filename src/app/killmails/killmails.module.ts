import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

import { MaterialModule } from '../material';

// Containers
import { KillmailsPageComponent } from './containers/killmails-page/killmails-page.component';

// Components
import { KillmailsListComponent } from './components/killmail-list/killmail-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CdkTableModule,

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
export class KillmailsModule {
}
