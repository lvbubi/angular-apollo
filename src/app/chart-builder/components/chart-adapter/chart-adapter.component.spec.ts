import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAdapterComponent } from './chart-adapter.component';

describe('ChartAdapterComponent', () => {
  let component: ChartAdapterComponent;
  let fixture: ComponentFixture<ChartAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
