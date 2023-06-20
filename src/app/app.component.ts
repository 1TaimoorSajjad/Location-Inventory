import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private firestore: Firestore) {}
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isEmptyURL(): boolean {
    return this.router.url === '/';
  }
  title = 'InventorySystem';
}
