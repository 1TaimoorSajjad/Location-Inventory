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

  async fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    const querySnapshot = await getDocs(q);

    const itemPromises = querySnapshot.docs.map(async (doc) => {
      const itemData = doc.data();
      const itemId = doc.id;

      return { id: itemId, ...itemData };
    });

    this.items = await Promise.all(itemPromises);
  }

  addItem() {
    this.router.navigate(['/additem']);
  }
}
