import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataService } from './data-service.component';

describe('DataServiceComponent', () => {
  let component: DataService;
  let fixture: ComponentFixture<DataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
