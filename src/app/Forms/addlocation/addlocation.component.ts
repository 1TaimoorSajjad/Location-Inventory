import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css'],
})
export class AddlocationComponent implements OnInit {
  locationForm!: FormGroup;
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
    });
  }
  onSubmit() {
    const formData = this.locationForm.value;
    addDoc(this.collectionRef, formData)
      .then(() => {
        console.log('location Data added in the form');
        this.router.navigate(['/locations']);
      })
      .catch((error: any) => {
        console.log('Error sending data to the fire', error);
      });
  }
}
