import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: any[] = [];

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    getDocs(q)
      .then((querySnapshot) => {
        const itemPromises = querySnapshot.docs.map((doc) => {
          const itemData = doc.data();
          const itemId = doc.id;

          return { id: itemId, ...itemData };
        });

        return Promise.all(itemPromises);
      })
      .then((items) => {
        this.items = items;
      })
      .catch((error) => {
        console.error('Error fetching items: ', error);
      });
  }

  addItem() {
    this.router.navigate(['/additem']);
  }

  editItem() {}
  deleteItem() {}
}
