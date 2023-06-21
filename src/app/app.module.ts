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
import { FeedComponent } from './Components/feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './Pipes/reverse.pipe';
import { AdditemComponent } from './Forms/additem/additem.component';
import { AddlocationComponent } from './Forms/addlocation/addlocation.component';
import { AddvariantComponent } from './Forms/addvariant/addvariant.component';
import { SidenavComponent } from './Components/Common/sidenav/sidenav.component';
import { LocationsComponent } from './Components/locations/locations.component';
import { ItemsComponent } from './Components/items/items.component';
import { VariantsComponent } from './Components/variants/variants.component';
import { UsersComponent } from './Components/users/users.component';
import { RegistrationComponent } from './Auth/registration/registration.component';
import { LoginComponent } from './Auth/login/login.component';

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
