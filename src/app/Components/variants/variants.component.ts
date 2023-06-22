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

  async fetchVariants() {
    const variantsCollection = collection(this.firestore, 'variants');
    const variantQuery = query(variantsCollection);
    const variantSnapshot = await getDocs(variantQuery);

    const variantsData = [];
    for (const docSnap of variantSnapshot.docs) {
      const variantData = docSnap.data();
      const itemId = variantData.item;
      const itemData = await this.getItemData(itemId);
      if (itemData) {
        variantData.itemName = itemData.itemName;
      }
      variantsData.push(variantData);
    }

    this.variants = variantsData;
  }
  async getItemData(itemId: string): Promise<any> {
    const itemDoc = doc(this.firestore, 'items', itemId);
    const itemSnapshot = await getDoc(itemDoc);
    if (itemSnapshot.exists()) {
      return itemSnapshot.data();
    }
    return null;
  }
  addVariant() {
    this.router.navigate(['/addvariant']);
  }
}
