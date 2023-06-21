import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  email: any;
  password: any;
  userName: any;
  contactNumber: any;
  profilePicture: File | null = null;
  user: any;

  collectionRef: any;

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {}

  register() {
    const auth = getAuth();
    console.log('auth', auth);
    let userCredentials: any;

    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((credentials) => {
        userCredentials = credentials;
        this.user = userCredentials.user;
        const userData = {
          email: this.user.email,
          uid: this.user.uid,
          name: this.userName,
          contactNumber: this.contactNumber,
        };

        // Create the user document with merged data
        const userDocRef = addDoc(
          collection(this.firestore, 'logincred'),
          userData
        );

        return userDocRef;
      })
      .then(() => {
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error registering user:', error);
      });
  }

  onProfilePictureSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.profilePicture = files[0];
    }
  }
}
