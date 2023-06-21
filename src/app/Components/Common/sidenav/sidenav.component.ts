import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  user: any;

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {
    this.userInfo();
  }

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

  userInfo() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const logincredRef = collection(this.firestore, 'logincred');
        const q = query(logincredRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          this.user = {
            name: userData.name,
            email: userData.email,
            contactNumber: userData.contactNumber,
          };
        }
      }
    });
  }
}
