import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './Components/dashboard/feed.component';
import { AdditemComponent } from './Components/ItemSection/additem/additem.component';
import { ItemsComponent } from './Components/ItemSection/items/items.component';
import { VariantsComponent } from './Components/VariantSection/variants/variants.component';
import { AddvariantComponent } from './Components/VariantSection/addvariant/addvariant.component';
import { UsersComponent } from './Auth/users/users.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegistrationComponent } from './Auth/registration/registration.component';
import { TransferComponent } from './Components/transfer/transfer.component';
import { AddlocationComponent } from './Components/LocationSection/addlocation/addlocation.component';
import { LocationsComponent } from './Components/LocationSection/locations/locations.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
  },
  { path: 'items/edit/:id', component: AdditemComponent },
  { path: 'locations/edit/:id', component: AddlocationComponent },
  { path: 'variants/edit/:id', component: AddvariantComponent },
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
