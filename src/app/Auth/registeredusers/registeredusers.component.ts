import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registeredusers',
  templateUrl: './registeredusers.component.html',
  styleUrls: ['./registeredusers.component.css'],
})
export class RegisteredusersComponent implements OnInit {
  userRef;
  users!: Observable<any[]>;
  isUserViewVisible = false;
  selectedUser: any;

  constructor(private router: Router, private firestore: Firestore) {
    this.userRef = collection(this.firestore, 'logincred');
  }

  ngOnInit(): void {
    this.getUsers(this.userRef);
  }
  getUsers(collectionRef: any) {
    this.users = collectionData(collectionRef);
  }
  viewUser(user: any) {
    this.isUserViewVisible = true;
    this.selectedUser = user;
  }
  closeView() {
    this.isUserViewVisible = false;
    this.selectedUser = null;
  }

  registerUser() {
    this.router.navigate(['/register']);
  }
}
