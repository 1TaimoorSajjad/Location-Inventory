import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  query,
  getDocs,
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
    });

    this.fetchItems();
  }

  fetchItems() {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef);

    getDocs(q)
      .then((querySnapshot) => {
        this.items = [];
        querySnapshot.forEach((doc) => {
          this.items.push({ id: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log('Error fetching items', error);
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
