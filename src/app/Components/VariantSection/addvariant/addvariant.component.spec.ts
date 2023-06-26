import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvariantComponent } from './addvariant.component';

describe('AddvariantComponent', () => {
  let component: AddvariantComponent;
  let fixture: ComponentFixture<AddvariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvariantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
