import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];
  items: any[] = [];
  collectionRef;
  itemsRef;
  constructor(private firestore: Firestore, private router: Router) {
    this.collectionRef = collection(this.firestore, 'locations');
    this.itemsRef = collection(this.firestore, 'items');
  }

  ngOnInit(): void {
    this.fetchLocations();
    this.fetchItems();
  }

  fetchLocations() {
    const q = query(this.collectionRef);

    getDocs(q)
      .then((querySnapshot) => {
        this.locations = [];
        querySnapshot.forEach((doc) => {
          this.locations.push(doc.data());
        });
      })
      .catch((error: any) => {
        console.log('Error fetching locations', error);
      });
  }
  fetchItems() {
    const q = query(this.itemsRef);
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

  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
