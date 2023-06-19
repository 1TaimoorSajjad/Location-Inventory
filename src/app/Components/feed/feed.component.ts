import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}
}
