import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetComponentComponent } from './pet-component.component';

describe('PetComponentComponent', () => {
  let component: PetComponentComponent;
  let fixture: ComponentFixture<PetComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
