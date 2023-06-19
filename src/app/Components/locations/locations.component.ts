import { Component, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  collectionRef;
  constructor(private firestore: Firestore, private router: Router) {
    this.collectionRef = collection(this.firestore, 'locations');
  }

  ngOnInit(): void {}
  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
