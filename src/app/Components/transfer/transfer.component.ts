import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, getDocs } from '@angular/fire/firestore';
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

  onSubmit() {
    const formData = this.registerForm.value;
    console.log(formData);
  }

  async getLocations() {
    const locationSnapshot = await getDocs(query(this.locationRef));
    this.locations = locationSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  getVariants(): FormArray {
    return this.registerForm.get('variants') as FormArray;
  }

  addVariant(): void {
    const variantGroup = this.formBuilder.group({
      variant: ['', Validators.required],
      quantity: ['', Validators.required],
      transferQuantity: [''],
      selected: [false],
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
      this.variants = selectedLocation.variants;
      const variants = this.getVariants();
      variants.clear();

      selectedLocation.variants.forEach((variant: any) => {
        const variantGroup = this.formBuilder.group({
          variant: [variant.variant, Validators.required],
          quantity: [variant.quantity, Validators.required],
          selected: [false],
        });
        variants.push(variantGroup);
      });
    }
  }
  transferVariant() {}
}
