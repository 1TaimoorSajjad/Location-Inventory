import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css'],
})
export class AddlocationComponent implements OnInit {
  locationForm!: FormGroup;
  items: any[] = [];
  variants: any[] = [];
  locations: any[] = [];
  collectionRef;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.collectionRef = collection(this.firestore, 'locations');
  }

  ngOnInit(): void {
    this.locationForm = this.fb.group({
      locationName: [''],
      createdAt: [''],
      createdBy: [''],

      variants: this.fb.array([]),
    });

    this.fetchItems();
    this.fetchVariants();
  }

  getVariants() {
    return this.locationForm.get('variants') as FormArray;
  }

  addVariant() {
    const variantFormGroup = this.fb.group({
      variant: [''],
      quantity: [''],
    });
    this.getVariants().push(variantFormGroup);
  }

  async fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const itemData = doc.data();
      const itemId = doc.id;
      const locationId = itemData.location;

      const locationName = locationId
        ? await this.getLocationName(locationId)
        : '';

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

  fetchVariants() {
    const variantsRef = collection(this.firestore, 'variants');
    const q = query(variantsRef);

    getDocs(q)
      .then((querySnapshot) => {
        this.variants = [];
        querySnapshot.forEach((doc) => {
          this.variants.push({ id: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log('Error fetching variants', error);
      });
  }

  onSubmit() {
    const formData = this.locationForm.value;
    addDoc(this.collectionRef, formData)
      .then(() => {
        console.log('Location data added successfully');
        this.router.navigate(['/locations']);
      })
      .catch((error: any) => {
        console.log('Error sending data to Firestore', error);
      });
  }
}
