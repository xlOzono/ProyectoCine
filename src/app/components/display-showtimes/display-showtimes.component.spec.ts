import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShowtimesComponent } from './display-showtimes.component';

describe('DisplayShowtimesComponent', () => {
  let component: DisplayShowtimesComponent;
  let fixture: ComponentFixture<DisplayShowtimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayShowtimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayShowtimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
