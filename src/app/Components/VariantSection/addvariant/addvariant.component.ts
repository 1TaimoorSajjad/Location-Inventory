import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addvariant',
  templateUrl: './addvariant.component.html',
  styleUrls: ['./addvariant.component.css'],
})
export class AddvariantComponent implements OnInit {
  variantForm!: FormGroup;
  variantcollectionRef;
  items: any[] = [];
  locations: any[] = [];
  documentId: string = '';
  locationcollectionRef;
  constructor(
    private router: Router,
    private firestore: Firestore,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.variantcollectionRef = collection(this.firestore, 'variants');
    this.locationcollectionRef = collection(this.firestore, 'locations');
  }

  ngOnInit(): void {
    this.variantForm = this.fb.group({
      variantName: [''],
      item: [''],
      quantity: [''],
    });

    this.fetchItems();
    this.getLocations();

    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.documentId = userId;
        this.populateFormWithId(userId);
      }
    });
  }

  populateFormWithId(id: string) {
    const docRef = doc(this.variantcollectionRef, id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const formData = docSnap.data();
          formData.documentId = id;
          this.variantForm.patchValue(formData);
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error: any) => {
        console.log('Error retrieving document:', error);
      });
  }

  fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    getDocs(q)
      .then((querySnapshot) => {
        const promises = querySnapshot.docs.map((doc) => {
          const itemData = doc.data();
          const itemId = doc.id;
          return { id: itemId, ...itemData };
        });

        return Promise.all(promises);
      })
      .then((items) => {
        this.items = items;
      })
      .catch((error) => {
        console.log('Error fetching items: ', error);
      });
  }

  getLocations() {
    getDocs(query(this.locationcollectionRef))
      .then((locationSnapshot) => {
        this.locations = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .catch((error) => {
        console.error('Error fetching locations: ', error);
      });
  }

  onSubmit() {
    const formData = this.variantForm.value;

    if (formData.documentId) {
      const documentId = formData.documentId;
      delete formData.documentId;
      updateDoc(doc(this.variantcollectionRef, documentId), formData)
        .then(() => {
          console.log('Form data updated in Firestore');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Variant Updated Successfully!',
          });
          this.router.navigate(['/variants']);
        })
        .catch((error: any) => {
          console.log('Error updating form data in Firestore:', error);
        });
    } else {
      addDoc(this.variantcollectionRef, formData)
        .then(() => {
          console.log('Item added in the table');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Variant Added Successfully!',
          });
          this.router.navigate(['/variants']);
        })
        .catch((error) => {
          console.log('Error sending the data to the database', error);
        });
    }
  }
}
