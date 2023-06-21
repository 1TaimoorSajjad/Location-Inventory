import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
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
  loginCollectionRef;
  constructor(private firestore: Firestore, private router: Router) {
    this.loginCollectionRef = collection(this.firestore, 'logins');
  }

  ngOnInit(): void {
    this.auth = getAuth();
  }
  login() {
    console.log('Auth object:', this.auth);

    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(() => {
        console.log('Login successful');
        console.log('Current user:', this.auth.currentUser);

        const loginInfo = {
          email: this.email,
          timestamp: new Date(),
        };

        addDoc(this.loginCollectionRef, loginInfo)
          .then(() => {
            console.log('Login info saved in Firestore');
            this.router.navigate(['/dashboard']);
          })
          .catch((error) => {
            console.log('Error saving login info:', error);
          });
      })
      .catch((error) => {
        console.log('Error logging in:', error);
      });
  }
}
