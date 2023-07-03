import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  variantCollectionRef;
  locationCollectionRef;
  itemCollectionRef;
  variants!: any[];
  locations!: any[];
  items!: any[];

  constructor(private router: Router, private firestore: Firestore) {
    this.variantCollectionRef = collection(this.firestore, 'variants');
    this.locationCollectionRef = collection(this.firestore, 'locations');
    this.itemCollectionRef = collection(this.firestore, 'items');
  }

  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.fetchVariants();
    this.fetchLocations();
    this.fetchItems();
  }

  fetchVariants() {
    getDocs(this.variantCollectionRef)
      .then((snapshot) => {
        this.variants = snapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.error('Error fetching variants:', error);
      });
  }

  fetchLocations() {
    getDocs(this.locationCollectionRef)
      .then((snapshot) => {
        this.locations = snapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }

  fetchItems() {
    getDocs(this.itemCollectionRef)
      .then((snapshot) => {
        this.items = snapshot.docs.map((doc) => doc.data());
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addItem() {
    console.log('button clicked');
    this.router.navigate(['/additem']);
  }

  addLocation() {
    console.log('button clicked');
    this.router.navigate(['/addlocation']);
  }

  addVariant() {
    console.log('button clicked');
    this.router.navigate(['/addvariant']);
  }
}
