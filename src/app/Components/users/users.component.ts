import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user: any;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.userInfo();
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
