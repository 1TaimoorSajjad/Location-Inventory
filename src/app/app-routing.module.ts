import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './Components/feed/feed.component';
import { AdditemComponent } from './Forms/additem/additem.component';
import { AddlocationComponent } from './Forms/addlocation/addlocation.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { ItemsComponent } from './Components/items/items.component';
import { VariantsComponent } from './Components/variants/variants.component';
import { AddvariantComponent } from './Forms/addvariant/addvariant.component';
import { UsersComponent } from './Components/users/users.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegistrationComponent } from './Auth/registration/registration.component';
import { TransferComponent } from './Components/transfer/transfer.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: FeedComponent,
  },
  {
    path: 'additem',
    component: AdditemComponent,
  },
  {
    path: 'addlocation',
    component: AddlocationComponent,
  },
  {
    path: 'location/edit/:id',
    component: AddlocationComponent,
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'items',
    component: ItemsComponent,
  },
  {
    path: 'variants',
    component: VariantsComponent,
  },
  {
    path: 'addvariant',
    component: AddvariantComponent,
  },
  {
    path: 'user',
    component: UsersComponent,
  },
  {
    path: 'transfer',
    component: TransferComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
