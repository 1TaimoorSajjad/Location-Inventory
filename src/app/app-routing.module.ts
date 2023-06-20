import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { FeedComponent } from './Components/feed/feed.component';
import { AdditemComponent } from './Forms/additem/additem.component';
import { AddlocationComponent } from './Forms/addlocation/addlocation.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { ItemsComponent } from './Components/items/items.component';
import { VariantsComponent } from './Components/variants/variants.component';
import { AddvariantComponent } from './Forms/addvariant/addvariant.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
