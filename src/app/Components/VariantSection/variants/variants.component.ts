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
  variantsCollectionRef;

  constructor(private router: Router, private firestore: Firestore) {
    this.variantsCollectionRef = collection(this.firestore, 'variants');
  }

  ngOnInit(): void {
    this.fetchVariants();
  }

  fetchVariants() {
    const variantQuery = query(this.variantsCollectionRef);

    getDocs(variantQuery)
      .then((variantSnapshot) => {
        const promises = variantSnapshot.docs.map((docSnap) => {
          const variantData = docSnap.data();
          const variantId = docSnap.id;

          const itemId = variantData.item;

          return this.getItemData(itemId).then((itemData) => {
            if (itemData) {
              variantData.itemName = itemData.itemName;
            }
            variantData.id = variantId;

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
    console.log('id', variantId);
    this.router.navigate(['/variants/edit/' + variantId]);
  }
  deleteVariant() {}
}
