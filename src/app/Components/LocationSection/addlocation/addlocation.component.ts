import { Component, OnInit } from '@angular/core';
import {
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
import Swal from 'sweetalert2';

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
  locationcollectionRef;
  documentId: string = '';

  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.locationcollectionRef = collection(this.firestore, 'locations');
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
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.documentId = userId;
        this.populateFormWithId(userId);
      }
    });
  }

  populateFormWithId(id: string) {
    const docRef = doc(this.locationcollectionRef, id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const formData = docSnap.data();
          formData.documentId = id;
          this.locationForm.patchValue(formData);
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error: any) => {
        console.log('Error retrieving document:', error);
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

    if (formData.documentId) {
      const documentId = formData.documentId;
      delete formData.documentId;
      updateDoc(doc(this.locationcollectionRef, documentId), formData)
        .then(() => {
          console.log('Form data updated in Firestore');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Location Updated Successfully!',
          });
          this.router.navigate(['/locations']);
        })
        .catch((error: any) => {
          console.log('Error updating form data in Firestore:', error);
        });
    } else {
      addDoc(this.locationcollectionRef, formData)
        .then(() => {
          console.log('Item added in the table');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Location Added Successfully!',
          });
          this.router.navigate(['/locations']);
        })
        .catch((error) => {
          console.log('Error sending the data to the database', error);
        });
    }
  }
}
