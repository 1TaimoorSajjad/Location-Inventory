import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  browserSessionPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signOut,
} from 'firebase/auth';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  }
}
