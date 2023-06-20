import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
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
    });
  }
  onSubmit() {
    const formData = this.variantForm.value;
    addDoc(this.collectionRef, formData)
      .then(() => {
        console.log('Variant added in the database');
        this.router.navigate(['/variants']);
      })
      .catch((err) => {
        console.log('error sending data to the database');
      });
  }
}
