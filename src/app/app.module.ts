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
import { LoginComponent } from './Components/login/login.component';
import { FeedComponent } from './Components/feed/feed.component';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './Pipes/reverse.pipe';
import { AdditemComponent } from './Forms/additem/additem.component';
import { AddlocationComponent } from './Forms/addlocation/addlocation.component';
import { AddvariantComponent } from './Forms/addvariant/addvariant.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, FeedComponent, ReversePipe, AdditemComponent, AddlocationComponent, AddvariantComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirestoreModule,
    FormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
