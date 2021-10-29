import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceMapperComponent } from './data-source-mapper.component';

describe('DataSourceMapperComponent', () => {
  let component: DataSourceMapperComponent;
  let fixture: ComponentFixture<DataSourceMapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSourceMapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
