import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { FeedComponent } from './Components/feed/feed.component';
import { AdditemComponent } from './Forms/additem/additem.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'additem',
    component: AdditemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
