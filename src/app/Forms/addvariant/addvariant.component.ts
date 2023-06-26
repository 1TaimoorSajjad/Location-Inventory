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
      item: [''],
      quantity: [''],
    });

    this.fetchItems();
  }

  async fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    const querySnapshot = await getDocs(q);

    const promises = querySnapshot.docs.map(async (doc) => {
      const itemData = doc.data();
      const itemId = doc.id;
      return { id: itemId, ...itemData };
    });

    this.items = await Promise.all(promises);
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
