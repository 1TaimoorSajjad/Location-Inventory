import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './Components/dashboard/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './Pipes/reverse.pipe';
import { AddvariantComponent } from './Components/VariantSection/addvariant/addvariant.component';
import { SidenavComponent } from './Components/Common/sidenav/sidenav.component';
import { ItemsComponent } from './Components/ItemSection/items/items.component';
import { VariantsComponent } from './Components/VariantSection/variants/variants.component';
import { UsersComponent } from './Auth/users/users.component';
import { RegistrationComponent } from './Auth/registration/registration.component';
import { LoginComponent } from './Auth/login/login.component';
import { TransferComponent } from './Components/transfer/transfer.component';
import { AdditemComponent } from './Components/ItemSection/additem/additem.component';
import { AddlocationComponent } from './Components/LocationSection/addlocation/addlocation.component';
import { LocationsComponent } from './Components/LocationSection/locations/locations.component';
import { RegisteredusersComponent } from './Auth/registeredusers/registeredusers.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    ReversePipe,
    AdditemComponent,
    AddlocationComponent,
    AddvariantComponent,
    SidenavComponent,
    LocationsComponent,
    ItemsComponent,
    VariantsComponent,
    UsersComponent,
    RegistrationComponent,
    LoginComponent,
    TransferComponent,
    RegisteredusersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirestoreModule,
    FormsModule,
    ReactiveFormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
