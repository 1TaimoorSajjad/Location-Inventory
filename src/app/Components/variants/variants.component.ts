import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-variants',
  templateUrl: './variants.component.html',
  styleUrls: ['./variants.component.css'],
})
export class VariantsComponent implements OnInit {
  variants: any[] = [];
  collectionRef;
  constructor(private router: Router, private firestore: Firestore) {
    this.collectionRef = collection(this.firestore, 'variants');
  }

  ngOnInit(): void {
    this.fetchVariants();
  }

  fetchVariants() {
    const q = query(this.collectionRef);
    getDocs(q)
      .then((querySnapshot) => {
        this.variants = [];
        querySnapshot.forEach((doc) => {
          this.variants.push(doc.data());
        });
      })
      .catch((error: any) => {
        console.log('Error fetching locations', error);
      });
  }
  addVariant() {
    this.router.navigate(['/addvariant']);
  }
}
