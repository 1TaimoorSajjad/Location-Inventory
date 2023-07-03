import { Component, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';

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
        Swal.fire({
          icon: 'error',
          title: 'Warning',
          text: 'Invalid Username or Password!',
        });
        console.log('Error logging in:', error);
      });
  }
}
