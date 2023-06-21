import { Component, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
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
  loginCollectionRef: any;

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.auth = getAuth();
    this.loginCollectionRef = collection(this.firestore, 'logincred');
  }

  login() {
    console.log('Auth object:', this.auth);

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        console.log('Login successful');
        console.log('Current user:', this.auth.currentUser);
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log('Error logging in:', error);
      });
  }
}
