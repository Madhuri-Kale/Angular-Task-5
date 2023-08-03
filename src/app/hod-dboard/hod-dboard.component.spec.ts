import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodDboardComponent } from './hod-dboard.component';

describe('HodDboardComponent', () => {
  let component: HodDboardComponent;
  let fixture: ComponentFixture<HodDboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodDboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodDboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
