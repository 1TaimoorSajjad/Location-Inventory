import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(private router: Router) {}
  isModalOpen: boolean = false;

  variants: string[] = ['Variant 1', 'Variant 2', 'Variant 3'];

  locations: string[] = ['Location 1', 'Location 2', 'Location 3'];

  items: string[] = ['Item 1', 'Item 2', 'Item 3'];

  itemVariants: string[] = [
    'Item Variant 1',
    'Item Variant 2',
    'Item Variant 3',
  ];

  itemVariantsOnLocation: string[] = [
    'Item Variant 1 on Location 1',
    'Item Variant 2 on Location 1',
    'Item Variant 3 on Location 1',
  ];

  allItemVariantsOnLocation: string[] = [
    'All Item Variants on Location 1',
    'All Item Variants on Location 2',
    'All Item Variants on Location 3',
  ];

  searchTerm!: string;
  searchResult!: { variantName: string; quantity: number };

  searchVariant() {}

  ngOnInit(): void {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addItem() {
    console.log('button clicked');

    this.router.navigate(['/additem']);
  }
  addLocation() {
    console.log('button clicked');

    this.router.navigate(['/addlocation']);
  }
}
