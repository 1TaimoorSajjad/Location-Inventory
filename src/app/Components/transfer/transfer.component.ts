import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  where,
} from '@angular/fire/firestore';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  registerForm!: FormGroup;
  variants: any[] = [];
  locations: any[] = [];
  locationRef;
  transferRef;

  constructor(private firestore: Firestore, private formBuilder: FormBuilder) {
    this.locationRef = collection(this.firestore, 'locations');
    this.transferRef = collection(this.firestore, 'transfer');
  }

  ngOnInit(): void {
    this.getLocations();
    this.initializeForm();
  }

  onSubmit() {}

  async getLocations() {
    const locationSnapshot = await getDocs(query(this.locationRef));
    this.locations = locationSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(this.locations);
  }

  getVariants(): FormArray {
    return this.registerForm.get('variants') as FormArray;
  }

  addVariant(): void {
    const variantGroup = this.formBuilder.group({
      variant: ['', Validators.required],
      quantity: [''],
    });

    this.getVariants().push(variantGroup);
  }

  initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      locationFrom: ['', Validators.required],
      locationTo: ['', Validators.required],
      variants: this.formBuilder.array([]),
    });
  }

  onLocationChange(): void {
    const selectedLocationId = this.registerForm.get('locationFrom')?.value;
    const selectedLocation = this.locations.find(
      (location) => location.id === selectedLocationId
    );
    if (selectedLocation) {
      const variants = this.getVariants();
      variants.clear();

      selectedLocation.variants.forEach((variant: any) => {
        const variantGroup = this.formBuilder.group({
          variant: [variant.variantName, Validators.required],
          quantity: ['', Validators.required],
        });
        variants.push(variantGroup);
      });
    }
  }
  getVariantsForSelectedLocation(): any[] {
    const selectedLocationId = this.registerForm.get('locationFrom')?.value;
    const selectedLocation = this.locations.find(
      (location) => location.id === selectedLocationId
    );
    return selectedLocation ? selectedLocation.variants : [];
  }

  transferVariant() {}
}
