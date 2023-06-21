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
      const variantsPromise = this.fetchVariantsForItem(itemId);
      const locationsPromise = this.fetchLocationsForItem(itemData.location);
      const [variants, locations] = await Promise.all([
        variantsPromise,
        locationsPromise,
      ]);
      return { id: itemId, ...itemData, variants, locations };
    });

    this.items = await Promise.all(itemPromises);
  }

  async fetchVariantsForItem(itemId: string): Promise<any[]> {
    const variantsRef = collection(this.firestore, 'variants');
    const q = query(variantsRef, where('item', '==', itemId));

    const querySnapshot = await getDocs(q);

    const variants: any[] = [];
    querySnapshot.forEach((doc) => {
      variants.push(doc.data());
    });

    return variants;
  }

  async fetchLocationsForItem(locationId: string): Promise<any[]> {
    const locationDocRef = doc(this.firestore, 'locations', locationId);
    const locationDoc = await getDoc(locationDocRef);

    if (locationDoc.exists()) {
      const locationData = locationDoc.data();
      return [locationData];
    }

    return [];
  }

  addItem() {
    this.router.navigate(['/additem']);
  }
}
