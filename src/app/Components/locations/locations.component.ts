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
  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations() {
    const collectionRef = collection(this.firestore, 'locations');
    const q = query(collectionRef);

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

  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
