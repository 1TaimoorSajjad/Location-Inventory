import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css'],
})
export class VariantsComponent implements OnInit {
  variants: any[] = [];

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {
    this.fetchVariants();
  }

  fetchVariants() {
    const variantsCollection = collection(this.firestore, 'variants');
    const variantQuery = query(variantsCollection);

    getDocs(variantQuery)
      .then((variantSnapshot) => {
        const promises = variantSnapshot.docs.map((docSnap) => {
          const variantData = docSnap.data();
          const itemId = variantData.item;

          return this.getItemData(itemId).then((itemData) => {
            if (itemData) {
              variantData.itemName = itemData.itemName;
            }
            return variantData;
          });
        });

        return Promise.all(promises);
      })
      .then((variantsData) => {
        this.variants = variantsData;
      })
      .catch((error) => {
        console.error('Error fetching variants: ', error);
      });
  }

  getItemData(itemId: string): Promise<any> {
    const itemDoc = doc(this.firestore, 'items', itemId);

    return getDoc(itemDoc)
      .then((itemSnapshot) => {
        if (itemSnapshot.exists()) {
          return itemSnapshot.data();
        }
        return null;
      })
      .catch((error) => {
        console.error('Error getting item data: ', error);
        return null;
      });
  }

  addVariant() {
    this.router.navigate(['/addvariant']);
  }

  editVariant(variantId: any) {
    this.router.navigate(['/variants/edit/' + variantId]);
  }
  deleteVariant() {}
}
