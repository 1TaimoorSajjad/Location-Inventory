import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
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
    const locationsCollection = collection(this.firestore, 'locations');
    const locationsQuery = query(locationsCollection);
    const locationsSnapshot = await getDocs(locationsQuery);

    const locationsData = [];
    for (const docSnap of locationsSnapshot.docs) {
      const locationData = docSnap.data();
      // const variantsData = locationData.variants;
      console.log(locationData, 'mojojo');

      console.log(locationData.variants, 'location ka data');

      for (let variantsData of locationData.variants) {
        // console.log(variantsData);
        if (variantsData && typeof variantsData.variant === 'string') {
          const variantData = await this.getVariantData(variantsData.variant);
          if (variantData) {
            variantsData.variant = variantData.variantName;
          }
        }
      }

      // if (typeof variantsData === 'string') {
      //   const variantData = await this.getVariantData(variantsData);
      //   if (variantData) {
      //     locationData.variantName = variantData.variantName;
      //   }
      // }

      locationsData.push(locationData);
    }
    this.locations = locationsData;
  }

  async getVariantData(variantId: string): Promise<any> {
    const variantDocRef = doc(this.firestore, 'variants', variantId);
    const variantDocSnapshot = await getDoc(variantDocRef);
    if (variantDocSnapshot.exists()) {
      return variantDocSnapshot.data();
    }
    {
      return null;
    }
  }

  addLocation() {
    this.router.navigate(['/addlocation']);
  }

  editUser() {}
  deleteUser(id: string) {
    if (id) {
      const documentRef = doc(this.firestore, 'locations', id);
      deleteDoc(documentRef)
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting document: ', error);
        });
    }
  }
}
