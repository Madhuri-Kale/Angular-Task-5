import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDboardComponent } from './staff-dboard.component';

describe('StaffDboardComponent', () => {
  let component: StaffDboardComponent;
  let fixture: ComponentFixture<StaffDboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffDboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffDboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
