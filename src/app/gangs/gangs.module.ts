import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaterialModule } from '../material';

import { ComponentsModule } from './components';

import { FindGangPageComponent } from './containers/find-gang-page/find-gang-page.component';
import { ViewGangPageComponent } from './containers/view-gang-page/view-gang-page.component';
import { CollectionPageComponent } from './containers/collection-page/collection-page.component';


// import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CollectionPageComponent,
      },
      {
        path: 'find',
        component: FindGangPageComponent,
      },
      {
        path: ':id',
        component: ViewGangPageComponent,
      },
    ]),
  ],
  declarations: [
    CollectionPageComponent,
    FindGangPageComponent,
    ViewGangPageComponent,
  ]
})
export class GangsModule { }
