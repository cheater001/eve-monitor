import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/gangs',
    pathMatch: 'full',
  },
  {
    path: 'killmails',
    loadChildren: './killmails/killmails.module#KillmailsModule',
  },
  {
    path: 'gangs',
    loadChildren: './gangs/gangs.module#GangsModule',
  },
  // {
  //   path: 'books',
  //   loadChildren: './books/books.module#BooksModule',
  //   canActivate: [AuthGuard],
  // },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
