import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  auth: any;
  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.auth = getAuth();
  }

  login() {
    console.log(this.auth);
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        console.log('Login successful');
        this.router.navigate(['/feed']);
      })
      .catch((error) => {
        console.log('Error logging in:', error);
      });
  }
}
