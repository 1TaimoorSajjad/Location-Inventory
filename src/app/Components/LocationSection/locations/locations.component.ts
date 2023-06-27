import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
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
  locationsCollectionRef;
  selectedLocationId: string = '';

  constructor(private firestore: Firestore, private router: Router) {
    this.locationsCollectionRef = collection(this.firestore, 'locations');
  }

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    let locationsQuery = query(this.locationsCollectionRef);
    if (this.selectedLocationId) {
      locationsQuery = query(
        this.locationsCollectionRef,
        where('id', '==', this.selectedLocationId)
      );
    }

    getDocs(locationsQuery)
      .then((locationsSnapshot) => {
        const locationsData = [];
        for (const docSnap of locationsSnapshot.docs) {
          const locationData = docSnap.data();
          const locationId = docSnap.id;
          for (let variantsData of locationData.variants) {
            if (variantsData && typeof variantsData.variant === 'string') {
              this.getVariantData(variantsData.variant)
                .then((variantData) => {
                  if (variantData) {
                    variantsData.variant = variantData.variantName;
                  }
                })
                .catch((error) => {
                  console.error('Error fetching variant data: ', error);
                });
            }
          }
          locationData.id = locationId;

          locationsData.push(locationData);
        }
        this.locations = locationsData;
      })
      .catch((error) => {
        console.error('Error fetching locations: ', error);
      });
  }

  getVariantData(variantId: string): Promise<any> {
    const variantDocRef = doc(this.firestore, 'variants', variantId);
    return getDoc(variantDocRef)
      .then((variantDocSnapshot) => {
        if (variantDocSnapshot.exists()) {
          return variantDocSnapshot.data();
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.error('Error fetching variant data: ', error);
        return null;
      });
  }

  addLocation() {
    this.router.navigate(['/addlocation']);
  }

  editLocation(locationId: string) {
    console.log('location id', locationId);
    this.router.navigate(['/locations/edit/' + locationId]);
  }

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
