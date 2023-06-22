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
  locations: any[] = [];

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {
    this.getLocations();
  }

  async getLocations() {
    try {
      const locationsCollection = collection(this.firestore, 'locations');
      const locationsQuery = query(locationsCollection);
      const locationsSnapshot = await getDocs(locationsQuery);

      const locationsData = [];
      for (const docSnap of locationsSnapshot.docs) {
        const locationData = docSnap.data();
        if (locationData.variant) {
          const variantId = locationData.variant;
          const variantData = await this.getVariantData(variantId);
          if (variantData) {
            locationData.variantName = variantData.variantName;
          }
        }
        locationsData.push(locationData);
      }

      this.locations = locationsData;
    } catch (error) {
      console.log('Error retrieving locations:', error);
    }
  }

  async getVariantData(variantId: string): Promise<any> {
    try {
      const variantDocRef = doc(this.firestore, 'variants', variantId);
      const variantSnapshot = await getDoc(variantDocRef);
      if (variantSnapshot.exists()) {
        return variantSnapshot.data();
      } else {
        console.log(`Variant document not found for variantId: ${variantId}`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error retrieving variant data for variantId: ${variantId}`,
        error
      );
      return null;
    }
  }

  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
