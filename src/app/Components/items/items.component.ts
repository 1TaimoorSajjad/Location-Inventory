import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: any[] = [];
  collectionRef;
  constructor(private router: Router, private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'items');
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    const q = query(this.collectionRef);
    getDocs(q)
      .then((querySnapshot) => {
        this.items = [];
        querySnapshot.forEach((doc) => {
          this.items.push(doc.data());
        });
      })
      .catch((error: any) => {
        console.log('Error fetching locations', error);
      });
  }

  addItem() {
    this.router.navigate(['/additem']);
  }
}
