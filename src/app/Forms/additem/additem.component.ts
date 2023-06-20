import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit {
  itemForm!: FormGroup;
  collectionRef;
  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.collectionRef = collection(this.firestore, 'items');
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemName: [''],
    });
  }

  onSubmit() {
    const formData = this.itemForm.value;
    addDoc(this.collectionRef, formData)
      .then(() => {
        console.log('Item added in the table');
        this.router.navigate(['/items']);
      })
      .catch((error) => {
        console.log('Error sending the data to database');
      });
  }
}
