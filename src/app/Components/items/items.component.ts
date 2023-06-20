import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: any[] = [];
  variants: any[] = []; // Array to hold the variants data
  collectionRef;
  variantsCollectionRef; // Reference to the variants collection
  constructor(private router: Router, private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'items');
    this.variantsCollectionRef = collection(this.firestore, 'variants'); // Initialize the variants collection reference
  }

  ngOnInit(): void {
    this.fetchItems();
    this.fetchVariants(); // Call the method to fetch the variants data
  }

  fetchItems() {
    const q = query(this.collectionRef);
    getDocs(q)
      .then((querySnapshot) => {
        this.items = [];
        querySnapshot.forEach((doc) => {
          this.items.push(doc.data());
        });
      })
      .catch((error: any) => {
        console.log('Error fetching items', error);
      });
  }

  fetchVariants() {
    const q = query(this.variantsCollectionRef);
    getDocs(q)
      .then((querySnapshot) => {
        this.variants = [];
        querySnapshot.forEach((doc) => {
          this.variants.push(doc.data());
        });
      })
      .catch((error: any) => {
        console.log('Error fetching variants', error);
      });
  }

  addItem() {
    this.router.navigate(['/additem']);
  }
}
