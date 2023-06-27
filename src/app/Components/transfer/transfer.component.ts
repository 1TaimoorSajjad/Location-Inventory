import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  getDocs,
  doc,
  DocumentReference,
  CollectionReference,
  updateDoc,
} from '@angular/fire/firestore';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

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

  getLocations() {
    getDocs(query(this.locationRef))
      .then((locationSnapshot) => {
        this.locations = locationSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      })
      .catch((error) => {
        console.error('Error fetching locations: ', error);
      });
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
  transferVariant() {
    const formData = this.registerForm.value;

    const locationFrom = formData.locationFrom;
    const locationTo = formData.locationTo;

    const fromLocation = this.locations.find(
      (location) => location.id === locationFrom
    );
    const toLocation = this.locations.find(
      (location) => location.id === locationTo
    );

    if (fromLocation && toLocation) {
      const variants = formData.variants;

      variants.forEach((variant: any) => {
        if (variant.selected) {
          const quantity = parseInt(variant.quantity, 10);

          const fromVariants = fromLocation.variants.reduce(
            (
              acc: { [x: string]: any },
              fromVariant: { variant: string | number; quantity: any }
            ) => {
              acc[fromVariant.variant] = fromVariant.quantity;
              return acc;
            },
            {}
          );

          const toVariants = toLocation.variants.reduce(
            (
              acc: { [x: string]: any },
              toVariant: { variant: string | number; quantity: any }
            ) => {
              acc[toVariant.variant] = toVariant.quantity;
              return acc;
            },
            {}
          );

          if (fromVariants[variant.variant]) {
            fromVariants[variant.variant] -= quantity;
          }

          toVariants[variant.variant] =
            (toVariants[variant.variant] || 0) + quantity;

          fromLocation.variants = fromLocation.variants.map(
            (fromVariant: { variant: any; quantity: any }) => {
              if (fromVariant.variant === variant.variant) {
                fromVariant.quantity = fromVariants[variant.variant];
              }
              return fromVariant;
            }
          );

          const updatedToVariants = Object.keys(toVariants).map((variant) => ({
            variant,
            quantity: toVariants[variant],
          }));

          toLocation.variants = updatedToVariants;
        }
      });

      updateDoc(doc(this.firestore, 'locations', fromLocation.id), {
        variants: fromLocation.variants,
      })
        .then(() => {
          updateDoc(doc(this.firestore, 'locations', toLocation.id), {
            variants: toLocation.variants,
          })
            .then(() => {
              console.log('Transfer successful!');
            })
            .catch((error) => {
              console.error('Error updating destination location: ', error);
            });
        })
        .catch((error) => {
          console.error('Error updating source location: ', error);
        });
    }
  }
}
