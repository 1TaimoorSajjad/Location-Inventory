import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations: any[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations() {
    const locationsRef = collection(this.firestore, 'locations');
    const q = query(locationsRef);

    getDocs(q)
      .then((querySnapshot) => {
        this.locations = [];
        querySnapshot.forEach((doc) => {
          const locationData = doc.data();
          const locationId = doc.id;
          this.fetchItemsForLocation(locationId).then((items) => {
            const locationWithItems = {
              id: locationId,
              ...locationData,
              items,
            };
            this.locations.push(locationWithItems);
          });
        });
      })
      .catch((error: any) => {
        console.log('Error fetching locations', error);
      });
  }

  fetchItemsForLocation(locationId: string): Promise<any[]> {
    const itemsRef = collection(this.firestore, 'items');
    const q = query(itemsRef, where('location', '==', locationId));

    return getDocs(q)
      .then((querySnapshot) => {
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        return items;
      })
      .catch((error: any) => {
        console.log('Error fetching items for location', error);
        return [];
      });
  }

  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
