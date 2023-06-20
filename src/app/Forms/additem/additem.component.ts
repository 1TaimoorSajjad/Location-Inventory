import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
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
  locations: any[] = [];

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
      location: [''],
    });

    this.fetchLocations();
  }

  fetchLocations() {
    const locationsRef = collection(this.firestore, 'locations');
    getDocs(locationsRef)
      .then((querySnapshot) => {
        this.locations = [];
        querySnapshot.forEach((doc) => {
          this.locations.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      })
      .catch((error: any) => {
        console.log('Error fetching locations', error);
      });
  }

  onSubmit() {
    const formData = this.itemForm.value;
    const selectedLocationId = formData.location;

    const selectedLocation = this.locations.find(
      (location) => location.id === selectedLocationId
    );
    if (!selectedLocation) {
      console.log('Invalid location selected');
      return;
    }

    addDoc(this.collectionRef, formData)
      .then(() => {
        console.log('Item added in the table');
        this.router.navigate(['/items']);
      })
      .catch((error) => {
        console.log('Error sending the data to the database', error);
      });
  }
}
