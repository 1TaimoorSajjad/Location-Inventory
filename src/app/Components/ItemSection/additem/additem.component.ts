import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit {
  itemForm!: FormGroup;
  itemcollectionRef;
  documentId: string = '';

  constructor(
    private firestore: Firestore,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.itemcollectionRef = collection(this.firestore, 'items');
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      itemName: [''],
    });
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.documentId = userId;
        this.populateFormWithId(userId);
      }
    });
  }
  populateFormWithId(id: string) {
    const docRef = doc(this.itemcollectionRef, id);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const formData = docSnap.data();
          formData.documentId = id;
          this.itemForm.patchValue(formData);
        } else {
          console.log('Document does not exist');
        }
      })
      .catch((error: any) => {
        console.log('Error retrieving document:', error);
      });
  }

  onSubmit() {
    const formData = this.itemForm.value;

    if (formData.documentId) {
      const documentId = formData.documentId;
      delete formData.documentId;
      updateDoc(doc(this.itemcollectionRef, documentId), formData)
        .then(() => {
          console.log('Form data updated in Firestore');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Item Updated Successfully!',
          });
          this.router.navigate(['/items']);
        })
        .catch((error: any) => {
          console.log('Error updating form data in Firestore:', error);
        });
    } else {
      addDoc(this.itemcollectionRef, formData)
        .then(() => {
          console.log('Item added in the table');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Item Added Successfully!',
          });
          this.router.navigate(['/items']);
        })
        .catch((error) => {
          console.log('Error sending the data to the database', error);
        });
    }
  }
}
