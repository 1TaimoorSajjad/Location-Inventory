import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addvariant',
  templateUrl: './addvariant.component.html',
  styleUrls: ['./addvariant.component.css'],
})
export class AddvariantComponent implements OnInit {
  variantForm!: FormGroup;
  collectionRef;
  items: any[] = [];
  locations: any[] = [];

  constructor(
    private router: Router,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {
    this.collectionRef = collection(this.firestore, 'variants');
  }

  ngOnInit(): void {
    this.variantForm = this.fb.group({
      variantName: [''],
      quantity: [''],
      item: [''],
      location: [''],
    });

    this.fetchItems();
    this.fetchLocations();
  }

  async fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const itemData = doc.data();
      const itemId = doc.id;
      const locationName = await this.getLocationName(itemData.location);
      return { id: itemId, ...itemData, locationName };
    });

    this.items = await Promise.all(promises);
  }

  async getLocationName(locationId: string): Promise<string> {
    const locationDocRef = doc(this.firestore, 'locations', locationId);
    const locationDoc = await getDoc(locationDocRef);

    if (locationDoc.exists()) {
      const locationData = locationDoc.data();
      return locationData.locationName;
    }

    return '';
  }

  fetchLocations() {
    const locationsRef = collection(this.firestore, 'locations');
    const q = query(locationsRef);

    getDocs(q)
      .then((querySnapshot) => {
        this.locations = [];
        querySnapshot.forEach((doc) => {
          this.locations.push({ id: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log('Error fetching locations', error);
      });
  }

  onSubmit() {
    const formData = this.variantForm.value;
    addDoc(this.collectionRef, formData)
      .then(() => {
        console.log('Variant added to the database');
        this.router.navigate(['/variants']);
      })
      .catch((error) => {
        console.log('Error sending data to the database', error);
      });
  }
}
