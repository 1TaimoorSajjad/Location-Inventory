// import { Component, OnInit } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   query,
//   getDocs,
//   doc,
//   getDoc,
// } from '@angular/fire/firestore';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-locations',
//   templateUrl: './locations.component.html',
//   styleUrls: ['./locations.component.css'],
// })
// export class LocationsComponent implements OnInit {
//   locations: any[] = []; // Array to store the locations

//   constructor(private firestore: Firestore, private router: Router) {}

//   async ngOnInit(): Promise<void> {
//     // Fetch the data from Firestore
//     const locationsCollection = collection(this.firestore, 'locations');
//     const locationsQuery = query(locationsCollection);
//     const locationsSnapshot = await getDocs(locationsQuery);

//     const locationsData = [];
//     for (const docSnap of locationsSnapshot.docs) {
//       const locationData = docSnap.data();
//       const variantId = locationData.variant;
//       const variantData = await this.getVariantData(variantId);
//       if (variantData) {
//         locationData.variantName = variantData.name;
//       }
//       locationsData.push(locationData);
//     }

//     this.locations = locationsData;
//   }

//   async getVariantData(variantId: string): Promise<any> {
//     const variantDoc = doc(this.firestore, 'variants', variantId);
//     const variantSnapshot = await getDoc(variantDoc);
//     if (variantSnapshot.exists()) {
//       return variantSnapshot.data();
//     }
//     return null;
//   }

//   addLocation() {
//     this.router.navigate(['/addlocation']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  locations: any[] = []; // Array to store the locations

  constructor(private firestore: Firestore, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.getLocation();
  }

  async getLocation() {
    const locationsCollection = collection(this.firestore, 'locations');
    const locationsQuery = query(locationsCollection);
    const locationsSnapshot = await getDocs(locationsQuery);

    const locationsData = [];
    for (const docSnap of locationsSnapshot.docs) {
      const locationData = docSnap.data();
      const variantId = locationData.variant;
      const variantData = await this.getVariantData(variantId);
      if (variantData) {
        locationData.variantName = variantData.variantName;
      }
      locationsData.push(locationData);
    }

    this.locations = locationsData;
  }

  async getVariantData(variantId: string): Promise<any> {
    const variantDoc = doc(this.firestore, 'variants', variantId);
    const variantSnapshot = await getDoc(variantDoc);
    if (variantSnapshot.exists()) {
      return variantSnapshot.data();
    }
    return null;
  }

  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
