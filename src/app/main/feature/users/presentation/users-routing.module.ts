import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: ':userId',
    component: UserPageComponent,
  },
  {
    path: '**',
    component: UsersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
