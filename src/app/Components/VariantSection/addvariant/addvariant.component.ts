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
  where,
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
  filteredLocations: any[] = [];

  locationcollectionRef;
  selectedLocationId: any;
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
      location: [''],
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
      addDoc(this.variantcollectionRef, {
        variantName: formData.variantName,
        item: formData.item,
      })
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
      // Below query is going to the location collection
      // addDoc(this.locationcollectionRef, {
      //   locationName: formData.location,
      //   quantity: formData.quantity,
      // });
      let locationsQuery = query(this.locationcollectionRef);
      console.log('query', locationsQuery);

      if (this.selectedLocationId) {
        locationsQuery = query(
          this.locationcollectionRef,
          where('id', '==', this.selectedLocationId)
        );
        console.log('id comparison query', locationsQuery);
      }
      if (locationsQuery) {
        let variantsQuery = query(this.locationcollectionRef);
        console.log('query', variantsQuery);

        variantsQuery = query(
          this.locationcollectionRef,
          where('variantName', '==', variantsQuery)
        );
        console.log('variants query', this.locationcollectionRef);
      }
    }
  }
  filterLocations() {
    if (this.selectedLocationId) {
      this.filteredLocations = this.locations.filter(
        (location) => location.id === this.selectedLocationId
      );
    } else {
      this.filteredLocations = this.locations;
    }
  }
}
