import { Component, OnInit } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
  collectionRef: CollectionReference<DocumentData>;
  editLocationId: string | null = null;

  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
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
    this.editLocationId = this.route.snapshot.paramMap.get('id');
    if (this.editLocationId) {
      this.fetchLocationData();
    }
  }

  fetchLocationData() {
    const locationDocRef = doc(this.collectionRef, this.editLocationId!);
    getDoc(locationDocRef)
      .then((locationDoc) => {
        if (locationDoc.exists()) {
          const locationData = locationDoc.data();
          this.locationForm.patchValue(locationData);
          // Patch the variants data
          const variantsData = locationData.variants || [];
          const variantControls = this.getVariants();
          variantControls.clear();
          for (const variant of variantsData) {
            variantControls.push(
              this.fb.group({
                variant: [variant.variant],
                quantity: [variant.quantity],
              })
            );
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching location data: ', error);
      });
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

  fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    getDocs(q)
      .then((querySnapshot) => {
        const promises = querySnapshot.docs.map((doc) => {
          const itemData = doc.data();
          const itemId = doc.id;
          const locationId = itemData.location;

          const locationName = locationId
            ? this.getLocationName(locationId)
            : '';

          return { id: itemId, ...itemData, locationName };
        });

        return Promise.all(promises);
      })
      .then((items) => {
        this.items = items;
      })
      .catch((error) => {
        console.error('Error fetching items: ', error);
      });
  }

  getLocationName(locationId: string): Promise<string> {
    const locationDocRef = doc(this.firestore, 'locations', locationId);
    return getDoc(locationDocRef)
      .then((locationDoc) => {
        if (locationDoc.exists()) {
          const locationData = locationDoc.data();
          return locationData.locationName;
        }
        return '';
      })
      .catch((error) => {
        console.error('Error fetching location name: ', error);
        return '';
      });
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

    if (this.editLocationId) {
      // Update the existing location
      const locationDocRef = doc(this.collectionRef, this.editLocationId);
      updateDoc(locationDocRef, formData)
        .then(() => {
          console.log('Location data updated successfully');
          this.router.navigate(['/add-location']);
        })
        .catch((error: any) => {
          console.log('Error updating data in Firestore', error);
        });
    } else {
      // Create a new location
      addDoc(this.collectionRef, formData)
        .then(() => {
          console.log('Location data added successfully');
          this.router.navigate(['/add-location']);
        })
        .catch((error: any) => {
          console.log('Error sending data to Firestore', error);
        });
    }
  }
}
