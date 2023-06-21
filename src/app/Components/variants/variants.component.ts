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
    const variantsRef = collection(this.firestore, 'variants');
    const q = query(variantsRef);
    const querySnapshot = await getDocs(q);

    const variantPromises = querySnapshot.docs.map(async (doc) => {
      const variantData = doc.data();
      const variantId = doc.id;

      return { id: variantId, ...variantData };
    });

    this.variants = await Promise.all(variantPromises);
  }

  addVariant() {
    this.router.navigate(['/addvariant']);
  }
}
