import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  where,
  doc,
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
    this.fetchVariantName();
  }

  fetchVariantName() {
    const variantsRef = collection(this.firestore, 'variants');
    console.log('variantId', variantsRef);
    // const q = query(variantsRef);
    const q = query(
      variantsRef,
      where('__name__', '==', 'd4o3GUDLA3Qm7ULGdIOm')
    );

    getDocs(q)
      .then((querySnapshot) => {
        console.log(querySnapshot);

        const variantDoc = querySnapshot.docs[0];
        console.log(variantDoc);
        console.log(variantDoc.data());
        // if (variantDoc) {
        //   const variantData = variantDoc.data();
        //   console.log(variantData, 'Variant Data');

        //   return variantData.name;
        // }
        // return '';
      })
      .catch((error: any) => {
        console.log('Error fetching variant name', error);
        // return '';
      });
  }

  addLocation() {
    this.router.navigate(['/addlocation']);
  }
}
